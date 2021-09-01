const db = connect("mongodb://localhost:27017/testing")

/* this has to drop the test table and then repoopulate it */

    db.test.drop() 

    db.createCollection('testUsers')
    
/* this will insert one set of test data into a test db */

    db.test.insertOne([
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
        
        }
    ])