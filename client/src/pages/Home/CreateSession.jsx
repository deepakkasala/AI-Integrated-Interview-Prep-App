import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
const CreateSession = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus || !description) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setIsLoading(true);
    //Call AI API to generate questions...
    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );
      console.log("AI Response:", aiResponse);

      const generatedQuestions = aiResponse.data.questions || [];

      //Now, create a session with these questions
      const sessionResponse = await axiosInstance.post(
        API_PATHS.SESSION.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );
      console.log("Session Creation Response:", sessionResponse);

      if (sessionResponse.data?.session?._id) {
        navigate(`/interview-prep/${sessionResponse.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to generate questions. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a new Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few details and unlock your personalized set of interview
        questions.
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          label="Target Role"
          placeholder="(E.g. frontend developer, UI/UX developer, etc.)"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          type="text"
        />
        <Input
          label="Years of Experience"
          placeholder="E.g. 1 year, 3 years, 5+ years"
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          type="text"
        />
        <Input
          label="Topics to Focus On"
          placeholder="(Comma-separated E.g., React, node.js, MongoDB)"
          value={formData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
          type="text"
        />
        <Input
          label="Description"
          placeholder="(Any specific goals or areas you want to focus on)"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          type="text"
        />

        {error && <p className="text-xs text-red-500 pb-2.5">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "btn-primary"
          } text-white px-4 py-2 rounded mt-4`}
        >
          {isLoading ? "Creating Session..." : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSession;
