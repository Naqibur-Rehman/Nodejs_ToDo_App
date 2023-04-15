import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
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
          <button>Login</button>
          <h4>Or, new user Register first</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
      <Toaster />
    </div>
  );
};

export default Login;
