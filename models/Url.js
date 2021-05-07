// Url data model/schema

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortUrlCode: {
        type: String,
        required: true
    },
    
    longUrl: {
        type: String,
        required: true
    },
  
    visited: {
        type: Number,
        required: true,
        default: 0
    }
    
});

module.exports = mongoose.model('Url', urlSchema);