import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import ListCarritoCompras from '../productos/ListCarritoCompras'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { setQuery } from '../../features/productos/querySlice'

const Header = () => {
  const dispatch = useDispatch()
  const carrito = useSelector((state) => state.carrito)
  const auth = useSelector((state) => state.auth)
  const user = auth.usuario
  const query = useSelector((state) => state.query)

  const currentPath = () => {
    const location = useLocation()
    const path = location.pathname
    return path
  }

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(setQuery(e.target.value))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <img src="/logo.png" alt="logo" width="150" />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath() === '/' ? 'active' : ''
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath() === '/contacto' ? 'active' : ''
                  }`}
                  to="/contacto"
                >
                  Contacto
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath() === '/productos' ? 'active' : ''
                  }`}
                  to="/productos"
                >
                  Productos
                </Link>
              </li>
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registro">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {user && (
              <>
                <div className="dropdown me-3">
                  <button
                    className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    {user.Name}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item" to="/mis-compras">
                        <i className="bi bi-cart-check fs-4"></i> Mis compras
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right fs-4"></i> Cerrar
                        sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
            {
              //current path is not /pedido/:id
              currentPath().indexOf('/pedido/') === -1 && (
                <button
                  className="btn text-white btn me-3"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <i className="bi bi-cart4 fs-4"></i>
                  <span className="translate-middle badge rounded-pill bg-danger">
                    {carrito.carrito.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </button>
              )
            }
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg pb-3">
        <div className="col-md-8 offset-2">
          {
            /* show form if actual path is /productos */
            currentPath() === '/productos' && (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar producto"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </form>
            )
          }
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            <i className="bi bi-cart-fill fs-2"></i> Carrito de compras
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ListCarritoCompras />
        </div>
      </div>
    </div>
  )
}

export default Header
