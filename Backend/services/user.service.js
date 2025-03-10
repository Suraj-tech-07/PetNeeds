const userModel = require('../moduls/user.model');

module.exports.createUser = async ({email ,username , password}) => {
    if(!email || !username || !password){
        throw new Error('All fields are required');
    }
    const user = new userModel({
        username,
         email ,
         password});
    await user.save(); // save uesr in database 
    return user; // Return the Mongoose instance 
}