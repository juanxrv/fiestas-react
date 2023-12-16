import { useState } from 'react'
import axiosInstance from '../../config/config'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const DireccionPedido = () => {

  const carrito = useSelector((state) => state.carrito)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const auth = useSelector((state) => state.auth)
  const [datos, setDatos] = useState({
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    pais: '',
    productos: carrito.carrito.reduce((acc, item) => {
      acc.push({
        productoId: item.producto.Id,
        cantidad: item.cantidad
      })
      return acc
    }, [])

  })

  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value

    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()



    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas hacer el pedido?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Si, hacer pedido',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true)
        try {

          setDatos({
            ...datos,
            productos: carrito.carrito
          })

          const response = await axiosInstance.post('/PedidoApi', datos, {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })

          const data = await response.data
          navigate(`/pedido/${data.Id}`)

        } catch (error) {
          if (error.request.status === 400) {
            setErrors(error.response.data.errors)
          } else if (error.request.status === 401) {
            toast.error('No tienes permiso para realizar esta acción')
          } else {
            toast.error('Ocurrió un error al realizar la petición, intente más tarde')
          }
          setLoading(false)
        }
      }
    })

  }

  return (
    <div className='container-fluid'>
      <Loading loading={loading} />
      <div className="row mt-4 d-flex justify-content-center align-items-center">
        <div className="col-md-8 col-12">
          <div className="card">
            <div className="card-body">
              <h2>Ingresa la dirección de envio</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="calle" className="form-label">Calle</label>
                  <input type="text" className="form-control" id="calle" aria-describedby="calleHelp" onChange={handleInputChange} value={datos.calle} />
                  <div id="calleHelp" className="form-text">Ejemplo: Colina de la Paz</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Calle" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="numero" className="form-label">Número</label>
                  <input type="text" className="form-control" id="numero" aria-describedby="numeroHelp" onChange={handleInputChange} value={datos.numero} />
                  <div id="numeroHelp" className="form-text">Ejemplo: 123</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Numero" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="colonia" className="form-label">Colonia</label>
                  <input type="text" className="form-control" id="colonia" aria-describedby="coloniaHelp" onChange={handleInputChange} value={datos.colonia} />
                  <div id="coloniaHelp" className="form-text">Ejemplo: Del Valle</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Colonia" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="ciudad" className="form-label">Ciudad</label>
                  <input type="text" className="form-control" id="ciudad" aria-describedby="ciudadHelp" onChange={handleInputChange} value={datos.ciudad} />
                  <div id="ciudadHelp" className="form-text">Ejemplo: Ciudad de México</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Ciudad" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">Estado</label>
                  <input type="text" className="form-control" id="estado" aria-describedby="estadoHelp" onChange={handleInputChange} value={datos.estado} />
                  <div id="estadoHelp" className="form-text">Ejemplo: Guanajuato</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Estado" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                  <input type="text" className="form-control" id="codigoPostal" aria-describedby="codigoPostalHelp" onChange={handleInputChange} value={datos.codigoPostal} />
                  <div id="cpHelp" className="form-text">Ejemplo: 12345</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "CodigoPostal" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="mb-3">
                  <label htmlFor="pais" className="form-label">País</label>
                  <input type="text" className="form-control" id="pais" aria-describedby="paisHelp" onChange={handleInputChange} value={datos.pais} />
                  <div id="paisHelp" className="form-text">Ejemplo: México</div>
                  {
                    errors.map((error, index) => (
                      error.PropertyName === "Pais" && (
                        <div className="alert alert-danger mt-2" key={index}>
                          {error.ErrorMessage}
                        </div>
                      )
                    ))
                  }
                </div>
                <div className="d-md-block d-grid gap-1 text-center">
                  <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DireccionPedido