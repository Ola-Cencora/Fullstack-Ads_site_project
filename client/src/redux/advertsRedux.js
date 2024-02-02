import { API_URL } from "../config";

//selectors
export const getAllAdverts = ({ adverts }) => adverts;
export const getAdvertById = ({ adverts }, advertId) =>
  adverts.find((advert) => advert._id === advertId);

// actions
const createActionName = (actionName) => `app/adverts/${actionName}`;
const DATA_ADVERTS = createActionName("DATA_ADVERTS");
const EDIT_ADVERT = createActionName("EDIT_ADVERT");
const ADD_ADVERT = createActionName("ADD_ADVERT");

// action creators
export const getDataAdverts = (payload) => ({ type: DATA_ADVERTS, payload });
export const editAdvert = (payload) => ({ type: EDIT_ADVERT, payload });
export const addAdvert = (payload) => ({ type: ADD_ADVERT, payload });

// thunks
export const fetchAdverts = () => {
  return (dispatch) => {
    fetch(API_URL + "/api/ads")
      .then((res) => res.json())
      .then((adverts) => dispatch(getDataAdverts(adverts)));
  };
};

export const addAdvertRequest = ({
  title,
  text,
  date,
  img,
  price,
  location,
  user,
}) => {
  return (dispatch) => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("text", text);
    fd.append("date", date);
    fd.append("img", img);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("user", user);

    const options = {
      method: "POST",
      credentials: "include",
      body: fd,
    };

    return fetch(API_URL + "/api/ads", options)
      .then(() => {
        dispatch(fetchAdverts());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editAdvertRequest = ({
  id,
  title,
  text,
  date,
  img,
  price,
  location,
  user,
}) => {
  return (dispatch) => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("text", text);
    fd.append("date", date);
    fd.append("img", img);
    fd.append("price", price);
    fd.append("location", location);
    fd.append("user", user);

    const options = {
      method: "PUT",
      credentials: "include",
      body: fd,
    };

    return (
      fetch(`${API_URL}/api/ads/${id}`, options)
        .then(() => {
          dispatch(
            editAdvert({
              id,
              title,
              text,
              date,
              img,
              price,
              location,
              user,
            })
          );
        })
        /*.then(() => {
        dispatch(fetchAdverts());
      })*/
        .catch((err) => {
          console.log(err);
        })
    );
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

const advertsReducer = (statePart = [], action) => {
  switch (action.type) {
    case DATA_ADVERTS:
      return [...action.payload];
    case EDIT_ADVERT:
      return statePart.map((advert) =>
        advert.id === action.payload.id
          ? { ...advert, ...action.payload }
          : advert
      );
    case ADD_ADVERT:
      return [...statePart, { ...action.payload }];
    default:
      return statePart;
  }
};
export default advertsReducer;
