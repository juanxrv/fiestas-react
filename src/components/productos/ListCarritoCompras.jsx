import React, { useEffect } from "react"
import ItemCarritoCompras from "./ItemCarritoCompras"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const ListCarritoCompras = () => {

  const carrito = useSelector((state) => state.carrito);

  return (
    <div className="container-fluid">
      <ul className="list-group">
        {carrito.carrito.map((item) => (
          <ItemCarritoCompras key={item.producto.Id} item={item} />
        ))}
        {
          carrito.carrito.length <= 0 ? (
            <div className="card text-center border-warning">
              <div className="card-header bg-transparent border-warning">
                <h5 className="card-title">Orden de pedido</h5>
              </div>
              <div className="card-body bg-transparent border-warning">
                <p className="card-text">No hay productos en el carrito</p>
              </div>
            </div>
          ) : (
            <div className="card text-center border-warning">
              <div className="card-header bg-transparent border-warning">
                <h5 className="card-title">Orden de pedido</h5>
              </div>
              <div className="card-body bg-transparent border-warning">
                <p className="card-text">Cantidad de productos: {carrito.carrito.length}</p>
                <p className="card-text">Precio total: $ {carrito.total}</p>
                <Link className="btn btn-outline-success" to={"/datos-envio"}>
                  Finalizar compra
                </Link>
              </div>
            </div>
          )
        }
      </ul>
    </div>
  );
};

export default ListCarritoCompras;
