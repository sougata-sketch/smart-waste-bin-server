const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema({
    plastic: Boolean,
    gasValue: Number,
    gasDetected: Boolean,
    irObject: Boolean,
    distance: Number,
    alert: Boolean,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorReading", sensorReadingSchema);