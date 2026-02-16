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
        console.log("login")
        let token = await response.text()
        console.log(token)
        return 204
    }else{
        return null
    }


  } catch (error) {
    console.error("Error en la conexión:", error);
  }
}
export const getData = async (token) => { 
try { 
const response = await fetch( 
'http://3.216.66.25:8080/BabyNanny/babies?token='+token
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