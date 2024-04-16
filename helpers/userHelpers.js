const db = require('../config/dbconnection')
const collections = require('../config/collections')
const bcrypr = require('bcrypt')

module.exports = {
    registerUser: async (newUser) => {

        newUser.password = await bcrypr.hash(newUser.password, 10)

        try{
            await db.getdb().collection(collections.USER_COLLECTIONS).insertOne(newUser);
        }catch(err){
            console.log(err)
        }
    }
}