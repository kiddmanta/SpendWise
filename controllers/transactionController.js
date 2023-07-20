
const TransactionModel = require("../model/transactionModel");
const moment = require("moment");

const getTransactions = async (req,res)=>{
    try{
        const transactions = await TransactionModel.find({userID:req.body.userID,
            ...(req.body.time !== 'custom' ? {
                Date:{
                    $gt: moment().subtract(Number(req.body.time), 'd').toDate()
                }
            }:{
                Date:{
                    $gte: req.body.selectedDate[0],
                    $lte: req.body.selectedDate[1]
                }
            })
        });
        res.status(201).json(transactions)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const addTransaction= async (req,res)=>{   
    try{
        const newTransaction = new TransactionModel(req.body);
        await newTransaction.save();
        res.status(201).json({
            message:"Transaction Added Successfully",
            success : true
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : err,
            success : false
        })
    }
}

const getTypeTransaction = async(req,res)=>{
    try{
        const transactions = await TransactionModel.find({userID:req.body.userID,Type:req.body.Type,
            ...(req.body.time !== 'custom' ? {
                Date:{
                    $gt: moment().subtract(Number(req.body.time), 'd').toDate()
                }
            }:{
                Date:{
                    $gte: req.body.selectedDate[0],
                    $lte: req.body.selectedDate[1]
                }
            }) 
        });
        res.status(201).json(transactions)
    }
    catch(err){
        res.status(500).json(err);
    }
}

const editTransaction = async(req,res)=>{
    try{
        await TransactionModel.findOneAndUpdate({_id:req.body.transactionID},req.body.payload);
        res.status(201).send("Edited Succesfully")
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}


const deleteTransaction = async(req,res)=>{
    try{
        await TransactionModel.findOneAndDelete({_id:req.body.transactionID});
        res.status(201).send("Deleted Succesfully")
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}


module.exports = {getTransactions,addTransaction,getTypeTransaction,editTransaction,deleteTransaction};