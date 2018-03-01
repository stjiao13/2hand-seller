// get an instance of mongoose and mongoose.Schema
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

import mongoose, { Schema } from 'mongoose';

// set up a mongoose model and pass it using module.exports
export default mongoose.model('Item', new Schema({ 
    id: String,
    seller_name: String,
    price: Number,
    description: String, 
    imagePath: String,
    updatedAt: Date,
}));