import { createContext, useState } from 'react';

const Token = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState();
    return (
        <Token.Provider value={{ token, setToken }}>
            {children}
        </Token.Provider>
    );
};
export default Token;