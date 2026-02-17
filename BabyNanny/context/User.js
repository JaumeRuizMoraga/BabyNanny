import { createContext, useState } from 'react';
const User = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        babies: [
            {
        id: "idMongo",
        name: "nombreBebe",
        tutors: [],
        icon: require('../assets/img/baby_icon.png'),
        intakeRecord:[{date:'13/04/2025',type:'Toma',data:150},{date:'14/04/2025',type:'Toma',data:140},{date:'15/04/2025',type:'Toma',data:160}],
        sleepRecord:[{date:'13/04/2025',type:'Sueño',data:160},{date:'13/04/2025',type:'Sueño',data:200},
            {date:'14/04/2025',type:'Sueño',data:90},{date:'14/04/2025',type:'Sueño',data:230},{date:'14/04/2025',type:'Sueño',data:230},
            {date:'14/04/2025',type:'Sueño',data:230},{date:'14/04/2025',type:'Sueño',data:230}],
//        RegistroAlimentacion:[],
        medicalRecord:[{date:'13/04/2025',type:'Medico',recipe:{
            medicine: 'Paracetamol',
            dosis: 50,
            dosisTime: 72
        }}],
        assets:{
            height: 60,
            weight: 7,
            age: 4,
            intakePre: 17.5,
            sleepPre: 200,
        },
        //Importante: Altura(cm), peso(kg), edad(meses)
        events:[{
            date: "13/04/2025",
            description: "Vacuna contra el papiloma humano",
            hour: "03:30"
        }]

    },{
        id: "idMongo",
        name: "nombreBebe2",
        tutors: [],
        icon: require('../assets/img/baby_icon.png'),
        intakeRecord:[{date:'13/04/2025',type:'Toma',data:150},{date:'14/04/2025',type:'Toma',data:140},{date:'15/04/2025',type:'Toma',data:160}],
        sleepRecord:[{date:'13/04/2025',type:'Sueño',data:160},{date:'13/04/2025',type:'Sueño',data:200},
            {date:'14/04/2025',type:'Sueño',data:90},{date:'14/04/2025',type:'Sueño',data:230},{date:'14/04/2025',type:'Sueño',data:230},
            {date:'14/04/2025',type:'Sueño',data:230},{date:'14/04/2025',type:'Sueño',data:230}],
//        RegistroAlimentacion:[],
        medicalRecord:[{date:'13/04/2025',type:'Medico',recipe:{
            medicine: 'Paracetamol',
            dosis: 50,
            dosisTime: 72
        }}],
        assets:{
            height: 60,
            weight: 7,
            age: 4,
            intakePre: 17.5,
            sleepPre: 200,
        },
        //Importante: Altura(cm), peso(kg), edad(meses)
        events:[{
            date: "13/04/2025",
            description: "Vacuna contra el papiloma humano",
            hour: "03:30"
        }]

    }
],
        user: "Usuario_Ejemplo",
        pass: "Pasword_Ejemplo",
        mail: "jaumerumoraga@gmail.com",
        config: {
            lenguage: "en",
        },
        favSongs: [{
            titel: "INVISIBLE",
            uri: require('../assets/audio/INVISIBLE.mp3')
        },
        {
            titel: "All I Need",
            uri: require('../assets/audio/All_I_Need.mp3')
        }
        ]
    });
    return (
        <User.Provider value={{ user, setUser }}>
            {children}
        </User.Provider>
    );
};
export default User;