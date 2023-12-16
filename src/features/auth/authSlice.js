import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        usuario: (localStorage.getItem("usuario")) ? JSON.parse(localStorage.getItem("usuario")) : null,
        token: (localStorage.getItem("token")) ? localStorage.getItem("token") : null,
        error: null
    },
    reducers: {
        login: (state, action) => {
            state.usuario = action.payload.usuario
            state.token = action.payload.token
            localStorage.setItem("usuario", JSON.stringify(action.payload.usuario))
            localStorage.setItem("token", action.payload.token)
        },
        logout: (state) => {
            state.usuario = null
            state.token = null
            localStorage.removeItem("usuario")
            localStorage.removeItem("token")
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        removeError: (state) => {
            state.error = null
        }
    },
});

export const { login, logout, setError, removeError } = authSlice.actions;

export default authSlice.reducer