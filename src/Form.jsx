import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase.js'

function Form() {
    const [details, setDetails] = useState({name: '', phone: '', address: ''})

    

    const pushdata = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
              name: details.name,
              phone: details.phone,
              address: details.address
            });
           // console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            alert("Error adding document: ", e);
          }

          setDetails({name: '', phone: '', address: ''})
        
    }
    

  return (
    <>
    
    <input type="text" placeholder='Enter Your Name' value={details.name} onChange={(e)=>{ setDetails({...details, name:e.target.value})}} className='m-2 p-2 rounded-lg text-black' /> <br />
    <input type="number"  placeholder='Phone No.'  value={details.phone} onChange={(e)=>{ setDetails({...details, phone:e.target.value})}} className='m-2 p-2 rounded-lg text-black' /> <br />
    <textarea name="address"  value={details.address} onChange={(e)=>{ setDetails({...details, address:e.target.value})}} id=""  className=' rounded-lg border-2 border-slate-800 text-black p-2 m-2'></textarea> <br />
    <button className=' bg-blue-700 rounded-xl py-2 px-4' onClick={pushdata} >Submit</button> <br />
    

    </>
  )
}

export default Form