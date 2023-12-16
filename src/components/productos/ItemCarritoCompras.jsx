import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  removeCarrito,
  incrementCantidad,
  decrementCantidad,
} from '../../features/carrito/carritoSlice'

const ItemCarritoCompras = ({ item }) => {
  const dispatch = useDispatch()

  const eliminarProdCarrito = (id) => {
    dispatch(removeCarrito(id))
  }

  const incrementarCantidad = (id) => {
    dispatch(incrementCantidad(id))
  }

  const decrementarCantidad = (id) => {
    dispatch(decrementCantidad(id))
  }

  return (
    <div className="mb-3">
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="row d-flex align-items-center">
          <div className="col-md-12"></div>
          <div className="col-md-3">
            <img
              src={`${item.producto.Imagen}`}
              className="img-fluid rounded-start"
              alt="imagen"
            />
          </div>
          <div className="col-md-4">
            <h6 className="card-title">{item.producto.Nombre}</h6>
            <p className="card-text">
              <small className="text-muted">Cantidad: {item.cantidad}</small>
            </p>
            <div className="justify-content-around d-flex">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => incrementarCantidad(item.producto.Id)}
              >
                <i className="bi bi-plus"></i>
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => decrementarCantidad(item.producto.Id)}
              >
                <i className="bi bi-dash"></i>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <p className="card-text">
              Precio: <br />
              <small className="text-muted">$ {item.producto.Precio}</small>
            </p>
          </div>
          <div className="col-md-1">
            <button
              className="float-end btn btn-outline-danger btn-sm"
              onClick={() => eliminarProdCarrito(item.producto.Id)}
            >
              &times;
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}

export default ItemCarritoCompras
