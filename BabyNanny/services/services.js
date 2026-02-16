export const login = async (newBabyData) => {
    try {



        const response = await fetch('http://3.216.66.25:8080/BabyNanny/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify(newBabyData)
        });

        if (response.ok) {
            let token = await response.text()
            return { token: token, status: 200 }
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
        const response = await fetch('http://3.216.66.25:8080/BabyNanny/newBaby', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'token':token
            },

            body: JSON.stringify(newBabyData)
        });

        if (response.ok) {
            let token = await response.text()
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
            'http://3.216.66.25:8080/BabyNanny/babies?token=' + token
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};
export const getDataUser = async (token) => {
    try {
        const response = await fetch(
            'http://3.216.66.25:8080/BabyNanny/babies?token=' + token
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
};