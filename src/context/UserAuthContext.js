import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '~/config/firebase';

import { requestContent } from '~/utils/request';

const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const logInNoAuthen = async (email, password) => {
        return await requestContent.get('users/login', {
            params: {
                username: email,
                password: password,
            },
        });
    };

    const logIn = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            return { error: error.code };
        }
    };

    const signUp = async (email, password) => {
        try {
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            return { error: error.code };
        }
    };
    const logOut = async () => {
        return await signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = async () => {
            await onAuthStateChanged(auth, (currentuser) => {
                console.log('Auth', currentuser);
                setUser(currentuser);
            });
        };
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <userAuthContext.Provider value={{ user, logIn, signUp, logOut, logInNoAuthen }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
