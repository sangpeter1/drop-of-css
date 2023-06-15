import axios from "axios";

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "CREATE_AUTH") {
    return [...state, action.auth];
  }
  if (action.type === "DELETE_AUTH") {
    return state.filter((auth) => auth.id !== action.auth.id);
  }
  return state;
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const updateAuth = (auth) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put("/api/auth", auth, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_AUTH", auth: response.data });
  };
};

export const createUser = (auth) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", auth);
    dispatch({ type: "CREATE_AUTH", auth: response.data });
  };
};

export const deleteUser = (auth) => {
  return async (dispatch) => {
    await axios.delete(`/api/auth/${auth.id}`);
    dispatch({ type: "DELETE_AUTH", auth });
  };
};

export default auth;
