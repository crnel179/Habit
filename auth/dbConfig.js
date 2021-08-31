const { MongoClient } = require("mongodb");
require('dotenv').config();

class Connection {

    static async open(test = false) {

        this.client = await MongoClient.connect(
            test ? process.env.TEST_DB_URI : this.uri,
            this.options
        );

        this.db = this.client.db(process.env.DB_NAME);
        this.collection = this.db.collection(process.env.COLLECTION);

        return this.client;
    }

}

Connection.uri = process.env.DB_URI;
Connection.client = null;
Connection.options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

module.exports = Connection;
