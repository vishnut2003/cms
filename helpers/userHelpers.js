const db = require('../config/dbconnection')
const collections = require('../config/collections')

module.exports = {
    registerUser: async (newUser) => {
        try{
            await db.getdb().collection(collections.USER_COLLECTIONS).insertOne(newUser);
        }catch(err){
            console.log(err)
        }
    }
}