require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/circuits', requireAuth, require('./routes/circuit.routes'));

// Health Check
app.get('/', (req, res) => {
  res.send('CircuitCrafter Backend is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
