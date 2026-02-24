import { createContext, useState } from 'react';

const Baby = createContext();


export const BabyProvider = ({ children }) => {
    const [baby, setBaby] = useState({})
    
    return (
        <Baby.Provider value={{ baby, setBaby }}>
            {children}
        </Baby.Provider>
    );
};
export default Baby;