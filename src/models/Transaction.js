const mongoose = require("mongoose");
const { getUserByEmail } = require("../services/userService");
const User = require("./User");

const transactionSchema = mongoose.Schema({
  userEmail: {
    type: String,
  },
  transactionDetails: {
    type: [Object],
    of: new mongoose.Schema({}),
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
});
transactionSchema.methods.createTransaction = async function () {
  let user = await User.findOne({ email: this.userEmail });

  if (!user) {
    throw new Error("User not found");
  }

  let userHaveMoneyIn = user.userHaveMoneyIn;
  let type = this.transactionDetails[0].type;
  let amount = this.transactionDetails[0].amount;
  const category = this.transactionDetails[0].category;
  const customCategory =
    this.transactionDetails[0].customCategory &&
    this.transactionDetails[0].customCategory;

  let moneyInIndex = userHaveMoneyIn.findIndex(
    (moneyIn) => moneyIn.name === type
  );
  if (moneyInIndex === -1) {
    throw new Error(`User doesn't have "${type}" moneyIn.`);
  }

  userHaveMoneyIn[moneyInIndex].amount -= amount;

  if (category === "other" && customCategory) {
    let updatedUserCategory = user.userCategory;
    updatedUserCategory = [
      ...user.userCategory,
      { name: customCategory, value: customCategory },
    ];
    console.log("updated", updatedUserCategory);
    let update = await User.findOneAndUpdate(
      { email: this.userEmail },
      { $set: { userCategory: updatedUserCategory } }
    );
  }
  let update = await User.findOneAndUpdate(
    { email: this.userEmail },
    { $set: { userHaveMoneyIn: userHaveMoneyIn } }
  );

  console.log("savedUser", update);
  let transaction = await this.save();
  return { transaction };
};
transactionSchema.methods.updateTransactionS = async function (transactionId, newDetails) {
  let transaction = await Transaction.findById(mongoose.Types.ObjectId(transactionId));  
  console.log("update k function ma")
  
  

  if (!transaction) {
    throw new Error("Transaction not found");
  }

  let user = await User.findOne({ email: transaction.userEmail });

  if (!user) {
    throw new Error("User not found");
  }

  let userHaveMoneyIn = user.userHaveMoneyIn;
  let oldType = transaction.transactionDetails[0].type;
  let oldAmount = transaction.transactionDetails[0].amount;
  let newType = newDetails.type;
  let newAmount = newDetails.amount;
  console.log(newDetails)
  console.log(oldAmount)

  let moneyInIndex = userHaveMoneyIn.findIndex(
    (moneyIn) => moneyIn.name === oldType
  );
  console.log(moneyInIndex,userHaveMoneyIn,oldType,newType,newAmount)

  if (moneyInIndex === -1) {
    throw new Error(`User doesn't have "${oldType}" moneyIn.`);
  }

  if (oldType !== newType) {
    console.log("type chnage ha")
    userHaveMoneyIn[moneyInIndex].amount += oldAmount;
    moneyInIndex = userHaveMoneyIn.findIndex(
      (moneyIn) => moneyIn.name === newType
    );

    if (moneyInIndex === -1) {
      throw new Error(`User doesn't have "${newType}" moneyIn.`);
    }

    userHaveMoneyIn[moneyInIndex].amount -= newAmount;
  }
  if (oldType === newType && newAmount < oldAmount) {
    console.log("same samller")

    userHaveMoneyIn[moneyInIndex].amount += (oldAmount - newAmount);
  } 
  if (oldType === newType && newAmount > oldAmount) {
    console.log("same gretaer")
    userHaveMoneyIn[moneyInIndex].amount -= (newAmount - oldAmount);
    }
  else {
    console.log("differe")
    userHaveMoneyIn[moneyInIndex].amount += (newAmount - oldAmount);
  }

  let update = await User.findOneAndUpdate(
    { email: transaction.userEmail },
    { $set: { userHaveMoneyIn: userHaveMoneyIn } }
  );
  console.log("update===>",update)

  let updatedTransaction = await Transaction.findByIdAndUpdate(
    transactionId,
    { $set: { transactionDetails: [newDetails] } },
    { new: true }
  );

  return { updatedTransaction };
};
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
