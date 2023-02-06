const User = require('../models/User')
const updateUserBalance = async (email,payload) =>{
    let result = await User.findOneAndUpdate({email:email},{$set:{userHaveMoneyIn:payload}})
    console.log(result)
    return result
}
module.exports={updateUserBalance}