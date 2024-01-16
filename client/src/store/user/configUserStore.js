import { createSlice } from '@reduxjs/toolkit';
//store
const initUser = {
    user: null
};

// actions
function userReducer (state = initUser, action) {
    state.user = action.payload.user;
}

const userSlice = createSlice({
    name: 'userData',
    initialState:initUser,
    reducers: {
        dispatchUser: userReducer
    }
});


export const { dispatchUser } = userSlice.actions;
export default userSlice.reducer;