import React, { createContext, Component, useReducer, useEffect } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch (action.auth) {
        case true:
            return { user: action.payload }
        case false:
            return { user: { name: "", isAuth: false, _id: "" } }
        default:
            return state
    }
}
export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, { user: null });
        useEffect(()=>{
            //TODO: here fetch the userCheck fetch
            //await dispatch({auth:false, payload:{ name: "", isAuth: false, _id: "" }})
        },[]);
    return ( 
        <UserContext.Provider value={{...state, dispatch}}>
                {children}
        </UserContext.Provider>
     );
}