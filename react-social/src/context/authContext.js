import {createContext, useReducer} from 'react';
import AuthReducer from './authReducer';

const InitialState = {
    user: null,
    isFetching: false,
    error: false,
    isUpdated: false,
    isEditProfile: false,
};

export const AuthContext = createContext(InitialState);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, InitialState);
    return (
        <AuthContext.Provider value={{
            user: state.user, 
            isFetching: state.isFetching, 
            error: state.error,
            isUpdated: state.isUpdated,
            isEditProfile: state.isEditProfile,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}