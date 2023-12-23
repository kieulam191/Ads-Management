import { createContext, useReducer } from 'react';

const initialState = {
  districts: [],
  adPoints: [],
  adBoards: [],
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DISTRICTS':
      return { ...state, districts: action.payload };
    case 'SET_AD_POINTS':
      return { ...state, adPoints: action.payload };
    case 'SET_AD_BOARDS':
      return { ...state, adBoards: action.payload };
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
