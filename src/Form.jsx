import React, { useState, useContext } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, signout } from "./firebase.js";
import Context from "./context/Context";

function Form() {
  const [details, setDetails] = useState({ name: "", phone: "", address: "" });

  const { loginUser } = useContext(Context);
  console.log(loginUser);
  async function pushdata() {
    if (details.name === "" || details.phone === "" || details.address === "") {
      alert("Please fill all the fields");
      return;
    } else {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: details.name,
          phone: details.phone,
          address: details.address,
            uid: loginUser.uid,
            admin: false
        });
        // console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        alert("Error adding document: ", e);
      }
    }

    setDetails({ name: "", phone: "", address: "" });
  }

  return (
    <>
      <div id="formContainer" className=" w-[20rem] flex flex-col">
        <div id="profile" className=" flex justify-between">
        <img src={loginUser && loginUser.photo} className=" mx-4 w-10 rounded-full" alt="" />
        <button
          className=" bg-blue-700 w-fit rounded-xl py-2 px-4"
          onClick={signout}
        >
          Sign Out
        </button>{" "}
        </div>
        <h1 className=" font-mono text-3xl p-2 m-2 font-semibold">{`Hi,${loginUser && loginUser.name.split(' ')[0]} `}</h1>
        <h1 className=" font-mono text-3xl p-2 m-2 font-semibold">{`Feed Your data `}</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={details.name}
          onChange={(e) => {
            setDetails({ ...details, name: e.target.value });
          }}
          className="m-2 p-2 rounded-lg text-black"
        />{" "}
        <br />
        <input
          type="number"
          placeholder="Phone No."
          value={details.phone}
          onChange={(e) => {
            setDetails({ ...details, phone: e.target.value });
          }}
          className="m-2 p-2 rounded-lg text-black"
        />{" "}
        <br />
        <textarea
          name="address"
          placeholder="Address"
          value={details.address}
          onChange={(e) => {
            setDetails({ ...details, address: e.target.value });
          }}
          id=""
          className=" rounded-lg border-2 border-slate-800 text-black p-2 m-2"
        ></textarea>{" "}
        <br />
        <button
          className=" bg-blue-700 rounded-xl py-2 px-4"
          onClick={pushdata}
        >
          Submit
        </button>{" "}
        <br />
      </div>
    </>
  );
}

export default Form;
