const db = connect("mongodb://localhost:27017/habittracker");

db.users.drop()
db.createCollection('users')

db.users.insertMany([
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
                frequency:1,
                dayCount: {date: '01-09-21', count:0},
                highest_streak: 2,
                priority: true
            },
            meditating:
            {
                start_date: '28-11-2021',
                name: 'meditating',
                tag: 'mental wellness',
                dates_completed: [],
                frequency: 3,
                dayCount: {date: '01-09-21', count:0},
                highest_streak: 0,
                priority: false
            }

        }
    },
    {
        user_email: 'sally@google.com',
        pseudoname: 'sally',
        password: 'hash',
        habits:
        {
            swimming:
            {
                start_date: '28-11-2021',
                name: 'swimming',
                tag: 'health',
                dates_completed: ['30-08-2021', '31-08-2021'],
                frequency: 3,
                dayCount: {date: '01-09-21', count:0},
                highest_streak: 2,
                priority: true
            },
            cooking:
            {
                start_date: '28-11-2021',
                name: 'cooking',
                tag: 'mental wellness',
                dates_completed: [],
                dayCount: {date: '01-09-21', count:0},
                frequency: 1,
                highest_streak: 0,
                priority: false
            }

        },
    }
])
