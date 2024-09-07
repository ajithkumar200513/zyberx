import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forgotpass = () => {
  const [Email,setEmail] = useState('') 
  const navigate = useNavigate()
  const handelclick = async(e) =>
  {
    e.preventDefault()
    const response = await fetch(`http://localhost:4000/Ak_Web/User/forgotpass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email:Email })
   });
    if(response.ok)
    {
    window.alert("Reset password link is send to your email address")
    navigate('/')
    }
    else
    {
      window.alert("something went wrong")
    }
  }
  return (
    <div>
      <form onSubmit={handelclick}>
        <label htmlFor='email'>Enter your Email Address</label>
        <input type='text' id='email' value={Email} onChange={(e) => setEmail(e.target.value)}></input>
        <button>Send verification Link</button>
      </form>
    </div>
  )
}

export default Forgotpass
