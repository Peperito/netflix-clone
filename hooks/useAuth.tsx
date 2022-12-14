import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User} from "firebase/auth"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { auth } from "../firebase"
import { useRouter } from "next/router"


interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logOut: () => Promise<void>
    error: string | null
    loading: boolean
}

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false
})

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    useEffect( 
        () => 
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(true)
                    router.push("/login")
                }
            
            setInitialLoading(false)
        }),
        [auth]
    )

    const signUp = async (email : string, password: string) => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user)
                router.push("/")
                setLoading(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const signIn = async (email : string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                setUser(userCredentials.user)
                router.push("/")
                setLoading(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const logOut = async () => {
        setLoading(true)
        await signOut(auth).then(() => setUser(null))
        .catch(error => alert(error.message))
        .finally(() => setLoading(false)) 
    }

    const memoedVal = useMemo(
        () => ({
            user,
            signIn,
            logOut,
            signUp,
            error,
            loading
        }),
        [user, loading]
    )

    return <AuthContext.Provider value={memoedVal}>
        {!initialLoading && children}
    </AuthContext.Provider>
}

export default function useAuth() {
    return useContext(AuthContext)
}