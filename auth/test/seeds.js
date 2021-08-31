const db = connect("mongodb://localhost:27017/habitdb");

db.users.drop();
db.users.insertMany([
    {
        "email": "test1@test.com",
        "password": "test1pass",
        "name": "test1name",
        "verification": {
            "isVerified": true,
            "verificationToken": null,
            "timeRequested": null
        }
    }
]
)