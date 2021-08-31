const { MongoClient } = require("mongodb");
// require('dotenv').config();

class Connection {

    static async open() {

        console.log(`connecting to ${process.env.DB_NAME} at url: ${process.env.DB_URL}`)
        console.log(`using collection: ${process.env.DB_COLLECTION} at url: ${process.env.DB_URL}`)

        try {
            this.client = await MongoClient.connect(process.env.DB_URL);
            this.db = this.client.db(process.env.DB_NAME);
            this.collection = this.db.collection(process.env.DB_COLLECTION);
        } catch (err) {
            console.log(err)
        }

        return this.client;
    }

}

Connection.uri = process.env.DB_URL;
Connection.client = null;
Connection.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

module.exports = Connection;
