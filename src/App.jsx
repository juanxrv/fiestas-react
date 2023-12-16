import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/paginaComponents/Footer"
import Header from "./components/paginaComponents/Header"
import Login from "./pages/Login/Login"
import PaginaInicio from "./pages/PaginaInicio/PaginaInicio"
import Contacto from "./pages/Contacto/Contacto"
import RegistroCliente from "./pages/Login/RegistroCliente"
import NotFound from "./pages/NotFound"
import Productos from "./pages/Productos/Productos"
import Pedido from "./pages/Productos/Pedido"
import { ToastContainer } from "react-toastify"
import "../node_modules/react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux"
import { ProtectedRoute } from "./components/ProtectedRoute"
import DireccionPedido from "./pages/Productos/DireccionPedido"
import Compras from "./pages/Compras/Compras"

const App = () => {


  const auth = useSelector((state) => state.auth)
  const carrito = useSelector((state) => state.carrito)

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route element={<ProtectedRoute isAllowed={!auth.usuario} redirectTo="/productos" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistroCliente />} />
          </Route>
          <Route path="/productos" element={<Productos />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route element={<ProtectedRoute isAllowed={
            auth.usuario && carrito.carrito.length > 0
          } redirectTo="/login" />}>
            <Route path="/datos-envio" element={<DireccionPedido />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={
            auth.usuario} redirectTo="/login" />}>
            <Route path="/pedido/:id" element={<Pedido />} />
            <Route path="/mis-compras" element={<Compras />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
