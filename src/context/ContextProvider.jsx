import Context from "./Context";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

 const UserContextProvider = ({ children }) => {
    const [isuser, setisUser] = useState(null);
    const [loginUser, setLoginUser] = useState(null);
useEffect(() => {
    onAuthStateChanged(auth,(user) => {
        if (user) {
            setisUser(true);
            setLoginUser({uid: user.uid , name: user.displayName, email: user.email, photo: user.photoURL });
        } else {
            setisUser(false);
            setLoginUser(null);
        }
    });
}, []);

    return <Context.Provider value={{ isuser, setisUser, loginUser, setLoginUser }}>{children}</Context.Provider>;
    }

export default UserContextProvider;