const ip = '52.6.222.21';

export const login = async (newBabyData) => {
    try {



        const response = await fetch('http://'+ip+':8080/BabyNanny/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(newBabyData)
        });
        console.log(response)
        if (response.ok) {
            let token = await response.json()
            console.log(token)
            return { token: token, status: 200 }
        } else {
            return null
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
            return null
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
    console.log(imagenBase64);
    console.log(idBebe);
    console.log(token);
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
export const changeFeatures = async (features,idBebe,token) =>{
    try {
        console.log("Entrando new entry")
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