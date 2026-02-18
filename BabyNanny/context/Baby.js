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
    const [baby, setBaby] = useState({})
    
    return (
        <Baby.Provider value={{ baby, setBaby }}>
            {children}
        </Baby.Provider>
    );
};
export default Baby;