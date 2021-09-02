const init = require('../dbConfig')

class Habit {
    constructor(body) {
        this.name = body.name
        this.tag = body.tag
        this.frequency = body.frequency
        this.datesCompleted = body.dates_completed
        this.priority = body.priority
    }

    static all(user) {
        return new Promise(async (resolve, reject) => {
            try {
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

    static findByName(user, name) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(user);
                console.log(name);
                const db = await init();
                const userData = await db.collection('users').find({ user_email: user }).toArray();
                const allHabits = userData[0].habits;
                let value;
                for (const habit in allHabits) {
                    if (habit === name) { value = allHabits[habit] }
                }
                resolve(value);
                if (!value) {
                    throw new Error('no matching habit');
                }
            } catch (err) {
                console.log(err)
                reject('error in returning this habit', err)
            }
        })
    }

    static create(user, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init()
                const userData = await db.collection('users').find({ user_email: user }).toArray()
                // if (userData[0].habits[body.name]) {
                //     throw new Error('you have a habit with this name already')
                // }
                // else if (body.priority == true) {
                //     Habit.resetPriority()
                // }
                const options = { returnNewDocument: true };
                const update = { $set: { [`habits.${body.name}`]: body } };
                const created = await db.collection('users').findOneAndUpdate({ user_email: user }, update, options)
                resolve(created)

            } catch (err) {
                console.log(err)
                reject('error in creating habit')
            }
        })
    }


    static updateCount(user, name) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init()
                const userData = await db.collection('users').find({ user_email: user }).toArray()
                const habit = userData[0].habits["name"]
                const currentCount = habit.dayCount.count

                if (currentCount < habit.frequency) {
                    const newCount = currentCount + 1;
                    const update = { $set: { [`${habit}.dayCount.count`]: newCount } };
                    const updated = await db.collection('users').findOneAndUpdate({ user_email: user }, update)
                    resolve(updated);
                }
                else if (currentCount == habit.frequency && habit.dayCount.completed == false) {
                    const update =
                    {
                        $set: { [`${habit}.dayCount.completed`]: true, 'habit.highest_streak': Habit.compareStreak() }
                    }
                    db.collection('users').findOneAndUpdate({ user_email: user }, update)
                }
                resolve(userData)
            } catch (err) {
                console.log(err)
                reject('error in updating your habit counter')
            }
        })
    }

    static update(user, name, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const update = { $set: { [`habits.${name}`]: body } };
                const options = { returnNewDocument: true };
                const updatedHabits = await db.collection('users').findOneAndUpdate({ user_email: user }, update, options);
                resolve(updatedHabits)
            }
            catch (err) {
                console.log(err)
                reject('error: could not update')
            }
        })
    }

    static delete(user, name) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const removed = await db.collection('users').findOneAndUpdate({ user_email: user }, { $unset: { [`habits.${name}`]: "" } });
                resolve(removed)
            }
            catch (err) {
                console.log(err)
                reject('error in deleting this habit')
            }
        })
    }



    static compareSteak() {

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
