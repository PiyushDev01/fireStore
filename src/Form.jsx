import React, { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, signout } from "./firebase.js";
import Context from "./context/Context";
import { useNavigate } from "react-router-dom";


function Form() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const { loginUser, loadinguser } = useContext(Context);

  const { name: loginName, photo: loginPhoto, uid, admin } = loginUser || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const pushdata = async () => {
    const { name, phone, address } = details;
    if (!name || !phone || !address) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "mainData"), {
        name,
        phone,
        address,
        uid,
        feededby: loginName,
      });
      
    } catch (e) {
      alert("Error adding document: ", e.message);
    } finally {
      setLoading(false);
      setDetails({ name: "", phone: "", address: "" });
    }
  };

  return (
    <div id="formContainer" className="w-[20rem] flex flex-col">
      <div id="profile" className="flex justify-between">
      {!loading && <img src={loginPhoto} className="mx-4 w-10 rounded-full" alt="Profile" />}
        <button className="bg-blue-700 w-fit rounded-xl py-2 px-4" onClick={signout}>
          Sign Out
        </button>
      </div>
      <h1 className="font-mono text-3xl p-2 m-2 font-semibold">{`Hi, ${loadinguser ? "loading.." : loginName?.split(' ')[0]}`}</h1>
      <h1 className="font-mono text-3xl p-2 m-2 font-semibold">Enter Your Data</h1>
      <input
        type="text"
        placeholder="Your Name"
        name="name"
        value={details.name}
        onChange={handleChange}
        className="m-2 p-2 rounded-lg text-black"
      />
      <input
        type="number"
        placeholder="Phone No."
        name="phone"
        value={details.phone}
        onChange={handleChange}
        className="m-2 p-2 rounded-lg text-black"
      />
      <textarea
        name="address"
        placeholder="Address"
        value={details.address}
        onChange={handleChange}
        className="rounded-lg border-2 border-slate-800 text-black p-2 m-2"
      ></textarea>
      <button
        className="bg-blue-700 rounded-xl m-2 py-2 px-4"
        onClick={pushdata}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {admin ? (
        <><button className="bg-indigo-700 rounded-xl m-2 py-2 px-4" onClick={() => { navigate("/detail"); } }>
          See Details
        </button><button className="bg-purple-700 rounded-xl m-2 py-2 px-4" onClick={() => { navigate("/users"); } }>
            See Users
          </button></>
      
      ):(<button className="bg-green-700 rounded-xl m-2 py-2 px-4" onClick={()=>{alert("Gain premium access to view all data feeds.")}}>
          Premium
        </button>
      )}
    </div>
  );
}

export default Form;
