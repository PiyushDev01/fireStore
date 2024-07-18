import React, { useEffect, useState } from 'react';
import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';

function DetailCard() {
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "mainData"));
        const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setFetchData(data);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      <center>
        <Link to="/form">
          <button className='w-fit px-4 py-2 bg-slate-900 rounded-full shadow-xl'>
            Back
          </button>
        </Link>
      </center>

      <div id="datacontainer" className='md:m-8 flex justify-center flex-wrap'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          fetchData.length === 0 ? (
            <h1>No data available.</h1>
          ) : (
            fetchData.map((data) => (
              <div key={data.id} className='m-2 p-4 text-left shadow-xl bg-zinc-900 text-slate-100 md:min-w-60 md:w-fit w-[80%] md:min-h-32 flex flex-col justify-center rounded-lg'>
                <h1 className='text-orange-500'>
                  <span className='text-sky-500'>Name:</span> {data.name}
                </h1>
                <h1>
                  <span className='text-sky-500'>Phone No.:</span> {data.phone}
                </h1>
                <h1>
                  <span className='text-sky-500'>Address:</span> {data.address}
                </h1>
              </div>
            ))
          )
        )}
      </div>
    </>
  );
}

export default DetailCard
