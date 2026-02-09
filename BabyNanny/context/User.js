import { createContext, useState } from 'react';
const User = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        bebes: [],
        usuario: "Usuario_Ejemplo",
        pasw: "Pasword_Ejemplo",
        correo: "jaumerumoraga@gmail.com",
        config: {
            idioma: "en",
        },
        cancionesFav: [{
            titulo: "INVISIBLE",
            uri: require('../assets/audio/INVISIBLE.mp3')
        },
        {
            titulo: "All I Need",
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