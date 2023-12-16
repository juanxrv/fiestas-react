import { configureStore } from "@reduxjs/toolkit"
import carritoReducer from "../features/carrito/carritoSlice"
import authReducer from "../features/auth/authSlice"
import queryReducer from "../features/productos/querySlice"

export default configureStore({
    reducer: {
        carrito: carritoReducer,
        auth: authReducer,
        query: queryReducer,
    },
});
