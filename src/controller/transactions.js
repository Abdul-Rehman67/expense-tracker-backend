const { response } = require("../dto/send.response");
const { update } = require("../models/User");
const {
  createTransaction,
  getTransactionByEmail,
  updateTransaction
  ,deleteTransaction
} = require("../services/transactions");
const createTransactionController = async (req, res) => {
  const userEmail = req.email;
  let payload = req.body;
  payload = { transactionDetails: payload, userEmail: userEmail };
  console.log(payload);
  let result = await createTransaction(payload);
  if (result) {
    return res.send(response(true, "Created Successfully", {}));
  } else {
    return res.send(response(false, "Not created", {}));
  }
};
const getAllTransactionOfUser = async (req, res) => {
  const userEmail = req.email;
  let payload = req.body
  console.log(payload)
  let transactions = await getTransactionByEmail(userEmail,payload);
  // console.log("transactions====>",transactions);
  if (transactions) {
    return res.send(response(true, "found", {transactions:transactions}));
  } else {
    return res.send(response(false, "not found", {}));
  }
};
const updateTransactionCon = async (req, res) => {
  const userEmail = req.email;
  let payload = req.body
  let transactions = await updateTransaction(userEmail,payload);
  console.log("transactions====>",transactions);
  if (transactions) {
    return res.send(response(true, "updated", {}));
  } else {
    return res.send(response(false, "not found", {}));
  }
};
const deleteTransactionCon = async (req, res) => {
  // console.log(req.body)
  let payload = req.body
  let transactions = await deleteTransaction(payload);
  console.log("transactions====>",transactions);
  if (transactions) {
    return res.send(response(true, "found", {transactions:transactions}));
  } else {
    return res.send(response(false, "not found", {}));
  }
};
module.exports = { createTransactionController, getAllTransactionOfUser,updateTransactionCon,deleteTransactionCon };
