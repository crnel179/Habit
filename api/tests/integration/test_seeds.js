const db = connect("mongodb://localhost:27017/habittracker")

/* this has to drop the test table and then repoopulate it */

db.test.drop() 

/* population of test db happens here, 
    testing wants to find three different results,
    will only test three. have not populated these yet as
    i need the table to know the things i am populating.
 */
    db.createCollection('testUsers')
    
    db.test.insertMany([
        {
            user_email: 'test@test.com',
            pseudoname: 'test',
            password: 'password',
            habits:
            {
                test:
                {
                    start_date: '28-11-2021',
                    name: 'test',
                    tag: 'test',
                    dates_completed: ['30-08-2021', '31-08-2021'],
                    highest_streak: 2,
                    priority: true
                },
                tester:
                {
                    start_date: '28-11-2021',
                    name: 'tester',
                    tag: 'tester',
                    dates_completed: [],
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
                    highest_streak: 2,
                    priority: true
                },
                cooking:
                {
                    start_date: '28-11-2021',
                    name: 'cooking',
                    tag: 'mental wellness',
                    dates_completed: [],
                    highest_streak: 0,
                    priority: false
                }
    
            },
        }
    ])