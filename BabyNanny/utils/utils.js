import { newEntry } from "../services/services";
import { getDataBabies,getDataUser } from "../services/services";
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { changeLanguage } from 'i18next';
import '../assets/i18n';

export const sendIntake = async (intake,idBebe,token) => {
    let intakeEntry = {
        type: "intakeRecord",
        amount: intake
    }
    newEntry(intakeEntry,idBebe,token)
}
export const sendSleep = async (sleep,idBebe,token) => {
    let sleepEntry = {
        type: "sleepRecord",
        timeSleep: sleep
    }
     newEntry(sleepEntry,idBebe,token)
}

export const sendMedic = async (medicine,dosis,dosisTime,idBebe,token) => {
    let medicalEntry = {
      
        type: "medicalRecord",
        medicine: medicine,
        dosis: dosis,
        dosisTime: dosisTime
        
    }
    console.log( await newEntry(medicalEntry,idBebe,token))
}

const intakeFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/;
const sleepFormat = /^(\d+)$/;
const ageFormat = /^(\d\d)$|^(\d)$/
const heightFormat = /^(\d+)$|^(\d*\.(\d|\d\d))$/
const weightFormat = /^(\d+)$|^(\d*\.(\d|\d\d|\d\d\d))$/


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
