import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

// import axios from "axios";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }:any) => {
    const [user, setUser] = useState< any| null>(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email:string, password:any) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email:string, password:any) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // const updateUserProfile = (name:string, photo:string) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL: photo
    //     });
    // }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('current user', currentUser);

            // get and set token
            // if(currentUser){
            //     axios.post('https://summer-camp-server-flame.vercel.app/jwt', {email: currentUser.email})
            //     .then(data =>{
            //         // console.log(data.data.token)
            //         localStorage.setItem('access-token', data.data.token)
            //         setLoading(false);
            //     })
            // }
            // else{
            //     localStorage.removeItem('access-token')
            // }

            
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo:any = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        // updateUserProfile,
        setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;