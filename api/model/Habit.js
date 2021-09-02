const init = require('../dbConfig')

class Habit {
    constructor(body) {
        this.start_date = body.start_date
        this.name = body.name
        this.tag = body.tag
        this.dates_completed = body.dates_completed
        this.day_count = { date: body.start_date, completed: false, count: 0 }
        this.frequency = body.frequency
        this.highest_streak = 0
        this.priority = (body.priority == 'on' ? true : false)
    }

    static all(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const userData = await db.collection('users').find({ user_email: user }).toArray();
                const habits = userData[0].habits;
                const habitsArr = Object.values(habits);
                resolve(habitsArr);
            } catch (err) {
                console.log(err)
                reject('error retrieving habits')
            }
        })
    }

    static findByName(user, name) {
        return new Promise(async (resolve, reject) => {
            try {
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
                if (userData[0].habits[body.name]) {
                    throw new Error('you have a habit with this name already')
                }
                else if (body.priority == true) {
                    Habit.resetPriority()
                }
                const update = { $set: { [`habits.${body.name}`]: new Habit(body) } };
                await db.collection('users').updateOne({ user_email: user }, update) //this returned the not updated object
                resolve('successfully created habit')
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
                const habit = userData[0].habits[name]
                const currentCount = habit.day_count.count

                if (currentCount < habit.frequency) {
                    const newCount = currentCount + 1;
                    const update = { $set: { [`${habit}.day_count.count`]: newCount } };
                    await db.collection('users').updateOne({ user_email: user }, update)
                    resolve('successfully updated habit count');
                }
                else if (currentCount == habit.frequency && habit.dayCount.completed == false) {
                    const update =
                    {
                        $set: {
                            [`${habit}.day_count.completed`]: true,
                            'habit.dates_completed': habitCompleted(user, name),
                            'habit.highest_streak': Habit.getStreak()
                        
                        }
                    }
                    db.collection('users').findOneAndUpdate({ user_email: user }, update)
                    resolve('habit has been successfully completed for today')
                }
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
                await db.collection('users').updateOne({ user_email: user }, update);
                resolve('successfully updated the habit')
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
                await db.collection('users').updateOne({ user_email: user }, { $unset: { [`habits.${name}`]: "" } });
                resolve('successfully deleted habit')
            }
            catch (err) {
                console.log(err)
                reject('error in deleting this habit')
            }
        })
    }



    static getStreak(user) {

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
