//selectors
export const getAllAdverts = ({ adverts }) => adverts;
export const getAdvertById = ({ adverts }, advertId) =>
  adverts.find((advert) => advert.id === advertId);

// actions
const createActionName = actionName => `app/adverts/${actionName}`;
const DATA_ADVERTS = createActionName('DATA_ADVERTS');
const EDIT_ADVERT = createActionName('EDIT_ADVERT');

// action creators
export const getDataAdverts = payload => ({ type: DATA_ADVERTS, payload });
export const editAdvert = payload => ({ type: EDIT_ADVERT, payload });


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