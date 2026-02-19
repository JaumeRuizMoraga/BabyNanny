

export const getBabyPos = (arrayBabies,idBebe) => {
    let result = arrayBabies.findIndex(elem => elem.id == idBebe)

    return result
}

console.log(getBabyPos([{id:'idMalo'},{id:'idMalo'},{id:'idMalo'},{id:'idBueno'},{id:'idMalo'},{id:'otroId'}],"idBueno"));