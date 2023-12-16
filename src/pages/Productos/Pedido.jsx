import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../../config/config'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading'
import { removeAllCarrito } from '../../features/carrito/carritoSlice'
import { useNavigate } from 'react-router-dom'
import NotFound from '../../pages/NotFound'
import Swal from 'sweetalert2'

const Pedido = () => {
  const carrito = useSelector((state) => state.carrito)
  const auth = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [pedido, setPedido] = useState(null)
  const [encontrado, setEncontrado] = useState(true)
  const [errors, setErrors] = useState([])
  const { id } = useParams()

  const [infoPago, setInfoPago] = useState({
    nombre: '',
    tarjeta: '',
    fecha: '',
    cvv: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getPedido = async () => {
    setLoading(true)

    try {
      const response = await axiosInstance.get(`/PedidoApi/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      const data = await response.data

      if (data.Estatus !== 2) {
        navigate('/')
      }

      setPedido(data)
      setLoading(false)
    } catch (error) {
      if (error.request.status === 404) {
        setEncontrado(false)
        setLoading(false)
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!valitate()) {
      return
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas confirmar el pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, confirmar pago',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)

        try {
          const response = await axiosInstance.put(
            `/PedidoApi/Pagar/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          )

          const data = await response.data

          localStorage.removeItem('carrito')

          toast.success('Pedido realizado con éxito')

          dispatch(removeAllCarrito())
          navigate('/mis-compras')
        } catch (error) {
          toast.error(error.response.data.message)
          setLoading(false)
        }
      }
    })
  }

  const handleInputChange = (e) => {
    setInfoPago({
      ...infoPago,
      [e.target.id]: e.target.value,
    })
  }

  const valitate = () => {
    const errors = []

    if (infoPago.nombre.trim() === '') {
      errors.push({ attr: 'nombre', msg: 'El nombre es requerido' })
    }

    if (infoPago.tarjeta.trim() === '') {
      errors.push({ attr: 'tarjeta', msg: 'El numero de tarjeta es requerido' })
    }

    if (infoPago.fecha.trim() === '') {
      errors.push({ attr: 'fecha', msg: 'La fecha de expiración es requerida' })
    }

    if (infoPago.cvv.trim() === '') {
      errors.push({ attr: 'cvv', msg: 'El cvv es requerido' })
    }

    setErrors(errors)

    return errors.length === 0
  }

  useEffect(() => {
    getPedido()
  }, [])

  return (
    <div className="container-fluid p-4">
      <Loading loading={loading} />

      {(encontrado && (
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 order-1 mt-3 mt-sm-0">
            <div className="card">
              <div className="card-header bg-transparent">
                <h5 className="card-title">Información de Pago</h5>
              </div>
              <div className="card-body bg-transparent border-warning">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                          Nombre del titular
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombre"
                          aria-describedby="nombreHelp"
                          onChange={handleInputChange}
                          value={infoPago.nombre}
                        />
                        {errors.map(
                          (error, index) =>
                            error.attr === 'nombre' && (
                              <div
                                className="alert alert-danger mt-2"
                                key={index}
                              >
                                {error.msg}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="mb-3">
                        <label htmlFor="tarjeta" className="form-label">
                          Numero de tarjeta
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="tarjeta"
                          aria-describedby="tarjetaHelp"
                          onChange={handleInputChange}
                          value={infoPago.tarjeta}
                        />
                        {errors.map(
                          (error, index) =>
                            error.attr === 'tarjeta' && (
                              <div
                                className="alert alert-danger mt-2"
                                key={index}
                              >
                                {error.msg}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">
                          Fecha de expiración
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="fecha"
                          aria-describedby="fechaHelp"
                          onChange={handleInputChange}
                          value={infoPago.fecha}
                        />
                        {errors.map(
                          (error, index) =>
                            error.attr === 'fecha' && (
                              <div
                                className="alert alert-danger mt-2"
                                key={index}
                              >
                                {error.msg}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3">
                        <label htmlFor="cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          aria-describedby="cvvHelp"
                          onChange={handleInputChange}
                          value={infoPago.cvv}
                        />
                        {errors.map(
                          (error, index) =>
                            error.attr === 'cvv' && (
                              <div
                                className="alert alert-danger mt-2"
                                key={index}
                              >
                                {error.msg}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      <span className="mx-4">Pagar</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-5 offset-md-1">
            {pedido &&
              pedido?.PedidoProductos.map((item) => (
                <div className="card mb-3" key={item.Id}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${item.Producto.Imagen}`}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.Producto.Nombre}</h5>
                        <p className="card-text">
                          <small className="text-muted">
                            {item.Cantidad} Comprado(s) a $
                            {item.Producto.Precio}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className="card">
              <div className="card-header bg-transparent">
                <h5 className="card-title">Resumen del pedido</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Folio #:
                    <span className="badge bg-warning rounded-pill">
                      {pedido?.Id}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Subtotal:
                    <span className="badge bg-primary rounded-pill">
                      ${pedido?.Total - pedido?.CostoEnvio}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Costo de Envío:
                    <span className="badge bg-primary rounded-pill">
                      ${pedido?.CostoEnvio}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total:
                    <span className="badge bg-success rounded-pill">
                      ${pedido?.Total}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )) || <NotFound />}
    </div>
  )
}

export default Pedido
