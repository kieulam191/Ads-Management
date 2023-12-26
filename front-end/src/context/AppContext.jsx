import { createContext, useReducer } from "react";

const initialState = {
  districts: [],
  adPoints: [],
  adBoards: [],
  adtypes: [],
  adTableType: [],
  positionType: [],
  reportType: [],
  areas: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_DISTRICTS":
      return { ...state, districts: action.payload };
    case "SET_AD_POINTS":
      return { ...state, adPoints: action.payload };
    case "SET_AD_BOARDS":
      return { ...state, adBoards: action.payload };
    case "SET_AD_TYPES":
      return { ...state, adtypes: action.payload };
    case "SET_AD_TABLE_TYPES":
      return { ...state, adTableType: action.payload };
    case "SET_POSITION_TYPES":
      return { ...state, positionType: action.payload };
    case "SET_REPORT_TYPES":
      return { ...state, reportType: action.payload };
    case "SET_AREAS":
      return { ...state, areas: action.payload };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
