import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-6 d-flex align-items-center">
              <Link className="nav-link" to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  width="50"
                  className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                />
              </Link>
              <span className="mb-3 mb-md-0 text-body-secondary">
                Todos los derechos reservados © 2023 Venta de productos para
                fiestas, Inc
              </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="bi bi-twitter display-5"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="bi bi-instagram display-5"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="text-body-secondary" href="#">
                  <i className="bi bi-facebook display-5"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
