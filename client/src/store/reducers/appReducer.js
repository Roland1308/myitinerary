import {
   HOME_ON, HOME_OFF,
   SEARCH_ON, SEARCH_OFF, SET_CERCA,
   BACK_ON, BACK_OFF
   } from "../actions/appActions";

const initialState = {
  homeLink: false,
  searchDiv: false,
  campoCerca: "",
  goBack: true
};

export default function popularsReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_ON:
      return {
        ...state,
        homeLink: true
      };
    case HOME_OFF:
      return {
        ...state,
        homeLink: false
      };

      case BACK_ON:
      return {
        ...state,
        goBack: true
      };
    case BACK_OFF:
      return {
        ...state,
        goBack: false
      };

      case SEARCH_ON:
        return {
          ...state,
          searchDiv: true
        };
      case SEARCH_OFF:
        return {
          ...state,
          searchDiv: false
        };
        case SET_CERCA:
        return {
          ...state,
          campoCerca: action.payload.campoCerca
        };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}