//selectors
export const searchAdvert = ({ adverts, searchPhrase }) =>
  adverts.filter(advert => advert.title.toLowerCase().includes(searchPhrase.toLowerCase()));

//actions
const createActionName = actionName => `app/searchPhrase/${actionName}`;
const UPDATE_SEARCHPHRASE = createActionName('UPDATE_SEARCHPHRASE');

// action creators
export const updateSearchPhrase = (payload) => ({ type: UPDATE_SEARCHPHRASE, payload });

const searchAdvertsReducer = (statePart = "", action) => {
  switch (action.type) {
    case UPDATE_SEARCHPHRASE:
      return action.payload;
    default:
      return statePart;
  }
};

export default searchAdvertsReducer;