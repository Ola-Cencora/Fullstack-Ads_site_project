import { API_URL } from "../config";
import axios from "axios";
import initialState from "./initalState";

//selectors
export const getAllAdverts = ({ adverts }) => adverts.data;
export const getRequests = ({ adverts }) => adverts.requests;
export const getAdvertById = ({ adverts }, advertId) =>
  adverts.data.find((advert) => advert._id === advertId);

// actions
const createActionName = (actionName) => `app/adverts/${actionName}`;

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

const DATA_ADVERTS = createActionName("DATA_ADVERTS");
const EDIT_ADVERT = createActionName("EDIT_ADVERT");
const ADD_ADVERT = createActionName("ADD_ADVERT");

// action creators
export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

export const getDataAdverts = (payload) => ({ type: DATA_ADVERTS, payload });
export const editAdvert = (payload) => ({ type: EDIT_ADVERT, payload });
export const addAdvert = (payload) => ({ type: ADD_ADVERT, payload });

// thunks
export const fetchAdverts = () => {
  return async (dispatch) => {
    const requestName = DATA_ADVERTS;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(getDataAdverts(res.data));
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const addAdvertRequest = (newAdvert) => {
  return async (dispatch) => {
    const requestName = ADD_ADVERT;
    dispatch(startRequest({ name: requestName }));
    try {
      const fd = new FormData();
      fd.append("title", newAdvert.title);
      fd.append("text", newAdvert.text);
      fd.append("date", newAdvert.date);
      fd.append("img", newAdvert.img);
      fd.append("price", newAdvert.price);
      fd.append("location", newAdvert.location);
      fd.append("user", newAdvert.user);

      await axios.post(`${API_URL}/api/ads`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(fetchAdverts());
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const editAdvertRequest = (newAdvert) => {
  return async (dispatch) => {
    const requestName = EDIT_ADVERT;
    dispatch(startRequest({ name: requestName }));

    try {
      const fd = new FormData();
      fd.append("title", newAdvert.title);
      fd.append("text", newAdvert.text);
      fd.append("date", newAdvert.date);
      fd.append("img", newAdvert.img);
      fd.append("price", newAdvert.price);
      fd.append("location", newAdvert.location);
      fd.append("user", newAdvert.user);

      await axios.put(`${API_URL}/api/ads/${newAdvert.id}`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      dispatch(editAdvert(fd));
      dispatch(fetchAdverts());
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const deleteAdvertRequest = (id) => {
  return (dispatch) => {
    const options = {
      method: "DELETE",
      credentials: "include",
    };

    fetch(`${API_URL}/api/ads/${id}`, options).then(() => {
      dispatch(fetchAdverts());
    });
  };
};

const advertsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case DATA_ADVERTS:
      return { ...statePart, data: [...action.payload] };
    case EDIT_ADVERT:
      return {
        ...statePart,
        data: statePart.data.map((advert) =>
          advert._id === action.payload._id
            ? { ...advert, ...action.payload }
            : advert
        ),
      };
    case ADD_ADVERT:
      return { ...statePart, data: [...statePart.data, action.payload] };

    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };

    default:
      return statePart;
  }
};
export default advertsReducer;
