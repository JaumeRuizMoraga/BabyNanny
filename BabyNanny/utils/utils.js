import { newEntry } from "../services/services";
import { getDataBabies } from '../services/services.js';
import { getDataUser } from '../services/services.js';
export const sendIntake = async (intake, idBebe, token) => {
    const date = new Date();
    let intakeEntry = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "intakeRecord",
        amount: intake
    }
    console.log(await newEntry(intakeEntry, idBebe, token))
}
export const sendSleep = async (sleep, idBebe, token) => {
    const date = new Date();
    let sleepEntry = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "sleepRecord",
        timeSleep: sleep
    }
    console.log(await newEntry(sleepEntry, idBebe, token))
}

export const sendMedic = async (sleep,idBebe,token) => {
    const date = new Date();
    let medicalEntry = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "medicalRecord",
        
    }
    console.log( await newEntry(sleepEntry,idBebe,token))
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
export const getLocalBaby = (arrayBabies, nameBaby) => {
    let result = arrayBabies.filter((elem) => elem.name == nameBaby);

    return result[0]
}
export const recargarDatos = async (token) => {
    console.log(token)
    try {
        let babies = await getDataBabies(token)
        let userReal = await getDataUser(token);
        userReal.babies = babies.babies;
        console.log("Lo que devuelve la recarga")
        console.log(userReal.babies)
        return userReal
    } catch (error) {
        console.error("Error cargando datos" + error)
    } finally {
        setIsLoading(false)
    }
}