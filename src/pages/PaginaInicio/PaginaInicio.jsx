import React, { useEffect } from 'react'
import './PaginaInicio.css'

const PaginaInicio = () => {
  const pruebaRequest = async () => {
    const response = await fetch('http://localhost:5191/api/ProductoApi')
    const data = await response.json()
  }

  useEffect(() => {
    pruebaRequest()
  }, [])

  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div
              id="carouselExampleRide"
              className="carousel slide"
              data-bs-ride="true"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="card text-center border-0">
                    <div className="row align-items-center grid-0">
                      <div className="col-md-4 ms-5">
                        <img
                          src="/public/morrillosNavidad.jpg"
                          className="img-fluid rounded-start"
                          alt="imagen"
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body align-middle">
                          <h5 className="card-title fs-3">
                            ¡Celebra la magia de la temporada con nuestras
                            ofertas exclusivas especiales!
                          </h5>
                          <p className="card-text">
                            No te pierdas nuestros descuentos irresistibles en
                            productos seleccionados. Desde adornos brillantes
                            hasta artículos para regalos, cada compra viene con
                            un toque de ahorro que te hará sonreír aún más esta
                            Navidad.
                          </p>
                          <p className="card-text">
                            <small>Last updated 3 mins ago</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="card text-center border-0">
                    <div className="row align-items-center grid-0">
                      <div className="col-md-4 ms-5">
                        <img
                          src="/public/imagenMorrillos.jpg"
                          className="img-fluid rounded-start"
                          alt="imagen"
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body align-middle">
                          <h5 className="card-title fs-3">
                            ¡Crea una fiesta mágica para tus pequeños!
                          </h5>
                          <p className="card-text">
                            Haz cada ocasión especial con nuestros regalos
                            únicos. Encuentra el regalo perfecto para expresar
                            tu amor y afecto en nuestra tienda de regalos.
                          </p>
                          <p className="card-text">
                            <small>Last updated 3 mins ago</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="card text-center border-0">
                    <div className="row align-items-center grid-0">
                      <div className="col-md-4 ms-5">
                        <img
                          src="/public/navidad.jpg"
                          className="img-fluid rounded-start"
                          alt="imagen"
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body align-middle">
                          <h5 className="card-title fs-3">
                            Ofertas exclusivas de temporada
                          </h5>
                          <p className="card-text">
                            Regalos que inspiran sonrisas. Descubre nuestra
                            colección exclusiva de regalos pensados para alegrar
                            el día de tus seres queridos. ¡Encuentra la magia en
                            cada detalle!
                          </p>
                          <p className="card-text">
                            <small>Last updated 3 mins ago</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleRide"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card text-center border-0">
              <div className="card-body">
                <img
                  src="/public/fiesta.jpg"
                  className="img-fluid rounded-start"
                  alt="imagen"
                />
                <h5 className="card-title mt-3">Celebra</h5>
                <p className="card-text">
                  Celebra momentos inolvidables con regalos memorables. Desde
                  aniversarios hasta cumpleaños, tenemos la selección perfecta
                  para cada ocasión especial.
                </p>
                <a href="#" className="btn btn-primary">
                  Ir a la tienda
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-0">
              <div className="card-body">
                <img
                  src="/public/fiesta2.jpg"
                  className="img-fluid rounded-start"
                  alt="imagen"
                />
                <h5 className="card-title mt-3">Sorprende</h5>
                <p className="card-text">
                  Sorprende con estilo. Nuestra tienda de regalos te ofrece la
                  elegancia y originalidad que estás buscando. Regalos que no
                  solo se dan, sino que se atesoran.
                </p>
                <a href="#" className="btn btn-primary">
                  Ir a la tienda
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-0">
              <div className="card-body">
                <img
                  src="/public/fiesta3.png"
                  className="img-fluid rounded-start"
                  alt="imagen"
                />
                <h5 className="card-title mt-3">Regala</h5>
                <p className="card-text">
                  Cada regalo cuenta una historia. ¿Cuál será la tuya? Descubre
                  regalos que transmiten emociones y crean recuerdos duraderos
                  en nuestra tienda.
                </p>
                <a href="#" className="btn btn-primary">
                  Ir a la tienda
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaginaInicio
