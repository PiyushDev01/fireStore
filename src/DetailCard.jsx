import React, { useState } from 'react'
import { db } from './firebase.js'

import { collection, getDocs } from "firebase/firestore"; 




function DetailCard() {
        
    const [fetchData, setFetchData] = useState([]);
    const [data, setData] = useState(false);
    
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const fetchData = [];
            querySnapshot.forEach((doc) => {
                fetchData.push({id: doc.id, name: doc.data().name, phone: doc.data().phone, address: doc.data().address});
            });
            setFetchData(fetchData);
            setData(!data);
        }

        const hidedata = () => {
            setData(!data);
            setFetchData([]);
        }
        


  return (
    <>
    <button className='bg-blue-700 rounded-xl py-2 px-4 m-2' onClick={getData} >Fetch data </button>
    { !data ? null : (<button className='bg-blue-700 rounded-xl py-2 px-4 m-2' onClick={hidedata} >hide data </button>)}

    <div id="datacontainer" className=' flex justify-center flex-wrap ' >
    {
        fetchData.map((data)=>{
            return (
                <div key={data.id} className='m-2 p-4 text-left  bg-sky-500 text-slate-800 min-w-60 min-h-32 flex flex-col justify-center rounded-lg'>
                    <h1>Name:  {data.name}</h1> 
                    <h1> Phone No.: {data.phone}</h1>
                    <h1 >Address: {data.address}</h1>
                </div>
            )})
        }
    </div>

    
    </> // Add a closing parenthesis after the opening tag to fix the syntax error.
    )
}

export default DetailCard