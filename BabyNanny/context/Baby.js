import { createContext, useState } from 'react';

const Baby = createContext();
/*
Explicación del objeto "baby":
@atr "madre": Nombre usuraio madre 
@atr "padre": Nombre usuraio padre 
@atr "registroTomas": Lista de objetos "Registro" de tipo "Toma". En data se almacena la 
cantidad de toma en MILILITROS
@atr "registroSueño": Lista de objetos "Registro" de tipo "Sueño". En data se almacena la 
cantidad de tiempo de sueño en MINUTOS
@atr "registroMedico": Lista de objetos "Registro" de tipo "Medico". 
El objeto receta almacena: Nombre del medicamento, cantidad de dosis en mg y 
duracion de tratamiento en horas
*/
export const BabyProvider = ({ children }) => {
    const [baby, setBaby] = useState({
        id: "idMongo",
        nombre: "nombreBebe",
        madre:'Usuario_Ejemplo',
        padre:undefined,
        icon: require('../assets/img/baby_icon.png'),
        registroTomas:[{date:'13/04/2025',tipo:'Toma',data:150},{date:'14/04/2025',tipo:'Toma',data:140},{date:'15/04/2025',tipo:'Toma',data:160}],
        registroSueño:[{date:'13/04/2025',tipo:'Sueño',data:160},{date:'13/04/2025',tipo:'Sueño',data:200},{date:'14/04/2025',tipo:'Sueño',data:90},{date:'14/04/2025',tipo:'Sueño',data:230},{date:'14/04/2025',tipo:'Sueño',data:230},{date:'14/04/2025',tipo:'Sueño',data:230},{date:'14/04/2025',tipo:'Sueño',data:230}],
//        RegistroAlimentacion:[],
        registroMedico:[{date:'13/04/2025',tipo:'Medico',receta:{
            medicamento: 'Paracetamol',
            dosis: 50,
            duracion: 72
        }}],
        caracteristicas:{
            altura: 60,
            peso: 7,
            edad: 4,
            tomaPre: 17.5,
            sleepPre: 200,
        },
        //Importante: Altura(cm), peso(kg), edad(meses)
        eventos:[{
            fecha: "13/04/2025",
            descrip: "Vacuna contra el papiloma humano",
            hora: "03:30"
        }]

    });
    return (
        <Baby.Provider value={{ baby, setBaby }}>
            {children}
        </Baby.Provider>
    );
};
export default Baby;