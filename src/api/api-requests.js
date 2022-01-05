import axios from "axios";
import { BASE_URL } from "@utils/constants.js";

export async function signupAPI({ username, email, password }) {
  let finalResponse = {};
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      username,
      email,
      password,
    });
    finalResponse = response.data;
  } catch (e) {
    finalResponse = e.response.data;
  } finally {
    return finalResponse;
  }
}

export async function loginAPI({ email, password }) {
  let finalResponse = {};
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    finalResponse = response.data;
  } catch (e) {
    finalResponse = e.response.data;
  } finally {
    return finalResponse;
  }
}

export async function getQuizListAPI({ authorizationToken }) {
  let finalResponse = {};
  const config = {
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/quizzes`, config);
    finalResponse = {
      ...response.data,
      statusCode: response.status,
    };
  } catch (e) {
    finalResponse = {
      ...e.response.data,
      statusCode: e.response.status,
    };
  } finally {
    return finalResponse;
  }
}

export async function getQuestionsForCurrentQuizAPI({
  quizId,
  authorizationToken,
}) {
  let finalResponse = {};
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
    };
    const response = await axios.get(
      `${BASE_URL}/api/v1/questions/${quizId}`,
      config
    );
    finalResponse = {
      ...response.data,
      statusCode: response.status,
    };
  } catch (e) {
    finalResponse = {
      ...e.response.data,
      statusCode: e.response.status,
    };
  } finally {
    return finalResponse;
  }
}

export async function updateUserDetailsAPI({
  email,
  quizId,
  authorizationToken,
}) {
  let finalResponse = {};
  const config = {
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
    },
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/user`,
      { email: email, completedQuizId: quizId },
      config
    );
    finalResponse = {
      ...response.data,
      statusCode: response.status,
    };
  } catch (e) {
    finalResponse = {
      ...e.response.data,
      statusCode: e.response.status,
    };
  } finally {
    return finalResponse;
  }
}
