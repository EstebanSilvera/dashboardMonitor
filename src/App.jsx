import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Alertas from './components/Alertas'
import PageError from './components/PageError'
import Usuarios from './components/Usuarios'
import LogsEvent from './components/logsEvent'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <>

      <Router>
        <Routes>
          {/* Ruta principal */}
          <Route
            index
            element={localStorage.getItem("TOKEN") ? <Sidebar /> : <Login />}
          />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Alertas" element={<Alertas />} />
            <Route path="Usuarios" element={<Usuarios />} />
            <Route path="LogsEvent" element={<LogsEvent />} />
          </Route>

          {/* Ruta para el componente de 404 */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
