import { useEffect, useState } from "react"
import initializeAuth from "../Firebase/firebase.init"
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useHistory } from "react-router";

initializeAuth()


const useFirebase = () => {
    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth()
    const history = useHistory()
    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)

    }

    const customSignUp = (email, password) => {
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const customSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {
                setUser({})

            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)

            }
            setIsLoading(false)
        })
    }, [])

    return {
        user,
        error,
        googleSignIn,
        customSignIn,
        customSignUp,
        logOut,
        setError,
        setIsLoading,
        isLoading
    }
}

export default useFirebase
