import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>Todo</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <button onClick={logoutHandler} className="btn"> Logout </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
      <Toaster />
    </nav>
  );
};

export default Header;
