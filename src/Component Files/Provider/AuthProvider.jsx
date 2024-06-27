import { createContext, useEffect, useState } from "react";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../Firebase/firebase.config";
import useAxios from "../../custom hooks/useAxios";


export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const axiosHook = useAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const signInWithGithub = () => {
    setLoading(true)
    return signInWithPopup(auth, githubProvider)
  }

  const logOut = ()=> {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        // get token and stored client site
        const userInfo = {email : currentUser.email}
        axiosHook.post('/jwt', userInfo)
        .then(res=>{
          if(res.data.token){
            localStorage.setItem('access-token', res.data.token);
          }
        })
      }
      else{
        localStorage.removeItem('access-token');
      }
      //console.log("current user is :", currentUser);
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    signInWithGoogle,
    signInWithGithub


  };
  return <AuthContext.Provider value={authInfo}>
           {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
