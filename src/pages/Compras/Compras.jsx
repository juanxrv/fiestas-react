import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/config'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import Swal from 'sweetalert2'

const Compras = () => {
  const auth = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [compras, setCompras] = useState([])

  const getCompras = async () => {
    setLoading(true)
    const response = await axiosInstance.get(`/VentaApi/user`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    const data = await response.data
    console.log(data)
    setCompras(data)
    setLoading(false)
  }

  const handleCancel = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas cancelar la compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, cancelar compra',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)

        try {
          const response = await axiosInstance.post(
            `/VentaApi/cancelar/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          )

          const data = await response.data

          console.log(data)

          toast.success('Compra cancelada con éxito')

          getCompras()
          setLoading(false)
        } catch (error) {
          toast.error(error.response.data.message)
          setLoading(false)
        }
      }
    })
  }

  useEffect(() => {
    getCompras()
  }, [])

  return (
    <div className="container-fluid">
      <Loading loading={loading} />
      <div className="row">
        <div className="col">
          <h1 className="text-center">Mis compras</h1>
          <div className="row">
            {compras.map((compra) => (
              <div className="col-md-12 col-12" key={compra.Id}>
                <div className="card mb-4">
                  <div className="card-header d-flex justify-content-between">
                    <div>
                      <h5 className="card-title">Compra #{compra.Id}</h5>
                      <p className="text-muted">
                        Fecha:{' '}
                        {new Date(compra.CreatedAt).toLocaleString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric',
                          hour12: true,
                          weekday: 'long',
                        })}
                      </p>
                    </div>
                    {compra.Estatus !== 3 && !compra.Entregada && (
                      <div>
                        {/* boton para cancelar con tooltip */}
                        <button
                          className="btn btn-danger btn-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Cancelar compra"
                          onClick={() => handleCancel(compra.Id)}
                        >
                          <i className="bi bi-x-circle"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Listado de productos con imagen, cantidad comprada, precio del producto*/}
                      <div className="col-md-6 col-12">
                        <ul className="list-group border list-group-flush">
                          {compra.VentaProductos.map((producto) => (
                            <li
                              className="list-group-item d-flex justify-content-between align-items-center"
                              key={producto.Id}
                            >
                              <div className="row">
                                <div className="col-md-2 col-12 d-flex align-items-center">
                                  <img
                                    style={{ maxWidth: '600px' }}
                                    src={`${producto.Producto.Imagen}`}
                                    className="card-img-top"
                                    alt="..."
                                  />
                                </div>
                                <div className="col-md-10 col-12">
                                  <h5 className="card-text">
                                    <small className="text-muted">
                                      {producto.Producto.Nombre}
                                    </small>
                                  </h5>
                                  <h6 className="card-text">
                                    <small className="text-muted">
                                      Cantidad: {producto.Cantidad}
                                    </small>
                                  </h6>
                                  <h6 className="card-text">
                                    <small className="text-success">
                                      Precio: ${producto.Precio.toFixed(2)}
                                    </small>
                                  </h6>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Datos de envio (solo direccion) */}
                      <div className="col-md-6 col-12">
                        <div className="card mb-3 mt-3 mt-sm-0">
                          <div className="card-header bg-transparent">
                            <h5 className="card-title">Datos de envio</h5>
                          </div>
                          <div className="card-body">
                            <p className="card-text">
                              <small className="text-muted">
                                {compra.Pedido.Direccion}
                              </small>
                            </p>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header bg-transparent">
                            <h5 className="card-title">Resumen del pedido</h5>
                          </div>
                          <div className="card-body">
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                Subtotal:
                                <span className="badge bg-primary rounded-pill">
                                  $
                                  {(
                                    compra.Total - compra.Pedido.CostoEnvio
                                  ).toFixed(2)}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                Costo de Envío:
                                <span className="badge bg-primary rounded-pill">
                                  ${compra.Pedido.CostoEnvio.toFixed(2)}
                                </span>
                              </li>
                              <li className="list-group-item d-flex justify-content-between align-items-center">
                                Total:
                                <span className="badge bg-success rounded-pill">
                                  ${compra.Total.toFixed(2)}
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="row d-flex justify-content-between">
                          <div className="col-md-6 col-12 mt-3">
                            {/* estatus de la venta 1 = completada, 3 = cancelada. entregada 1 = entregada 2 = no entregada */}
                            {compra.Estatus === 1 && (
                              <div className="alert alert-success" role="alert">
                                Compra completada
                              </div>
                            )}
                            {compra.Estatus === 3 && (
                              <div className="alert alert-danger" role="alert">
                                Compra cancelada
                              </div>
                            )}
                          </div>
                          <div className="col-md-6 col-12 mt-3">
                            {compra.Entregada === 1 && (
                              <div className="alert alert-success" role="alert">
                                Entregada
                              </div>
                            )}
                            {compra.Entregada === 0 && (
                              <div className="alert alert-danger" role="alert">
                                No entregada
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Compras
