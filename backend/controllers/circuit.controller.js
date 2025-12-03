const Circuit = require('../models/Circuit');

// @desc    Save (Create or Update) a circuit
// @route   POST /api/circuits/save
// @access  Private
const saveCircuit = async (req, res) => {
    try {
        const userId = req.user.id;
        const { _id, name, nodes, edges, isPublic, type, description } = req.body;

        let circuit;

        if (_id) {
            // Update existing circuit
            circuit = await Circuit.findOne({ _id, userId });
            if (!circuit) {
                return res.status(404).json({ message: 'Circuit not found' });
            }
            circuit.name = name || circuit.name;
            circuit.nodes = nodes || circuit.nodes;
            circuit.edges = edges || circuit.edges;
            circuit.isPublic = isPublic !== undefined ? isPublic : circuit.isPublic;
            circuit.type = type || circuit.type;
            circuit.description = description || circuit.description;
            circuit.updatedAt = Date.now();
            await circuit.save();
        } else {
            // Create new circuit
            circuit = new Circuit({
                userId,
                name,
                nodes,
                edges,
                isPublic,
                type,
                description,
            });
            await circuit.save();
        }

        res.status(200).json(circuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all circuits for current user with Search, Sort, Filter, Pagination
// @route   GET /api/circuits/mine
// @access  Private
const getMyCircuits = async (req, res) => {
    try {
        const userId = req.user.id;
        const { search, sort, type, page = 1, limit = 10 } = req.query;

        const query = { userId };

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (type) {
            query.type = type;
        }

        let sortOption = { updatedAt: -1 }; // Default: Recently updated
        if (sort === 'az') sortOption = { name: 1 };
        if (sort === 'za') sortOption = { name: -1 };
        if (sort === 'oldest') sortOption = { updatedAt: 1 };

        const circuits = await Circuit.find(query)
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Circuit.countDocuments(query);

        res.status(200).json({
            circuits,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get circuit by ID
// @route   GET /api/circuits/:id
// @access  Private
const getCircuitById = async (req, res) => {
    try {
        const userId = req.user.id;
        const circuit = await Circuit.findOne({ _id: req.params.id, userId });

        if (!circuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }

        res.status(200).json(circuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete circuit
// @route   DELETE /api/circuits/:id
// @access  Private
const deleteCircuit = async (req, res) => {
    try {
        const userId = req.user.id;
        const circuit = await Circuit.findOneAndDelete({ _id: req.params.id, userId });

        if (!circuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }

        res.status(200).json({ message: 'Circuit deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get public circuits with Search, Sort, Filter, Pagination
// @route   GET /api/circuits/public
// @access  Public (but we might require auth for consistency, let's keep it open or auth optional? Requirement says "Browse other public circuits". Let's assume auth required for now as per "All protected via Clerk middleware" in original prompt, but proposal says "Public" access. I'll make it protected for simplicity as per original prompt, or check req.auth if available.)
// Actually, let's make it protected to keep it simple with the existing middleware structure.
const getPublicCircuits = async (req, res) => {
    try {
        const { search, sort, type, page = 1, limit = 10 } = req.query;

        const query = { isPublic: true };

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (type) {
            query.type = type;
        }

        let sortOption = { updatedAt: -1 }; // Default: Newest
        if (sort === 'az') sortOption = { name: 1 };
        if (sort === 'za') sortOption = { name: -1 };

        const circuits = await Circuit.find(query)
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('userId', 'username'); // Populate creator name

        const count = await Circuit.countDocuments(query);

        res.status(200).json({
            circuits,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Copy a public circuit to personal library
// @route   POST /api/circuits/copy/:id
// @access  Private
const copyCircuit = async (req, res) => {
    try {
        const userId = req.user.id;
        const circuitId = req.params.id;

        const originalCircuit = await Circuit.findById(circuitId);

        if (!originalCircuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }

        if (!originalCircuit.isPublic && originalCircuit.userId !== userId) {
            return res.status(403).json({ message: 'Cannot copy private circuit' });
        }

        const newCircuit = new Circuit({
            userId,
            name: `${originalCircuit.name} (Copy)`,
            nodes: originalCircuit.nodes,
            edges: originalCircuit.edges,
            type: originalCircuit.type,
            description: originalCircuit.description,
            isPublic: false, // Default to private
        });

        await newCircuit.save();

        res.status(201).json(newCircuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    saveCircuit,
    getMyCircuits,
    getCircuitById,
    deleteCircuit,
    getPublicCircuits,
    copyCircuit,
};
