import PropTypes from "prop-types";
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase_config";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    //  Create User and Immediately Sign Out
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                return signOut(auth); 
            })
            .catch((error) => {
                console.error("Signup error:", error);
                setLoading(false);
            });
    };

    //  Sign In User
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //  Sign Out User
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    //  Sign In with Google
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    //  Check Auth State
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current user", currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
