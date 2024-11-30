import './App.css'
import Login from './components/login'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import Alertas from './components/Alertas'
import PageError from './components/PageError'
import Usuarios from './components/Usuarios'
import LogsEvent from './components/logsEvent'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>

      <Router>
        <Routes>
          {/* Ruta principal */}
          <Route
            index
            element={
              localStorage.getItem("TOKEN") ? <Sidebar /> : <Login />
            }
          />

          {/* Sub-rutas cuando el usuario está autenticado */}
          <Route path='/' element={<Sidebar />}>
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Alertas' element={<Alertas />} />
            <Route path='/Usuarios' element={<Usuarios />} />
            <Route path='/LogsEvent' element={<LogsEvent />} />
          </Route>

          {/* Ruta para el componente de 404 */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
