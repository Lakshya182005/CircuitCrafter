const express = require('express');
const router = express.Router();
const {
    saveCircuit,
    getMyCircuits,
    getCircuitById,
    deleteCircuit,
    getPublicCircuits,
    copyCircuit,
} = require('../controllers/circuit.controller');

router.post('/save', saveCircuit);
router.get('/mine', getMyCircuits);
router.get('/public', getPublicCircuits);
router.post('/copy/:id', copyCircuit);
router.get('/:id', getCircuitById);
router.delete('/:id', deleteCircuit);

module.exports = router;
