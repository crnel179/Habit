const init = require('../dbConfig')

class Habit {
    constructor(body) {
        this.name = body.name
        this.tag = body.tag
        this.frequency = body.frequency
        this.datesCompleted = body.datesCompleted
        this.highestStreak =
            this.priority = body.priority
    }

    static get all() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init()
                ///each row of database is a user. we need to find the correct row that matches the username of the current login
                const habitData = await db.collection('users').find({ user_email: user }, { habits: 1, _id: 0 }).toArray()
                //this line might not be necessary as why would we need to have the id property?
                //const habits = habitData.map(d => new Habit({...d, id: d._id}))
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
                const db = await init();
                const habitData = await db.collection.find({ user_email: user }, { habits: 1, _id: 0 }).toArray();
                //need to search through array for habit object with matching name
                const habit = null;
                habitData.forEach(element => {
                    if (element.name == name) {
                        habit = element;
                        resolve(habit);
                    }
                });
                throw new Error('no matching habit');
            } catch (err) {
                console.log(err)
                reject('error in returning this habit', err)
            }
        })
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
                const updatedHabits = db.collection.findOneAndUpdate({ user_email: user }, update, options);
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
