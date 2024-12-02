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
        const token = localStorage.getItem("TOKEN")
        fetch(import.meta.env.VITE_API_URL + `/alerts/update-status/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

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
                fetch(import.meta.env.VITE_API_URL + '/alerts/active', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Agregar el token como Authorization Bearer
                    }
                })
                    .then(response => response.json())
                    .then(data => { setAlertsActive(data.data) });
                console.log("Estatus actualizado");
            })
            .catch(error => console.error("Error:", error));
    };

    const [alertsActive, setAlertsActive] = useState([]);
    const [timeAlert, setTimeAlert] = useState(10000);

    useEffect(() => {
        // Define la función para obtener los datos
        const fetchAlerts = () => {
            const token = localStorage.getItem("TOKEN")
            fetch(import.meta.env.VITE_API_URL + '/alerts/active', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Agregar el token como Authorization Bearer
                }
            })
                .then(response => response.json())
                .then(data => {
                    setAlertsActive(data.data);
                    if (data.detail == "El token ha expirado.") {
                        alert("Token expirado")
                        localStorage.clear()
                        window.location.href = "/"
                    }
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

                        <label className="relative mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Velocidad de tiempo de alertas</label>
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

                        <div onClick={() => { localStorage.clear(); window.location.href = "/" }} className="flex items-center px-4 py-2 mt-8 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 cursor-pointer">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12H3M3 12L6 9M3 12L6 15M12 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-medium">Cerrar Sesion</span>
                        </div>

                    </nav>
                    <div className="flex items-center gap-x-2">
                        <img className="object-cover w-10 h-10 rounded-full" src="https://c1.klipartz.com/pngpicture/823/765/sticker-png-login-icon-system-administrator-user-user-profile-icon-design-avatar-face-head.png" alt="" />

                        <div>
                            <h1 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">{localStorage.getItem("USERNAME")}</h1>

                            <p className="text-sm text-gray-500 dark:text-gray-400">Tipo de cuenta: {localStorage.getItem("ROLE").toLocaleUpperCase()}</p>
                        </div>
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