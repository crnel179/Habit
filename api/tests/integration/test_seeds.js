const db = connect("mongodb://localhost:27017/habittracker")

/* this has to drop the test table and then repoopulate it */

db.test.drop() 

/* population of test db happens here, 
    testing wants to find three different results,
    will only test three. have not populated these yet as
    i need the table to know the things i am populating.
 */

db.test.insertMany([
    {},
    {},
    {}
])