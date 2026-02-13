export const sendIntake = (intake) => {
    const date = new Date();
    let intakeEntry = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "Toma",
        description: intake
    }
    console.log(intakeEntry)
}
export const sendSleep = (sleep) => {
    const date = new Date();
    let sleepEntry = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "Sueño",
        description: sleep
    }
    console.log(sleepEntry)
}

const intakeFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/;
const sleepFormat = /^(\d+)$/;
const ageFormat = /^(\d\d)$|^(\d)$/
const heightFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/
const weightFormat = /^(\d+)$|^(\d*\.(\d|\d\d|\d\d\d))$/


// export const comprobarDatos = (intake, sleep) => {
//     if (intakeFormat.test(intake)) {
//         setTomaIncorrecta(false);
//     } else {
//         setTomaIncorrecta(true);
//     }
//     if (sleepFormat.test(sleep)) {
//         setSleepIncorrecto(false)

//     } else {
//         setSleepIncorrecto(true);
//     }
// }

export const comprobarDatosCompleto = (intake, sleep, age, height, weight) => {
    const errors = { intake: false, sleep: false, height: false, weight: false, age: false };
    if (!intakeFormat.test(intake)) {
        if (!(intake === '')) {
            errors.intake = (true);
        }

    }
    if (!sleepFormat.test(sleep)) {
        if (!(sleep === '')) {

            errors.sleep = (true)
        }
    }
    if (!ageFormat.test(age)) {
        if (!(age === '')) {

            errors.age = (true)
        }
    }
    if (!weightFormat.test(weight)) {
        if (!(weight === '')) {

            errors.weight = (true)
        }

    }
    if (!heightFormat.test(height)) {
        if (!(height === '')) {

            errors.height = (true)
        }

    }
    return errors;

}
export const getAgeMonth = (stringDate) => {
    let date = new Date();
    let bornDate = new Date(stringDate);
    const yearDiff = (date.getFullYear() - bornDate.getFullYear())
    const monthDiff = date.getMonth() - bornDate.getMonth()
    var monthAge = (yearDiff * 12) + (monthDiff)
    if (date.getDay() - bornDate.getDay() <= 0) {
        monthAge--;
    }
    return monthAge
}