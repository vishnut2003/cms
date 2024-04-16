const { MongoClient, ServerApiVersion  } = require('mongodb')
require('dotenv').config()

const url = 'mongodb+srv://vishnu:neBL2blthoqV9r7T@cms.zhqf6sq.mongodb.net/?retryWrites=true&w=majority&appName=cms';
const dbname = 'cms';

const state = {
    db: null
}

const dbclient = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbconnect = async (done) => {
    try{
        await dbclient.connect()
        state.db = await dbclient.db(dbname)
    }catch{
        return done('DB Not connected')
    }
    done()
}

const getdb = () => {
    return state.db;
}

module.exports = { dbconnect, getdb }