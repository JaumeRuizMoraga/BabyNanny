export const enviarToma = (toma) => {
    const date = new Date();
    let entradaToma = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "Toma",
        descrip: toma
    }
    console.log(entradaToma)
}
export const enviarSleep = (sleep) => {
    const date = new Date();
    let entradaSleep = {
        date: (date.getHours() + ":" + date.getMinutes() + "/" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()),
        type: "Sueño",
        descrip: sleep
    }
    console.log(entradaSleep)
}

const formatoToma = /^(\d+)$|^(\d*\.(\d|\d\d))$/;
const formatoSleep = /^(\d+)$/;
const formatoAge = /^(\d\d)$|^(\d)$/
const formadtoHeight = /^(\d+)$|^(\d*\.(\d|\d\d))$/
const formatoWeight = /^(\d+)$|^(\d*\.(\d|\d\d|\d\d\d))$/


export const comprobarDatos = (toma, sleep) => {
    if (formatoToma.test(toma)) {
        setTomaIncorrecta(false);

    } else {
        setTomaIncorrecta(true);

    }
    if (formatoSleep.test(sleep)) {
        setSleepIncorrecto(false)

    } else {


        setSleepIncorrecto(true);
    }
}
export const comprobarDatosCompleto = (toma, sleep, age, height, weight) => {
    const errores = { toma: false, sleep: false, height: false, weight: false, age: false };
    if (!formatoToma.test(toma)) {
        if (!(toma === '')) {
            errores.toma = (true);
        }

    }
    if (!formatoSleep.test(sleep)) {
        if (!(sleep === '')) {

            errores.sleep = (true)
        }
    }
    if (!formatoAge.test(age)) {
        if (!(age === '')) {

            errores.age = (true)
        }
    }
    if (!formatoWeight.test(weight)) {
        if (!(weight === '')) {

            errores.weight = (true)
        }

    }
    if (!formadtoHeight.test(height)) {
        if (!(height === '')) {

            errores.height = (true)
        }

    }
    return errores;

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