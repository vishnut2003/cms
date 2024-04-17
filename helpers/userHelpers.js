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
        
    },
    doLogin: (user) => {
        
        return new Promise( async (resolve, reject) => {
            const usernameExist = await db.getdb().collection(collections.USER_COLLECTIONS).findOne({username: user.username})
            const emailExist = await db.getdb().collection(collections.USER_COLLECTIONS).findOne({email: user.username})
            
            if(usernameExist){
                await bcrypr.compare(user.password, usernameExist.password, (err, result) => {
                    if (result) 
                        resolve()
                })
            }else if(emailExist){
                await bcrypr.compare(user.password, emailExist.password, (err, result) => {
                    if (result) 
                        resolve()
                })
            }else{
                reject()
            }
        })

    }
}