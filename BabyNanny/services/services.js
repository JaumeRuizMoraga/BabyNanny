const ip = '52.6.222.21';

/**
 *  login function that sends a POST request to the backend with the user's login credentials.
 * 
 * @param {Object} loginData - An object containing the user's login credentials (username and password).
 * @returns 
 */

export const login = async (loginData) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            let token = await response.json()
            return { token: token, status: 200 }
        } else {
            return { status: 401 }
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

/**
 *  register function that sends a POST request to the backend with the user's registration data.
 * 
 * @param {Object} newUserData newUserData returns the object that contains the userData to register
 * @returns 
 */

export const register = async (newUserData) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newUserData)
        });
        console.log(response)
        if (response.ok) {
            return { status: 200 }
        } else {
            return { status: 401 }
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

/**
 * 
 * @param {*} newUserData 
 * @param {*} code 
 * @returns 
 */
export const verify = async (newUserData,code) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'code': code
            },
            body: JSON.stringify(newUserData)
        });
        console.log(response)
        if (response.ok) {
            let token = await response.json()
            return { token: token, status: 200 }
        } else {
            return { status: 401 }
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}



export const newBaby = async (newBabyData, token) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/newBaby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },

            body: JSON.stringify(newBabyData)
        });
        if (response.ok) {
            return { status: 200 }
        } else {
            return { status: 401 }
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
export const getDataBabies = async (token) => {
    try {
        const response = await fetch(
            'http://'+ip+':8080/BabyNanny/babies?token=' + token
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const getDataUser = async (token) => {
    try {
        const response = await fetch(
            'http://'+ip+':8080/BabyNanny/getUser?token=' + token
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const logout = async (idToken) => {
    try {
        console.log("Entrando a logout")
        const response = await fetch('http://'+ip+':8080/BabyNanny/logOut/' + idToken, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },

        });

        if (response.ok) {
            return 204
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

export const deleteBaby = async (idBebe, token) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/deleteBaby/' + idBebe, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },

        });
        if (response.ok) {
            return 204
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
export const newEntry = async (registro, idBebe, token) => {
    console.log(idBebe)
    console.log(token)
    console.log(registro)
    try {
        console.log("Entrando new entry")
        const response = await fetch('http://'+ip+':8080/BabyNanny/newEntry/' + idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(registro)

        });
        if (response.ok) {
            return 200
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }

}

export const changeImage = async (imagenBase64, idBebe, token) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/changeImage/' + idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(imagenBase64)

        });
        console.log(response)
        if (response.ok) {
            return 204
        }
    } catch (error) {
        console.error("Error en la conexión:", error);

    }
}

export const createEvent = async (evento, idBebe, token) => {
    console.log("1º par")
    console.log(evento)
        console.log("2º par")

    console.log(idBebe)
        console.log("3º par")

    console.log(token)
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/createEvent/' + idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(evento)

        });
        console.log(response)
        if (response.ok) {
            return 204
        }
    } catch (error) {
        console.error("Error en la conexión:", error);

    }
}

export const changeConfig = async (config,idUser,token) =>{
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/changeConfig/' + idUser, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(config)

        });
        console.log(response)
        if (response.ok) {
            return 200
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}


export const changeFeatures = async (features,idBebe,token) =>{
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/updateFeatures/' + idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(features)
        });
        console.log(response)
        if (response.ok) {
            return 200
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}