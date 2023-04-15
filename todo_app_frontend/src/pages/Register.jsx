import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Context, server } from "../main";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
      const { data } = await axios.post(
        `${server}/users/new`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
        );
        console.log("before toast success");
          toast.success(data.message, { position: "bottom-center" });
          setIsAuthenticated(true)
        console.log("after toast success")
    } catch (error) {
        console.log("before toast error");
        toast.error("some error occured", { position: "bottom-center" });
        console.log("after toast error");
          console.log(error);
          setIsAuthenticated(false)
    }
  };

    if (isAuthenticated) return <Navigate to={'/'}/>
  return (
      <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
          <button>Sign Up</button>
          <h4>Already have account</h4>
          <Link to="/login">Login</Link>
        </form>
          </section>
          <Toaster />
    </div>
  );
};

export default Register;
