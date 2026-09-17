const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Sensor Schema
const sensorReadingsSchema = new mongoose.Schema({
    plastic: Boolean,
    gasValue: Number,
    gasDetected: Boolean,
    irObject: Boolean,
    distance: Number,
    alert: Boolean,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const SensorReading = mongoose.model("SensorReading", sensorReadingsSchema);

// POST /api/sensor-data
router.post("/sensor-data", async (req, res) => {
    try {
        console.log("ESP32 DATA RECEIVED:", req.body);

        const reading = new SensorReading(req.body);
        const savedReading = await reading.save();

        console.log("Sensor data saved to MongoDB");

        res.status(200).json({
            success: true,
            message: "Sensor data received successfully",
            data: savedReading
        });
    } catch (error) {
        console.error("Error saving sensor data:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save sensor data",
            error: error.message
        });
    }
});

// GET /api/sensor-data/latest
router.get("/sensor-data/latest", async (req, res) => {
    try {
        const latest = await SensorReading.findOne().sort({ timestamp: -1 });
        res.json(latest);
    } catch (error) {
        console.error("Error fetching latest reading:", error);
        res.status(500).json({ error: "Failed to fetch reading" });
    }
});

module.exports = router;