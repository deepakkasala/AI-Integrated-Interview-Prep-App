import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImageToImageKit from "../../utils/uploadImageToImageKit";
// import uploadImage from "../../utils/uploadImageToImageKit";

const SignUp = ({ setCurrentPage }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");

    // Make API call to backend to create user account
    try {
      let profileImageUrl = "";
      if (profilePicture) {
        const imgUploadRes = await uploadImageToImageKit(profilePicture);

        profileImageUrl = imgUploadRes?.profileImageUrl || ""; // ImageKit returns 'url' in response
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(
          error.response.data.message || "Sign up failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector
          image={profilePicture}
          setImage={setProfilePicture}
        />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            required
          />

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
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button className="btn-primary" type="submit">
          SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
