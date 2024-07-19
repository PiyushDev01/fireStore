import React from 'react'

function Userlogincard(props) {
const {name,email, profile} = props

  return (
    <>
     <div id="usercard">
        <div className=' bg-zinc-900 flex flex-row p-4 gap-2 m-2 max-w-[95%] rounded-lg'>
            <img src={profile} className={`w-12 h-12 bg-slate-800  rounded-full`}   alt="null" />
            <div id="i1">
                <h1 className=' text-orange-500'>{name}</h1>
                <h1>{email}</h1>
            </div>
        </div>
    </div>
    </>
  )
}

export default Userlogincard