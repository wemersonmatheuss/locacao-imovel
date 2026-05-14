import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Home } from "../pages/Home"
import { Terms } from "../pages/Terms"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termos" element={<Terms />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}