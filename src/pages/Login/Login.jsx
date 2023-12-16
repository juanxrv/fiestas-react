import React, { useState } from "react";
import axiosInstance from "../../config/config";
import { login } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Confetti from "../../components/paginaComponents/Confetti";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/Auth/login", data);
      const dataResponse = await response.data;
      const jwt = dataResponse.jwt;

      const me = await axiosInstance.get("/Auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const dataMe = await me.data;

      if (dataMe.Role !== "Cliente") {
        toast("Error al iniciar sesión, comprueba tus credenciales", {
          type: "error",
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "colored",
          role: "alert",
        });

        setLoading(false);
        return;
      }

      const dataLogin = {
        token: jwt,
        usuario: dataMe,
      };

      dispatch(login(dataLogin));

      navigate("/");
    } catch (error) {
      toast("Error al iniciar sesión, comprueba tus credenciales", {
        type: "error",
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored",
        role: "alert",
      });

      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-5">
      <Confetti />
      <Loading loading={loading} />
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="card text-center border-0">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="card-body">
                  <i className="bi bi-person-circle display-1 text-primary"></i>
                  <h3 className="card-title mb-5 text-primary">
                    Inicio de Sesión
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input
                        type="text"
                        className="form-control"
                        id="inputUserName"
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                        value={data.username}
                      />
                      <label htmlFor="inputUserName">Nombre de usuario</label>
                      {errors.map((error, index) =>
                        error.param === "username" ? (
                          <p className="text-danger" key={index}>
                            {error.msg}
                          </p>
                        ) : null
                      )}
                    </div>
                    <div className="mb-3 form-floating border border-primary rounded">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        value={data.password}
                      />
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      {errors.map((error, index) =>
                        error.param === "password" ? (
                          <p className="text-danger" key={index}>
                            {error.msg}
                          </p>
                        ) : null
                      )}
                    </div>
                    {/* <div className="mb-3 form-group">
                      <input
                        type="checkbox"
                        className="form-check-input me-3"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Recordar mis datos
                      </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary">
                      Iniciar sesión
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

export default Login;
