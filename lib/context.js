import { createContext, useState, useEffect } from 'react';
import { isLoggedIn } from './Firebase/auth';
import { useRouter } from 'next/router';

const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [seller, setSeller] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();

    const loginSeller = async (user) => {
        try {

            setSeller(user)

        } catch (error) {
            console.log(error.message)
            setSeller(null)
        }
    }

    useEffect(() => {
        setLoaded(false)
        isLoggedIn((user) => {
            console.log(user);
            setSeller(user);
            setLoaded(true);
        })
    }, [])

    return (
        <>
            <AuthContext.Provider value={{ seller, loginSeller, loaded }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}
export default AuthContext;
