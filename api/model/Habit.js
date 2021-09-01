const init = require('../dbConfig')

class Habit {
    constructor(body) {
        this.name = body.name
        this.tag = body.tag
        this.frequency = body.frequency
        this.datesCompleted = body.dates_completed
        this.priority = body.priority
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                let user = 'jo@google.com';
                const db = await init();
                const userData = await db.collection('users').find({ user_email: user }).toArray();
                const habits = userData[0].habits;
                resolve(habits);
            } catch (err) {
                console.log(err)
                reject('error retrieving habits')
            }
        })
    }

    static findByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = 'sally@google.com' // substitute until system has been built on in passing the user credentials
                const db = await init();
                const userData = await db.collection('users').find({ user_email: user }).toArray();
                const allHabits = userData[0].habits;
                for (const habit in allHabits) {
                    if (habit == name) { resolve(allHabits[habit]) };
                }
                throw new Error('no matching habit');
            } catch (err) {
                console.log(err)
                reject('error in returning this habit', err)
            }
        })
    }

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = 'sally@google.com'
                const db = init()
                const update = { $set: { [`habits.${body.name}`]: body } };
                const userData = await await db.collection('users').find({ user_email: user }).toArray()
                if (checkUser.habits[body.name]) {
                    throw new Error('you have a habit with this name already')
                } else {
                    const created = await db.collection('users').findOneAndUpdate({ user_email: user }, update, options)
                    resolve(created)
                }

            } catch (err) {
                console.log(err)
                reject('error in creating habit')
            }
        })
    }
}

    static addCount(){

}
    // static update(name) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const db = await init();
    //             const habitData = await db.collection.find()
    //         }
    //     })
    // }

    //----------------------------------alternative update/ deletes method-----------------------------//


    static update(name, body) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await init();
            const update = { $set: { [`habits.${name}`]: body } };
            const options = { returnNewDocument: true };
            const updatedHabits = await db.collection.findOneAndUpdate({ user_email: user }, update, options);
            resolve(updatedHabits)
        }
        catch (err) {
            console.log(err)
            reject('error: could not update')
        }
    })
}

    static destroy(name) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await init();
            const removed = db.collection.remove({ user_email: user }, { $unset: { [`habits.${name}`]: "" } });
            resolve(removed)
        }
        catch (err) {
            console.log(err)
            reject('error in deleting this habit')
        }
    })
}
}

//---------------------------------------------------------------------------------------//

//     static destroy(name) {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const db = await init();
//                 const habitData = await db.collection.find({ user_email: user }, { habits: 1, _id: 0 }).toArray();
//                 //need to find the correct habit to pop.
//                 const habitIndex = habitData.find(habit => habit.name == name);
//                 newHabitArray = habitData.splice(habitIndex, 1);
//                 const removed = await db.collection.updateOne({ user_email: user }, { $set: { habits: newHabitArray } })
//                 resolve(removed)
//             }
//             catch (err) {
//                 console.log(err)
//                 reject('error in deleting this habit')
//             }
//         })
//     }
//

module.exports = Habit;