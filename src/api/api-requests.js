import axios from "axios";

export async function signupAPI({ username, email, password }) {
  let finalResponse = {};
  try {
    const response = await axios.post(
      "https://quizappbackend.shivaansh98.repl.co/signup",
      {
        username,
        email,
        password,
      }
    );
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
    const response = await axios.post(
      "https://quizappbackend.shivaansh98.repl.co/login",
      { email, password }
    );
    finalResponse = response.data;
  } catch (e) {
    finalResponse = e.response.data;
  } finally {
    return finalResponse;
  }
}
