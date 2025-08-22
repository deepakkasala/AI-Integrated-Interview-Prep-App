const PORT = 3060;
export const BASE_URL = `http://localhost:${PORT}`;

export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GET_PROFILE: "/auth/profile",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/auth/upload-image",
  },
  AI: {
    GENERATE_QUESTIONS: "/ai/generate-questions",
    GENERATE_EXPLANATIONS: "/ai/generate-explanation",
  },
  SESSION: {
    CREATE: "/session/create",
    GET_ALL: "/session/my-sessions",
    GET_ONE: (id) => `/session/${id}`,
    DELETE: (id) => `/session/${id}`,
  },
  QUESTION: {
    ADD_TO_SESSION: "/questions/add",
    PIN: (id) => `questions/${id}/pin`,
    UPDATE_NOTE: (id) => `questions/${id}/note`,
  },
};
