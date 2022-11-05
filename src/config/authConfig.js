import { createContext, useContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from 'firebase/auth'
import { auth, db } from './firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const nav = useNavigate();
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            //console.log(user.uid);
            const ref = doc(db, 'users', auth.currentUser.uid);
            addUserToDb(ref, user.uid, user.email);
            nav('/viewloans');
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(error)
        });
        // if (user != null) {
        //     const ref = doc(db, 'users', user.uid);
        //     addUserToDb(ref);
        // }
        console.log('Google Sign In')
    }

    const addUserToDb = async (ref, uid, email) => {
        let currentRef = ref
        let currentUserID = uid;
        let currentEmail = email;
        await setDoc(currentRef, {
            userEmail: currentEmail,
            userID: currentUserID
        }, {merge: false})
        console.log("Added User to DB")
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}