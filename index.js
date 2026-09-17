require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Smart Waste Bin Server is running!');
});

app.use('/api', sensorRoutes);

const PORT = process.env.PORT || 3001;

const start = async () => {
    try {
        await connectDB();

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server started on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};

start();