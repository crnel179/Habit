const { MongoClient } = require ('mongodb')
const connectionUrl = "mongodb+srv://habit-smashers21:pWGX766l3sYusCMA@habittracker.hms0s.mongodb.net/habitsmasher-db?retryWrites=true&w=majority"

const dbName = process.env.DB_NAME

const init = async () => {
    let client  = await MongoClient.connect(connectionUrl)
    console.log('connected to database!', dbName)
    client.close()
   // return client.db(dbName)
}

// module.exports = { init };

init()
