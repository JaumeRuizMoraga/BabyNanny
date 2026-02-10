export const enviarToma = (toma) =>{
            const date = new Date();
        let entradaToma = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "Toma",
            descrip: toma
        }
        console.log(entradaToma)
}
export const enviarSleep = (sleep) =>{
    const date = new Date();
            let entradaSleep = {
            date: (date.getHours()+":"+date.getMinutes()+"/"+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()),
            type: "Sueño",
            descrip: sleep
        }
        console.log(entradaSleep)
}