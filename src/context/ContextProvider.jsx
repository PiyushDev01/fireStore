import Context from "./Context";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, getDoc, doc, collection } from "firebase/firestore";
import { db } from "../firebase";

const UserContextProvider = ({ children }) => {
  const [isuser, setisUser] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [loadinguser, setLoadinguser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setisUser(true);
        setLoadinguser(true);
        try {
          const userDocRef = doc(collection(db, "users"), user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              uid: user.uid,
              admin: false,
            });
          }

          const userDocData = await getDoc(userDocRef);
          if (userDocData.exists()) {
            setLoginUser(userDocData.data());
          } else {
            console.log("No such document!");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }finally{
            setLoadinguser(false)
        }
            
        
            
      } else {
        setisUser(false);
        setLoginUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Context.Provider value={{ isuser, setisUser, loginUser, setLoginUser, loadinguser }}>
      {children}
    </Context.Provider>
  );
};

export default UserContextProvider;
