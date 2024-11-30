import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const [dashboard, setDashboard] = useState(false)
    const [alertas, setAlertas] = useState(false)
    const [usuario, setUsuario] = useState(false)
    const [logs, setLogs] = useState(false)

    const [alertasIcon, setAlertasIcon] = useState([]);

    const opcion = (value) => {

        switch (value) {
            case "Dashboard":
                setDashboard(true)
                setAlertas(false)
                setUsuario(false)
                setLogs(false)
                break;

            case "Alertas":
                setDashboard(false)
                setAlertas(true)
                setUsuario(false)
                setLogs(false)
                break;

            case "Usuarios":
                setDashboard(false)
                setAlertas(false)
                setUsuario(true)
                setLogs(false)
                break;

            case "LogsEvent":
                setDashboard(false)
                setAlertas(false)
                setUsuario(false)
                setLogs(true)
                break;

            default:
                break;
        }
    }

    // console.log(dashboard, alertas, usuario, logs)

    const agregarAlerta = () => {
        const nuevaAlerta = { id: alertasIcon.length };
        setAlertasIcon([...alertasIcon, nuevaAlerta]);
    };

    // Función para eliminar una alerta
    const eliminarAlerta = (id, number) => {
        fetch(import.meta.env.VITE_API_URL + `/alerts/update-status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: number
            })
        })
            .then(response => {
                if (!response.ok) throw new Error("Error en la actualización del estado");
                return response.json();
            })
            .then(() => {
                // Actualizar el estado local eliminando o cambiando la alerta modificada
                fetch(import.meta.env.VITE_API_URL + '/alerts/active')
                    .then(response => response.json())
                    .then(data => { setAlertsActive(data.data) });
                console.log("Estatus actualizado");
            })
            console.log("consumio")
            .catch(error => console.error("Error:", error));
    };

    const [alertsActive, setAlertsActive] = useState([]);
    const [timeAlert, setTimeAlert] = useState(10000);

    useEffect(() => {
        // Define la función para obtener los datos
        const fetchAlerts = () => {
            fetch(import.meta.env.VITE_API_URL + '/alerts/active')
                .then(response => response.json())
                .then(data => {
                    setAlertsActive(data.data);
                })
                .catch(error => console.error('Error fetching alerts:', error));
        };

        fetchAlerts();
        const intervalId = setInterval(fetchAlerts, timeAlert);
        return () => clearInterval(intervalId);

    }, [timeAlert]);

    console.log(alertsActive)


    return (


        <div className='flex'>
            {/* Renderizando alertas */}
            {
                (alertsActive == null)
                    ?
                    <></>
                    :
                    alertsActive.map((alerta, index) => (
                        <div
                            key={alerta.id}
                            onClick={() => eliminarAlerta(alerta.id, 2)}
                            className="fixed right-4 w-full h-[7rem] max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 z-50"
                            style={{ bottom: `${5 + index * 120}px` }} // Ajuste de posición para no superponer
                        >
                            <div className="flex">
                                <div className={`${alerta.severity == "Advertencia" ? 'bg-yellow-500' : 'bg-red-500'} flex items-center h-[7rem] justify-center px-2 `}>
                                    <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                                    </svg>
                                </div>

                                <div className="px-4 py-2 -mx-3 ">
                                    <div className="px-3">
                                        <span className={`${alerta.severity == "Advertencia" ? 'text-yellow-500' : 'text-red-500'} font-semibold `}>{alerta.severity}</span>
                                        <p className="text-sm text-gray-600 dark:text-gray-200 overflow-y-auto h-16 hide-scroll">
                                            {alerta.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

            <aside className="fixed flex flex-col  h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700 ">

                <div className="flex flex-col justify-between flex-1">
                    <a href="#">
                        <img className="w-full h-20" src="https://educacioncontinuada.unibarranquilla.edu.co/assets/img/logo.png" alt="Logo" />
                    </a>

                    <nav>
                        <Link to="/Dashboard">
                            <div
                                onClick={() => { opcion("Dashboard") }}
                                className={(dashboard) ? "flex items-center px-4 py-2 dark:bg-gray-800 bg-gray-100 text-gray-700 dark:text-gray-200 rounded-md cursor-pointer" : `flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer`}

                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="mx-4 font-medium">
                                    Dashboard
                                </p>
                            </div>
                        </Link>

                        <Link to="/Alertas">
                            <div
                                onClick={() => { opcion("Alertas") }}
                                className={(alertas) ? "flex items-center px-4 py-2 mt-8 dark:bg-gray-800 bg-gray-100 text-gray-700 dark:text-gray-200  rounded-md cursor-pointer" : `flex items-center px-4 py-2 mt-8 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer`}

                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C13.1046 2 14 2.89543 14 4V5.29133C17.366 6.38999 19.5 9.38267 19.5 13V17L21 18.5V19H3V18.5L4.5 17V13C4.5 9.38267 6.63401 6.38999 10 5.29133V4C10 2.89543 10.8954 2 12 2ZM12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className='flex justify-between items-center'>
                                    <p className="mx-4 font-medium">
                                        Alertas
                                    </p>
                                    <span className='bg-red-500 text-white rounded-md px-2 ml-16'>{alertsActive?.length || null}</span>
                                </div>
                            </div>
                        </Link>

                        <Link to="/Usuarios">
                            <div onClick={() => { opcion("Usuarios") }}
                                className={(usuario) ? "flex items-center px-4 py-2 mt-8 dark:bg-gray-800 bg-gray-100 text-gray-700 dark:text-gray-200  rounded-md cursor-pointer" : `flex items-center px-4 py-2 mt-8 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer`}

                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="mx-4 font-medium">
                                    Usuarios
                                </p>
                            </div>
                        </Link>

                        <Link to="/LogsEvent">
                            <div onClick={() => { opcion("LogsEvent") }}
                                className={(logs) ? "flex items-center px-4 py-2 mt-8 dark:bg-gray-800 bg-gray-100 text-gray-700 dark:text-gray-200 rounded-md cursor-pointer" : `flex items-center px-4 py-2 mt-8 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer`}

                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8V16M8 12H16M21 12C21 16.4183 16.4183 21 12 21C7.58172 21 3 16.4183 3 12C3 7.58172 7.58172 3 12 3C16.4183 3 21 7.58172 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="mx-4 font-medium">
                                    Logs generados
                                </p>
                            </div>
                        </Link>

                        <hr className="my-6 border-gray-200 dark:border-gray-600" />

                        <label className="relative mb-2 text-sm font-medium text-gray-900 dark:text-white">Velocidad de tiempo de alertas</label>
                        <select value={timeAlert} // Cambiará dinámicamente según el valor actual
                            onChange={(e) => setTimeAlert(Number(e.target.value))}
                            id="severity"
                            className="bg-gray-50 pr-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="10000">10 seg por defecto</option>
                            <option value="500">0.5 segundo</option>
                            <option value="1000">1 segundo</option>
                            <option value="5000">5 segundo</option>
                            <option value="20000">20 segundo</option>
                            <option value="40000">40 segundo</option>
                        </select>

                        {/* <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" />
                            </svg>

                            <button onClick={() => agregarAlerta()} className="mx-4 font-medium">generate alerts</button>
                        </a> */}

                        <div onClick={() => { localStorage.removeItem("ID"); localStorage.removeItem("ROLE"); localStorage.removeItem("USERNAME"); window.location.href = "/" }} className="flex items-center px-4 py-2 mt-8 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12H3M3 12L6 9M3 12L6 15M12 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Cerrar Sesion</span>
                        </div>

                    </nav>
                    <div href="#" className="flex items-center px-4 -mx-2">
                        <img className="object-cover mx-2 rounded-full h-9 w-9" src="data:image/jpeg;base64,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" alt="avatar" />
                        <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{localStorage.getItem("USERNAME")}</span>
                    </div>
                </div>
            </aside >

            <div className='w-full ml-64'>

                <Outlet />
            </div>
        </div >
    )
}

export default Sidebar