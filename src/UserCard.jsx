import React from 'react'
import Userlogincard from './components/Userlogincard'
import { Link } from 'react-router-dom'
import { db } from './firebase'
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from 'react'


function UserCard() {

    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setFetchData(data);
        } catch (e) {
          console.error("Error fetching documents: ", e);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []); 
    return (
    <>
    <center><Link to="/form"><button className='w-fit px-4 py-2 md:mb-0 mb-4 bg-slate-900 rounded-full shadow-xl'>back</button></Link></center>
    {
        loading ? <h1>Loading...</h1> : fetchData.length === 0 ? <h1>No data available.</h1> : fetchData.map((data) => (
            <Userlogincard key={data.id} name={data.name} email={data.email} profile={data.photo} />
        ))
    }
    </>
  )
}

export default UserCard