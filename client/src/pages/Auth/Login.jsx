import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter password.");
      return;
    }
    setError("");

    // Login API Call to backend to validaerte user credentials
    try {
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your credentials to log in.
      </p>

      <form onSubmit={handleLogin} className="mt-4">
        <Input
          type="text"
          label="Email Address"
          placeholder="john@example.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          required
        />
        <Input
          type="password"
          label="Password"
          placeholder="Min 8 characters"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button className="btn-primary" type="submit">
          LOGIN
        </button>
        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
