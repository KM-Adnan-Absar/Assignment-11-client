import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../firebase_config";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {


    const googleProvider = new GoogleAuthProvider()
    // create User 
    const createUser = (email,password) => {
    return createUserWithEmailAndPassword ( auth , email ,password)
    }
// SignIn 
const signInUser = (email ,password) => {

    return signInWithEmailAndPassword(auth , email ,password)
}
// SignIn with Google

const signInWithGoogle = () => {

    return signInWithPopup(auth , googleProvider)
}


    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle
    }
    
    return (
        <AuthContext.Provider value = {authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;