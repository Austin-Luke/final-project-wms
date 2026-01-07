const mongoose = require("mongoose")
    // imports the mongoose library

const partSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true}
})
    // defines the schema for the part model
    // the value 'true' must be required so the while-loop in app.js can function properly

const Part = mongoose.model(`Part`, partSchema)
    // creates the part model

module.exports = Part 
    // exports the part model to grant access to the rest of this project


