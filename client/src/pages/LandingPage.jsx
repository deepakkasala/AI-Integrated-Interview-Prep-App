import React from "react";
import HERO_IMG from "../assets/HERO-IMG.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/Modal";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="w-full min-h-full bg-[#fffcef]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              AI Interview Prep
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="hover:bg-black hover:text-white bg-linear-to-r from-[#ff9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login/Signup
              </button>
            )}
          </header>

          {/* HERO CONTENT */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-4">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Interview Preparation with
                <br />{" "}
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,#fcd760_100%)] bg-[length:200%_200%] bg-[position:0_100%] animate-text-shine font-semibold">
                  AI Powered learning
                </span>
              </h1>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-[16px] text-gray-700 mr-0 md:mr-20 mb-6">
                Get ready for your interviews with our AI-powered platform. Get
                role specific questions, and expand your answers anytime when
                you need them. Dive deeper into topics organize everything in
                your personal dashboard. From Preparation to mastery - Your
                ultimate interview tool-kit is here
              </p>
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-36">
            <img
              alt="Hero img"
              className="w-[80vh] rounded-lg"
              src={HERO_IMG}
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#fffcef] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-4xl font-medium text-center mb-12">
                Features that makes you Shine.
              </h2>
              <div className="flex flex-col items-center gap-8">
                {/* First Three Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Last Two Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {APP_FEATURES.slice(3, 5).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#fffef8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Made with ❤️ Happy Learning!
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
