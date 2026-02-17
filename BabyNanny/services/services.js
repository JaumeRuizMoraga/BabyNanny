export const login = async (newBabyData) => {
    try {



        const response = await fetch('http://52.2.207.230:8080/BabyNanny/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(newBabyData)
        });

        if (response.ok) {
            let token = await response.json()
            console.log("Saliendo token")
            console.log(token)
            return {token:token,status:200}
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
export const newBaby = async (newBabyData,token) => {
    try {
        console.log("Entrando new baby")
        const response = await fetch('http://52.2.207.230:8080/BabyNanny/newBaby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token':token
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
        console.log("Entrando en getBabies")
    try {
        const response = await fetch(
            'http://52.2.207.230:8080/BabyNanny/babies?token=' + token
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
    console.log("Entrando en getUser")
    try {
        const response = await fetch(
            'http://52.2.207.230:8080/BabyNanny/getUser?token=' + token
        );
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const logout = async (idToken) =>{
        try {
        console.log("Entrando a logout")
        const response = await fetch('http://52.2.207.230:8080/BabyNanny/logOut/'+idToken, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },

        });
        console.log(response)
        if (response.ok) {
            return  204 
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
export const deleteBaby = async(idBebe) => {
    try {
        console.log("Entrando a delete baby")
        const response = await fetch('http://52.2.207.230:8080/BabyNanny/deleteBaby/'+idBebe, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },

        });

        if (response.ok) {
            return  204 
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }
}
export const newEntry = async(registro,idBebe,token) => {
        try {
        const response = await fetch('http://52.2.207.230:8080/BabyNanny/newEntry/'+idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token':token
            },
            body: JSON.stringify(registro)

        });
        if (response.ok) {
            return  204 
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    } }

    export const changeImage = async(imagenBase64,idBebe,token) => {
        console.log(imagenBase64);
        console.log(idBebe);
        console.log(token);
        try {
        const response = await fetch('http://52.2.207.230:8080/BabyNanny/changeImage/'+idBebe, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token':token
            },
            body: JSON.stringify(imagenBase64)

        });
        if (response.ok) {
            return  204 
        } else {
            return null
        }


    } catch (error) {
        console.error("Error en la conexión:", error);
    }

}