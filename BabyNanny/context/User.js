import { createContext, useState } from 'react';
const User = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        babies: [{
            name: "nombreBebe1",
            tutors:[],
            icon: require('../assets/img/baby_icon.png'),
        }, {
            name: "nombreBebe2",
            tutors:[],
            icon: require('../assets/img/baby_icon.png'),
        },{
            name: "nombreBebe3",
            tutors:[],
            icon: require('../assets/img/baby_icon.png'),
        }],
        user: "Usuario_Ejemplo",
        pass: "Pasword_Ejemplo",
        mail: "jaumerumoraga@gmail.com",
        config: {
            idioma: "en",
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