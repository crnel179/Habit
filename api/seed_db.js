const { init } = require('./dbConfig');

async function seeding() {
    const db = await init()
}


