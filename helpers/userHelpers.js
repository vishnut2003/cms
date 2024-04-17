const db = require('../config/dbconnection')
const collections = require('../config/collections')
const bcrypr = require('bcrypt')

module.exports = {
    registerUser: (newUser) => {

        return new Promise(async (resolve, reject) => {
            // Check if user already exist
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTIONS).findOne({username:newUser.username})
            const emailExist = await db.getdb().collection(collections.USER_COLLECTIONS).findOne({email:newUser.email})
            if(!usernameExist && !emailExist){
                newUser.password = await bcrypr.hash(newUser.password, 10);
                await db.getdb().collection(collections.USER_COLLECTIONS).insertOne(newUser)
                resolve()
            }else{
                reject()
            }
        })

        
    }
}