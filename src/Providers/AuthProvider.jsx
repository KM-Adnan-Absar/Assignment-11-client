import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

const [user , setUser] = useState(null)

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

useEffect(() => {

const unSubscribe = onAuthStateChanged(auth , 

    currentUser => {

        console.log('Current user',currentUser);
        setUser(currentUser)
        

    })    
    return () => {
        unSubscribe();
    }

} ,[])

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