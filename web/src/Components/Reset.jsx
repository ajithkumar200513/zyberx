import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Reset = () => {
  const [password,setNewpassword] = useState('')
  const [cpass,setCpass] = useState('')
  const [Error,setError] = useState('')
  const navigate = useNavigate() 
  const handelclick = async(e) =>
  {
    e.preventDefault()
    const token = window.location.pathname.split("/").pop();
    if(password === cpass)
    {
    const response = await fetch(`http://localhost:4000/Ak_Web/User/reset/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword:password })
   });
   if(response.ok)
   {
    console.log("password updated")
    navigate('/')
   }
  }
  else
  {
      setError("Password Not Match")
  }
    
  }
  return (
    <div>
      <form onSubmit={(e) => handelclick(e)}>
        <label htmlFor='np'>New Password</label>
        <input id="np" type='text' value={password} onChange={(e) => (setNewpassword(e.target.value))}></input>
        <label htmlFor='cp'>Confrim Password</label>
        <input id="cp" type='text' value={cpass} onChange={(e) => (setCpass(e.target.value))}></input>
        <button>Change password</button>
       </form>
       {Error && <div >{Error}</div>}
    </div>
  )
}

export default Reset
