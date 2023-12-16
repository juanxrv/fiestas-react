import React, { useState } from "react"
import axiosInstance from "../../config/config"
import { useDispatch } from "react-redux"
import { login } from "../../features/auth/authSlice"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router-dom"

const RegistroCliente = () => {

  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    email: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    
    try {
      const response = await axiosInstance.post("/Auth/register", data)
      const dataResponse = await response.data
      const jwt = dataResponse.jwt

      const me = await axiosInstance.get("/Auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      const dataMe = await me.data

      const dataLogin = {
        token: jwt,
        usuario: dataMe
      }

      dispatch(login(dataLogin))
      navigate("/")

    } catch (error) {
      setErrors(error.response.data)
      setLoading(false)
    }
  }


  return (
    <div className="container-fluid">
      <Loading loading={loading}/>
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="card text-center border-0">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="card-body">
                  <i className="bi bi-person-fill-add display-1 text-primary"></i>
                  <h3 className="card-title mb-4 text-primary">
                    Registrar Cliente
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input type="text" className="form-control" id="nombre" onChange={e => setData({ ...data, nombre: e.target.value })} value={data.nombre} />
                      <label>Nombre</label>
                      {
                        errors.map((error, index) => (
                          error.PropertyName === "Nombre" && (
                            <div key={index} className="alert alert-danger">
                              {error.ErrorMessage}
                            </div>
                          )
                        ))
                      }
                    </div>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input type="text" className="form-control" id="apellido" onChange={e => setData({ ...data, apellido: e.target.value })} value={data.apellido} />
                      <label>Apellido</label>
                      {
                        errors.map((error, index) => (
                          error.PropertyName === "Apellido" && (
                            <div key={index} className="alert alert-danger">
                              {error.ErrorMessage}
                            </div>
                          )
                        ))
                      }
                    </div>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input type="text" className="form-control" id="username" onChange={e => setData({ ...data, username: e.target.value })} value={data.username} />
                      <label>Nombre de usuario</label>
                      {
                        errors.map((error, index) => (
                          error.PropertyName === "UserName" && (
                            <div key={index} className="alert alert-danger">
                              {error.ErrorMessage}
                            </div>
                          )
                        ))
                      }
                    </div>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input type="password" className="form-control" id="password" onChange={e => setData({ ...data, password: e.target.value })} value={data.password} />
                      <label>Contraseña</label>
                      {
                        errors.map((error, index) => (
                          error.PropertyName === "Password" && (
                            <div key={index} className="alert alert-danger">
                              {error.ErrorMessage}
                            </div>
                          )
                        ))
                      }
                    </div>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input type="text" className="form-control" id="email" onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
                      <label>Email</label>
                      {
                        errors.map((error, index) => (
                          error.PropertyName === "Email" && (
                            <div key={index} className="alert alert-danger">
                              {error.ErrorMessage}
                            </div>
                          )
                        ))
                      }
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Registrar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
