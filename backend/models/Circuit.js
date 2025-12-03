const mongoose = require('mongoose');

const CircuitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    nodes: {
        type: Array,
        default: [],
    },
    edges: {
        type: Array,
        default: [],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        enum: ['Combinational', 'Sequential'],
        default: 'Combinational',
    },
    description: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Circuit', CircuitSchema);
