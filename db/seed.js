const db = connect("mongodb://localhost:27017/habittracker");

db.users.drop()
db.createCollection('users')

db.users.insertMany([
    {
        user_email: 'jo@google.com',
        pseudoname: 'jo',
        password: '$2a$10$cPIePKthT6qI4Uq4JuRYkOrvle7ijFj1r0TAbFdHqntJ7XjSL7VtG',
        // password: 'hashbrowns',
        habits:
        {
            running:
            {
                start_date: '28-11-2021',
                name: 'running',
                tag: 'health',
                dates_completed: ['30-8-2021', '31-8-2021'],
                frequency:1,
                day_count: {date: '1-9-21', completed: false, count:0},
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
                day_count: {date: '1-9-21', completed: false, count:0},
                highest_streak: 0,
                priority: false
            }
        },
        verification:
        {
            status: false,
            token: null,
            timeRequested: null
        },
        recovery:
        {
            token: null,
            timeRequested: null
        }
    },
    {
        user_email: 'sally@google.com',
        pseudoname: 'sally',
        password: '$2a$10$fK2EzWmj/.Bud8ZwEqVrS.GrdzttkxEebieTFAHHQLrmyhJds5F.a',
        password: 'hash',
        habits:
        {
            swimming:
            {
                start_date: '28-11-2021',
                name: 'swimming',
                tag: 'health',
                dates_completed: ['30-8-2021', '31-08-2021'],
                frequency: 3,
                day_count: {date: '1-9-21', completed: false, count:0},
                highest_streak: 2,
                priority: true
            },
            cooking:
            {
                start_date: '28-11-2021',
                name: 'cooking',
                tag: 'mental wellness',
                dates_completed: [],
                day_count: {date: '1-9-21', completed:false, count:0},
                frequency: 1,
                highest_streak: 0,
                priority: false
            }

        },
        verification:
        {
            status: true,
            token: null,
            timeRequested: null
        },
        recovery:
        {
            token: null,
            timeRequested: null
        }
    }
])
