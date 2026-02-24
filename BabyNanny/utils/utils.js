import { newEntry } from "../services/services";
import { getDataBabies,getDataUser } from "../services/services";
import '../assets/i18n';

/**
 * Function used to send the intake data to the backend.
 * @function
 * @param {number} intake- Amount of milk that the baby has taken. 
 * @param {number} idBebe- Id of the baby that has taken the milk.
 * @param {string} token- Token of the user to identify it on the backend.
 * @returns {Promise}
 * */
export const sendIntake = (intake,idBebe,token) => {
    let intakeEntry = {
        type: "intakeRecord",
        amount: intake
    }
    newEntry(intakeEntry,idBebe,token)
}

/**
 * Function used to send the sleep data to the backend.
 * @function
 * @param {number} sleep- Amount of time that the baby has slept. 
 * @param {number} idBebe- Id of the baby that has slept.
 * @param {string} token- Token of the user to identify it on the backend.
 * @returns {Promise}
 * */
export const sendSleep = (sleep,idBebe,token) => {
    let sleepEntry = {
        type: "sleepRecord",
        timeSleep: sleep
    }
     newEntry(sleepEntry,idBebe,token)
}

/**
 * Function used to send the medical data to the backend.
 * @function
 * @param {string} medicine- Name of the medicine that the baby have taken. 
 * @param {number} dosis- Dosis of the medicine that the baby has taken.
 * @param {number} dosisTime- Time that the baby has taken the medicine.
 * @param {number} idBebe- Id of the baby that has taken the medicine.
 * @param {string} token- Token of the user to identify it on the backend.
 * @returns {Promise} 
 * */

export const sendMedic = (medicine,dosis,dosisTime,idBebe,token) => {
    let medicalEntry = {
      
        type: "medicalRecord",
        medicine: medicine,
        dosis: dosis,
        dosisTime: dosisTime
        
    }
    newEntry(medicalEntry,idBebe,token)
}

const intakeFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/;
const sleepFormat = /^(\d+)$/;
const ageFormat = /^(\d\d)$|^(\d)$/
const heightFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/
const weightFormat = /^(\d+)$|^(\d*\.(\d|\d\d|\d\d\d))$/

/**
 * Function used to check if the data that the user has introduced is correct.
 * If the data is correct, return false, if not, return true.
 * @function
 * @param {string} intake- Intake value that the user has introduced.
 * @param {string} sleep- Sleep value that the user has introduced.
 * @param {string} age- Age value that the user has introduced.
 * @param {string} height- Height value that the user has introduced.
 * @param {string} weight- Weight value that the user has introduced.
 * @returns {Object} Object with the errors of each field. If the field is correct, the value is false, if not, the value is true.
 * */

export const checkDataFull = (intake, sleep, age, height, weight) => {
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

/**
 * Function used to check if the data that the user has introduced is correct.
 * @function
 * @param {string} intake- Intake value that the user has introduced.
 * @returns {Object} Object with the errors of each field. If the field is correct, the value is false, if not, the value is true.
 * */

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
export const getLocalBaby = (arrayBabies,idBebe) => {
    let result = arrayBabies.filter((elem)=> elem.id == idBebe);

    return result[0]
}
export const getBabyPos = (arrayBabies,idBebe) => {
    let result = arrayBabies.findIndex(elem => elem.id == idBebe)
    console.log(result)

    return result
}

export const recargarDatos = async (token, setBaby, setUser, baby,setIsLoading) => {
    try {
        const babiesResponse = await getDataBabies(token);
        const userReal = await getDataUser(token);
        const listaBabies = babiesResponse.babies;
        userReal.babies = listaBabies;
        setUser(userReal);
        console.log("ID que buscamos:", baby?.id);

        let babyToPut = listaBabies.find(elem => String(elem.id) === String(baby?.id));

        if (babyToPut) {
            setBaby(babyToPut);
        } else {
            setBaby(listaBabies[0]);
        }

    } catch (error) {
        console.error("Error cargando datos: ", error);
    }finally{
        setIsLoading(false);
    }
};

export const parseDate = (date) =>{
    return date.toISOString().split('T')[0]
}
