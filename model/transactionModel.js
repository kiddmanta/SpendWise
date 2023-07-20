const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userID : {
        type:String,
        required: [true, 'User ID is missing']
    },
    Amount: {
        type: Number,
        required: [true, 'Amount is Required']
    },
    Type : {
        type:String,
        required:[true,'The type of transaction is compulsory']
    },
    Category: {
        type: String,
        required: [true, 'State what category does the transaction belong to']
    },
    Reference: {
        type: String,
    },
    Description: {
        type: String,
        requried: [true, 'Provide a description fitting of the Transaction']
    },
    Date: {
        type: Date,
        required: [true, 'Date of the transaction is required']
    }
},
    { timestamps: true })

module.exports = mongoose.model("transaction", transactionSchema)