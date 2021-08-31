const init = require('../api/dbConfig')

const db = connect(process.env.DB_CONNECTION);

db.users.drop()
db.createCollection('users')

db.users.insertMany(
    [
        {
            user_email: 'jo@google.com',
            pseudoname: 'jo',
            password: 'hashbrowns',
            habits:
            {
                running:
                {
                    start_date: '28-11-2021',
                    name: 'running',
                    tag: 'health',
                    dates_completed: ['30-08-2021', '31-08-2021'],
                    highest_streak: 2,
                    priority: true
                },
                meditating:
                {
                    start_date: '28-11-2021',
                    name: 'meditating',
                    tag: 'mental wellness',
                    dates_completed: [],
                    highest_streak: 0,
                    priority: false
                }

            },
        }
    ])

