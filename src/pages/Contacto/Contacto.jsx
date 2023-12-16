import React from 'react'
import './Contacto.css'

const Contacto = () => {
  return (
    <div className="container-fluid">
      <img src="/public/banner.webp" alt="" className="img-fluid w-100" />
      <div className="row align-items-center p-5">
        <div className="col-md-12">
          <div className="card border-0">
            <div className="card-body">
              <h5 className="card-title display-4 text-center mb-5">
                ¿Quienes somos?
              </h5>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img src="/public/fiesta.jpg" className="img-fluid rounded" />
                </div>
                <div className="col-md-8 p-5">
                  <p className="card-text fs-5 lh-base">
                    Somos una empresa apasionada por la celebración de la vida.
                    Nos dedicamos a proporcionar una amplia gama de productos
                    creativos y de alta calidad para todo tipo de eventos y
                    fiestas. Nuestra misión es convertir cada ocasión en un
                    momento inolvidable, lleno de alegría y color. Desde
                    decoraciones hasta accesorios y juegos, ofrecemos todo lo
                    necesario para crear experiencias festivas que perduren en
                    la memoria de nuestros clientes. Nos esforzamos por ser
                    líderes en innovación, calidad y servicio, siempre
                    comprometidos con la felicidad y satisfacción de quienes
                    eligen nuestros productos para sus celebraciones especiales.
                    ¡Celebremos juntos la vida!
                  </p>
                  <p className="card-text fw-bold fs-5 text-center">
                    Lema: "Un regalo para cada ocasión"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="card border-0 p-5">
            <div className="card-body">
              <h5 className="card-title display-4">Nuestra misión</h5>
              <div className="row align-items-center">
                <div className="col-md-8 p-5">
                  <p className="card-text fs-5 lh-base">
                    Facilitar momentos inolvidables al ofrecer productos de alta
                    calidad y creatividad para celebraciones, contribuyendo a la
                    alegría y la conexión entre las personas durante eventos
                    especiales.
                  </p>
                </div>
                <div className="col-md-4">
                  <img src="/public/fiesta.jpg" className="img-fluid rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 p-5">
            <div className="card-body">
              <h5 className="card-title display-4 text-center">
                Nuestra visión
              </h5>
              <div className="row align-items-center">
                <div className="col-md-4 pt-3">
                  <img src="/public/fiesta.jpg" className="img-fluid rounded" />
                </div>
                <div className="col-md-8 p-5">
                  <p className="card-text fs-5 lh-base">
                    Ser la marca líder reconocida a nivel global en la industria
                    de artículos de fiesta, destacando por nuestra innovación
                    constante, servicio excepcional y compromiso con la
                    felicidad de nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 p-5">
            <div className="card-body">
              <h5 className="card-title display-4">Nuestros valores</h5>
              <div className="row align-items-center">
                <div className="col-md-8 p-5">
                  <div className="card-text fs-5 lh-base">
                    <ul>
                      <li className="mb-3">
                        <p className="fw-bold">Creatividad:</p> Impulsamos la
                        innovación y la originalidad en cada producto,
                        inspirando celebraciones únicas y memorables.
                      </li>
                      <li className="mb-3">
                        <p className="fw-bold">Calidad:</p> Nos comprometemos a
                        proporcionar productos confiables y de primera calidad
                        que cumplan y superen las expectativas de nuestros
                        clientes.
                      </li>
                      <li className="mb-3">
                        <p className="fw-bold">Compromiso:</p> Estamos dedicados
                        a la satisfacción del cliente, trabajando arduamente
                        para ofrecer un servicio excepcional y soluciones
                        flexibles.
                      </li>
                      <li className="mb-3">
                        <p className="fw-bold">Sostenibilidad:</p> Nos
                        esforzamos por minimizar nuestro impacto ambiental,
                        adoptando prácticas sostenibles en la fabricación y
                        distribución de nuestros productos.
                      </li>
                      <li className="mb-3">
                        <p className="fw-bold">Diversión:</p> Abrazamos la
                        alegría y la diversión, fomentando un ambiente de
                        trabajo positivo y contagioso que se refleje en nuestros
                        productos y relaciones comerciales.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-4">
                  <img src="/public/fiesta.jpg" className="img-fluid rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 p-5">
            <div className="card-body">
              <div className="container mt-5">
                <h1 className="mb-4">Formulario de Contacto</h1>

                <form action="#" method="post">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="asunto">Asunto:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="asunto"
                      name="asunto"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea
                      className="form-control"
                      id="mensaje"
                      name="mensaje"
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary mt-3">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto
