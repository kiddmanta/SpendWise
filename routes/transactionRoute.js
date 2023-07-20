const router = require("express").Router();
const { getTransactions, addTransaction, getTypeTransaction ,editTransaction, deleteTransaction} = require("../controllers/transactionController.js");
const Transaction = require("../model/transactionModel.js");

router.post("/get-transactions",getTransactions);

router.post("/add-transaction",addTransaction);

router.post("/get-type-transactions",getTypeTransaction)

router.post("/edit-transaction",editTransaction)

router.post("/delete-transaction",deleteTransaction)


module.exports = router;