const ip = '52.6.222.21';

/**
 *  login function that sends a POST request to the backend with the user's login credentials.
 * @function
 * @param {Object} loginData - An object containing the user's login credentials (username and password).
 * @returns {Object} An object containing the authentication token and status code if the login is successful, or just the status code if the login fails.
 * @throws Will log an error to the console if there is a connection issue.
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
 * @function
 * @param {Object} newUserData newUserData returns the object that contains the userData to register
 * @returns {Object} An object containing the status code of the registration attempt, indicating whether it was successful or not.
 * @throws Will log an error to the console if there is a connection issue.
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
 *  verify function that sends a POST request to the backend with the user's verification data.
 * @param {Object} newUserData - The user data to be verified.
 * @param {string} code - The verification code.
 * @returns {Object} An object containing the authentication token and status code if the verification is successful, or just the status code if the verification fails.
 * @throws Will log an error to the console if there is a connection issue.
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
 * Function that sends a POST request to the backend to create a new baby entry in the database. It takes the new baby data and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not.
 * @function
 * @param {Object} newBabyData Data of the new baby to be created.
 * @param {string} token Identification token of the user, used for authentication in the request header.
 * @returns {Object} An object containing the status code of the operation, indicating whether the baby was successfully created or if there was an error.
 */
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
/**
 * Function that sends a GET request to the backend to retrieve the list of babies associated with the authenticated user. It takes the user's authentication token as a parameter and returns the data of the babies if the request is successful, or logs an error if there is a connection issue.
 * @function
 * @param {string} token The authentication token of the user.
 * @returns 
 */
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
/**
 * Function that sends a GET request to the backend to retrieve the data of the authenticated user. It takes the user's authentication token as a parameter and returns the user data if the request is successful, or logs an error if there is a connection issue.
 * @function
 * @param {*} token The authentication token of the user, used for authentication in the request header.
 * @returns {Object} An object containing the user data if the request is successful, or logs an error if there is a connection issue.
 */
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
/**
 * Function that sends a DELETE request to the backend to log out the user. It takes the user's authentication token as a parameter and returns a status code indicating whether the logout was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {string} idToken The authentication token of the user to be logged out.
 * @returns {number|null} The status code of the logout operation (204 if successful, null otherwise).
 */
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
/**
 * Function that sends a DELETE request to the backend to delete a baby from the user's account. It takes the ID of the baby to be deleted and the user's authentication token as parameters, and returns a status code indicating whether the deletion was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {string} idBebe The ID of the baby to be deleted.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the deletion operation (204 if successful, null otherwise).
 */
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
/**
 * Function that sends a PUT request to the backend to create a new entry for a baby. It takes the entry data, the ID of the baby, and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {Object} registro The data of the new entry to be created.
 * @param {string} idBebe The ID of the baby for which the entry is being created.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the creation operation (200 if successful, null otherwise).
 */
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
/**
 * Function that sends a PUT request to the backend to change the image of a baby. It takes the base64 encoded image data, the ID of the baby, and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {string} imagenBase64 The base64 encoded image data to be changed.
 * @param {string} idBebe The ID of the baby whose image is being changed.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the image change operation (204 if successful, null otherwise).
 */
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
        if (response.ok) {
            return 204
        }
    } catch (error) {
        console.error("Error en la conexión:", error);

    }
}
/**
 * Function that sends a PUT request to the backend to create a new event for a baby. It takes the event data, the ID of the baby, and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {Object} event The data of the new event to be created.
 * @param {string} idBebe The ID of the baby for which the event is being created.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the event creation operation (204 if successful, null otherwise).
 */
export const createEvent = async (event, idBebe, token) => {
    try {
        const response = await fetch('http://'+ip+':8080/BabyNanny/createEvent/' + idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token': token
            },
            body: JSON.stringify(event)

        });
        if (response.ok) {
            return 204
        }
    } catch (error) {
        console.error("Error en la conexión:", error);

    }
}
/**
 * Function that sends a PUT request to the backend to change the configuration of a user. It takes the configuration data, the ID of the user, and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {Object} config The configuration data to be changed.
 * @param {string} idUser The ID of the user whose configuration is being changed.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the configuration change operation (200 if successful, null otherwise).
 */
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
        if (response.ok) {
            return 200
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}

/**
 * Function that sends a PUT request to the backend to change the features of a baby. It takes the features data, the ID of the baby, and the user's authentication token as parameters, and returns a status code indicating whether the operation was successful or not, or logs an error if there is a connection issue.
 * @function
 * @param {Object} features The features data to be changed.
 * @param {string} idBebe The ID of the baby whose features are being changed.
 * @param {string} token The authentication token of the user.
 * @returns {number|null} The status code of the features change operation (200 if successful, null otherwise).
 */
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
        if (response.ok) {
            return 200
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}