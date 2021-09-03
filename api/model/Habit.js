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
                else if (body.priority == 'on') {
                    Habit.resetPriority(userData, user, db)
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
                const userData = await db.collection('users').find({ user_email: user }).toArray();
                const habit = userData[0].habits[name];
                const currentCount = habit.day_count.count;
                if (currentCount == habit.frequency && habit.day_count.completed == false) {
                    await Habit.markAsCompleted(habit, user, db)
                    resolve('habit has been successfully completed for today')
                } else {
                    const newCount = currentCount + 1;
                    const update = { $set: { [`habits.${name}.day_count.count`]: newCount } };
                    // const update = { $set: { [`habits.${body.name}`]: new Habit(body) } };
                    await db.collection('users').updateOne({ user_email: user }, update)
                    resolve('successfully updated habit count');
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
                console.log('update called')
                const db = await init();
                const existingData = await db.collection('users').findOne({ user_email: user });
                let existingHabit = existingData.habits[name];
                let incomingChanges = Object.entries(body);
                for (const [key, value] of incomingChanges) {
                    console.log(key);
                    if (key == 'priority') {
                        console.log(key)
                        console.log(value)
                        existingHabit[key] = (value == 'on' ? true : false)
                    }
                    existingHabit[key] = value;
                }
                const updatedHabit = existingHabit;

                const update = { $set: { [`habits.${name}`]: updatedHabit } };
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

    static markAsCompleted(habit, user, db) {
        const name = habit.name
        const update =
        {
            $set: {
                [`habits.${name}.day_count.completed`]: true,
                [`habits.${name}.dates_completed`]: Habit.habitCompleted(habit),
                [`habits.${name}.highest_streak`]: Habit.getStreak(habit)
            }
        }
        db.collection('users').updateOne({ user_email: user }, update)
    }


    static getStreak(habit) {
        const datesArr = habit.dates_completed;
        let currentStreak;
        for (let i = datesArr.length - 1; i < 0; i--) {
            if (consecutiveDateCheck(datesArr[i], datesArr[i - 1])) {
                currentStreak++;
            }
            else {
                break;
            }
        }
        return Habit.compareStreaks(currentStreak, habit.highest_streak)
    }

    static compareStreaks(currentStreak, longestStreak) {
        if (currentStreak > longestStreak) {
            return currentStreak;
        } else {
            return longestStreak;
        }
    }

    static consecutiveDateCheck(date, previousDate) {
        const monthLengths = [31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31]
        let dateArr = date.split('-');
        let previousDateArr = previousDate.split('-');
        if (previousDateArr[0] == dateArr[0] - 1) {
            return true;
        }
        else if (previousDateArr[0] == monthLengths[previousDateArr[1] - 1] && dateArr[0] == 1) {
            return true;
        }
        else if (previousDateArr[0] == 31 && previousDateArr[1] == 12 && dateArr[0] == 1 && dateArr[1] == 1) {
            return true;
        }
        else {
            return false
        }
    }

    static habitCompleted(habit) {
        const datesArr = habit.dates_completed
        const date = new Date;
        const completedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return datesArr.push(completedDate)
    }

    static resetPriority(userData, user, db) {

        const habits = Object.values(userData[0].habits)
        const priorityHabit = habits.find(habit => habit.priority == true)
        const update = { $set: { [`habits.${priorityHabit.name}.priority`]: false } }
        db.collection('users').updateOne({ user_email: user }, update)
    }
}

module.exports = Habit;
