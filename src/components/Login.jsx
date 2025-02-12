import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("elon1234@gmail.com");
  const [password, setPassword] = useState("Elon@1234");
  const [error, setError] = useState("");
  const disPatch = useDispatch();
  const navigate = useNavigate();


  // used cors to pass cross origin in backend
  const handleLogin = async () => {

    try{
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true});

      disPatch(addUser(res.data))
      return navigate("/");
    }
    catch(err){
      setError(err?.response?.data || "something went wrong");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input value={emailId} type="text" className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmailId(e.target.value)} />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input value={password} type="text" className="input input-bordered w-full max-w-xs" 
              onChange={(e) => setPassword(e.target.value)}  />
            </label>
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login