import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const carritoSlice = createSlice({
    name: "carrito",
    initialState: {
        carrito: (localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")) : [],
        total: (localStorage.getItem("carrito")) ? JSON.parse(localStorage.getItem("carrito")).reduce((total, producto) => total + producto.producto.Precio * producto.cantidad, 0) : 0
    },
    reducers: {
        addCarrito: (state, action) => {

            let producto = action.payload
            let carrito = state.carrito
            let existe = false
            let cantidad = 1
            let total = state.total ? state.total : 0

            carrito.forEach(element => {
                if (element.producto.Id === producto.Id) {
                    existe = true
                    cantidad = element.cantidad + 1
                }
            })

            if (cantidad > producto.Cantidad) {
                toast.error("No hay suficiente stock", { position: toast.POSITION.TOP_CENTER })
                return
            }

            if (!existe) {
                carrito.push({ cantidad: cantidad, producto: producto })
            } else {
                carrito.forEach(element => {
                    if (element.producto.Id === producto.Id) {
                        element.cantidad = cantidad
                    }
                })
            }

            total += producto.Precio
            state.total = total
            state.carrito = carrito
            localStorage.setItem("carrito", JSON.stringify(carrito))

        },
        removeCarrito: (state, action) => {

            let carrito = state.carrito
            let productoId = action.payload
            let producto = null
            let index = 0
            let cantidad = 0
            let total = state.total ? state.total : 0

            carrito.forEach(element => {
                if (element.producto.Id === productoId) {
                    cantidad = element.cantidad
                    producto = element.producto
                    index = carrito.indexOf(element)
                }
            })

            carrito.splice(index, 1)

            total -= producto.Precio * cantidad
            state.total = total
            state.carrito = carrito
            localStorage.setItem("carrito", JSON.stringify(carrito))

        },
        removeAllCarrito: (state) => {
            state.carrito = []
            state.total = 0
            localStorage.removeItem("carrito")
        },
        incrementCantidad: (state, action) => {
            let productoId = action.payload
            let producto = null
            let carrito = state.carrito
            let cantidad = 0
            let total = state.total ? state.total : 0

            carrito.forEach(element => {
                if (element.producto.Id === productoId) {
                    producto = element.producto
                    total = total + element.producto.Precio
                    cantidad = element.cantidad + 1
                    if (cantidad > producto.Cantidad) {
                        toast.error("No hay suficiente stock", { position: toast.POSITION.TOP_CENTER })
                        return
                    }
                    element.cantidad = cantidad
                }
            })

            if (cantidad > producto.Cantidad) {
                toast.error("No hay suficiente stock", { position: toast.POSITION.TOP_CENTER })
                return
            }

            state.total = total
            state.carrito = carrito
            localStorage.setItem("carrito", JSON.stringify(carrito))
        },

        decrementCantidad: (state, action) => {
            let productoId = action.payload
            let carrito = state.carrito
            let cantidad = 0
            let total = state.total ? state.total : 0

            carrito.forEach(element => {
                if (element.producto.Id === productoId) {
                    cantidad = element.cantidad - 1
                    if (cantidad === 0) {
                        let index = carrito.indexOf(element)
                        carrito.splice(index, 1)
                        total = total - element.producto.Precio
                    } else {
                        element.cantidad = cantidad
                        total = total - element.producto.Precio
                    }
                }
            })

            state.total = total
            state.carrito = carrito
            localStorage.setItem("carrito", JSON.stringify(carrito))
        },
    },
})

export const { addCarrito, removeCarrito, removeAllCarrito, incrementCantidad, decrementCantidad, getTotalCarrito } = carritoSlice.actions
export default carritoSlice.reducer