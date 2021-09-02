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
                            'habit.dates_completed': habitCompleted(habit),
                            'habit.highest_streak': Habit.getStreak(habit)
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
        if(currentStreak > longestStreak){
            return currentStreak;
        }else{
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
}

module.exports = Habit;
