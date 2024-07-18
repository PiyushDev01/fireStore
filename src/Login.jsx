import React, { useContext } from 'react'
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from './firebase.js'
import { useNavigate } from "react-router-dom";
import Context from './context/Context';





function Login() {
    const {isuser} = useContext(Context);
    const navigate = useNavigate();
    const handlegoogleLogin = () => {
        
        signInWithPopup(auth, provider)
          .then((userCredential) => {
            const user = userCredential.user;
            
            navigate("/form");
          })
          .catch((err) => {
            alert(err);
          });
      };

  return (
    <>
    {
       isuser ? navigate('/form') :<div id="container">
       <h1 className=' font-mono text-3xl p-4 m-2 font-semibold text-center' >Login</h1>
       <div id="googlebox">
           <button className='bg-blue-700 rounded-xl py-2 px-4 m-2' onClick={handlegoogleLogin}>Login with Google</button>
       </div>
       </div> 
    }
    </>
  )
}

export default Login