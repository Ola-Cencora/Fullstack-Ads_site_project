import { API_URL } from "../config";

// selectors
export const getUser = ({ user }) => user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");

// action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logOut = () => ({
  type: LOG_OUT,
});

// thunks
export const fetchUser = () => {
  return (dispatch) => {
    fetch(API_URL + "/auth/user")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("No logged in user");
        }
      })
      .then((user) => dispatch(logIn({ user })))
      .catch((err) => {
        console.log(err);
      });
  };
};
const usersReducer = (statePart = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export default usersReducer;
