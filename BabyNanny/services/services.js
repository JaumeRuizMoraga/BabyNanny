<<<<<<< HEAD
export const login = async (loginData) => {
    try {
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/login', {
=======
const ip = '52.6.222.21';

export const login = async (newBabyData) => {
    try {



        const response = await fetch('http://'+ip+':8080/BabyNanny/login', {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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

export const register = async (newUserData) => {
    try {
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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



export const newBaby = async (newBabyData, token) => {
    try {
<<<<<<< HEAD
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/newBaby', {
=======
        const response = await fetch('http://'+ip+':8080/BabyNanny/newBaby', {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
            'http://52.6.222.21:8080/BabyNanny/babies?token=' + token
=======
            'http://'+ip+'/BabyNanny/babies?token=' + token
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
            'http://52.6.222.21:8080/BabyNanny/getUser?token=' + token
=======
            'http://'+ip+'/BabyNanny/getUser?token=' + token
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/logOut/' + idToken, {
=======
        const response = await fetch('http://'+ip+':8080/BabyNanny/logOut/' + idToken, {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/deleteBaby/' + idBebe, {
=======
        const response = await fetch('http://'+ip+':8080/BabyNanny/deleteBaby/' + idBebe, {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/newEntry/' + idBebe, {
=======
        const response = await fetch('http://'+ip+':8080/BabyNanny/newEntry/' + idBebe, {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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
<<<<<<< HEAD
        const response = await fetch('http://52.6.222.21:8080/BabyNanny/changeImage/' + idBebe, {
=======
        const response = await fetch('http://'+ip+':8080/BabyNanny/changeImage/' + idBebe, {
>>>>>>> 5886d27248d31fddf77b850e6340ae123f63c126
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