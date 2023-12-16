import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { addCarrito } from '../../features/carrito/carritoSlice'
import Loading from '../../components/Loading'

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const query = useSelector((state) => state.query)

  const getProductos = async () => {
    setLoading(true)
    const response = await axiosInstance.get('/ProductoApi')
    const data = await response.data
    setProductos(data)
    setLoading(false)
  }

  const agregarProdCarrito = (producto) => {
    dispatch(addCarrito(producto))
  }

  useEffect(() => {
    getProductos()
  }, [])

  return (
    <div className="container-fluid">
      <Loading loading={loading} />
      <div className="row row-cols-1 row-cols-md-4 g-4 p-4">
        {productos.map(
          (producto) =>
            //si el nombre del producto no contiene la query, no lo muestra
            producto.Nombre.toLowerCase().includes(
              query.query.toLowerCase()
            ) && (
              <div className="col" key={producto.Id}>
                <div className="card h-100">
                  {
                    /* Imagen en base 64 */
                    producto.Imagen && (
                      <img
                        src={`${producto.Imagen}`}
                        className="card-img-top"
                        alt="..."
                      />
                    )
                  }
                  <div className="card-body text-center">
                    <h5 className="card-title">{producto.Nombre}</h5>
                    <div className="card-text">
                      {
                        /* poner la cantidad disponible, si esta agotado, señalar */
                        producto.Cantidad > 0 ? (
                          <p className="text-success text-center">
                            Stock disponible: {producto.Cantidad}
                          </p>
                        ) : (
                          <p className="text-danger text-center">Agotado</p>
                        )
                      }

                      <h2 className="text-info">$ {producto.Precio}</h2>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={() => agregarProdCarrito(producto)}
                      disabled={producto.Cantidad === 0}
                    >
                      <i className="bi bi-cart"></i> Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Productos
