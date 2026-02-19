import { newEntry } from "../services/services";
import { getDataBabies,getDataUser } from "../services/services";
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

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
export const getLocalBaby = (arrayBabies,idBebe) => {
    let result = arrayBabies.filter((elem)=> elem.id == idBebe);

    return result[0]
}
export const getBabyPos = (arrayBabies,idBebe) => {
    let result = arrayBabies.findIndex(elem => elem.id == idBebe)

    return result
}
export const recargarDatos = async (token,setBaby,setUser,posBaby) => {
    try {
        let babies = await getDataBabies(token)
        let userReal = await getDataUser(token);
        userReal.babies = babies.babies;
        setUser(userReal);
        setBaby(babies.babies[posBaby]);
        console.log(posBaby)
    } catch (error) {
        console.error("Error cargando datos" + error)
    }
}
// export const imageLocalToBase64 = async (staticResource) => {
//     console.log("Entrando en bas64")
//   try {

//     const asset = Asset.fromModule(staticResource);
//     await asset.downloadAsync();

//     const uri = asset.localUri || asset.uri;


//     const base64 = await FileSystem.readAsStringAsync(uri, {
//       encoding: 'base64',
//     });

//     const extension = asset.type === 'jpg' ? 'jpeg' : (asset.type || 'png');
//     let image = `data:image/${extension};base64,${base64}`
//     console.log(image)
    
//     return image;
    
//   } catch (error) {
//     console.error("Error al convertir la imagen local:", error);
//     return null;
//   }
// };