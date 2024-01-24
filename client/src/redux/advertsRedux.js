import { API_URL } from "../config";

//selectors
export const getAllAdverts = ({ adverts }) => adverts;
export const getAdvertById = ({ adverts }, advertId) =>
  adverts.find((advert) => advert._id === advertId);

// actions
const createActionName = actionName => `app/adverts/${actionName}`;
const DATA_ADVERTS = createActionName('DATA_ADVERTS');
const EDIT_ADVERT = createActionName('EDIT_ADVERT');

// action creators
export const getDataAdverts = payload => ({ type: DATA_ADVERTS, payload });
export const editAdvert = payload => ({ type: EDIT_ADVERT, payload });
export const fetchAdverts = () => {
  return (dispatch) => {
    fetch(API_URL + '/api/ads')
      .then(res => res.json())
      .then(adverts => dispatch(getDataAdverts(adverts)));
  }
};


const advertsReducer = (statePart = [], action) => {
  switch (action.type) {
    case DATA_ADVERTS:
      return [...action.payload]
    case EDIT_ADVERT:
      return statePart.map(advert => (advert.id === action.payload.id ? { ...advert, ...action.payload } : advert));
    default:
      return statePart;
  };
};
export default advertsReducer;