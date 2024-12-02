import { useState, useEffect } from "react";


const Alertas = () => {

    const [currentData, setCurrentData] = useState([]);

    console.log(currentData)

    // const [alerts, setAlerts] = useState([]);
    const [pagination, setPagination] = useState([]);

    const [alertType, setAlertType] = useState(0)
    const [severity, setSeverity] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("TOKEN")
        fetch(import.meta.env.VITE_API_URL + '/alerts/all', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                "page": 1,
                "size": 10,
                "alert_type": alertType,
                "severity": severity
            })
        })
            .then(response => response.json())
            .then(data => { setCurrentData(data.data || []); setPagination(data.pagination) })
            .catch(error => console.error("Error:", error));

    }, [alertType, severity])

    // console.log(alerts)
    // console.log(pagination)

    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 10;
    // const totalItems = alerts?.length || 1;
    // const totalPages = Math.ceil(totalItems / itemsPerPage);


    // Filtrado de los datos en función de la paginación
    // const informationFilter = () => {

    //     setIsChecked(!isChecked)

    //     if (isChecked) {
    //         setCurrentData(alerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    //     } else {
    //         setCurrentData(alertsActive.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    //     }

    // }

    const handlePrevPage = () => {
        const token = localStorage.getItem("TOKEN")
        fetch(import.meta.env.VITE_API_URL + '/alerts/all', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                "page": pagination.page - 1,
                "size": 10,
                "alert_type": alertType,
                "severity": severity
            })
        })
            .then(response => response.json())
            .then(data => { setCurrentData(data.data); setPagination(data.pagination) })
            .catch(error => console.error("Error:", error));
    };

    const handleNextPage = () => {
        const token = localStorage.getItem("TOKEN")
        fetch(import.meta.env.VITE_API_URL + '/alerts/all', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                "page": pagination.page + 1,
                "size": 10,
                "alert_type": alertType,
                "severity": severity
            })
        })
            .then(response => response.json())
            .then(data => { setCurrentData(data.data); setPagination(data.pagination) })
            .catch(error => console.error("Error:", error));

    };


    const statusChangesEndpoint = (id, number) => {
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
            .then(data => console.log("Changes made", data))
            .catch(error => console.error("Error:", error));
    }

    const statusChanges = (id, status) => {

        switch (status) {
            case "active":
                console.log(id, "active")
                statusChangesEndpoint(id, 1)
                location.reload()
                break;
            case "revised":
                console.log(id, "revised")
                statusChangesEndpoint(id, 2)
                location.reload()
                break;
            case "ended":
                console.log(id, "ended")
                statusChangesEndpoint(id, 3)
                location.reload()
                break;
            default:
                console.log("No exits")
                break;
        }

    }

    const DownloadAlerts = () => {
        const token = localStorage.getItem("TOKEN")

        fetch(import.meta.env.VITE_API_URL + '/alerts/download-alerts',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al descargar el archivo");
                }
                return response.blob(); // Convierte la respuesta a Blob
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob); // Crea una URL del Blob
                const a = document.createElement('a');
                a.href = url;
                a.download = 'alertas.csv'; // Nombre del archivo para descargar
                document.body.appendChild(a);
                a.click(); // Dispara la descarga
                a.remove();
                window.URL.revokeObjectURL(url); // Libera la URL del Blob
            })
            .catch(error => console.error("Error en la descarga", error));
    }

    //modal para mostrar la informacion del pokemon soleccionado
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAlerts, setSelectedAlerts] = useState(null);

    const informationAlerts = (information) => {
        setIsOpen(true)
        setSelectedAlerts(information)
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedAlerts(null);
    };

    const [warning, setWarning] = useState(0);
    const [danger, setDanger] = useState(0);

    useEffect(() => {
        let warningCount = 0;
        let dangerCount = 0;

        currentData?.forEach(element => {
            if (element.severity === "Advertencia") {
                warningCount += 1;
            } else {
                dangerCount += 1;
            }
        });

        setWarning(warningCount);
        setDanger(dangerCount);
    }, [currentData]);

    // console.log(warning, danger)

    const [reglas, setReglas] = useState([])
    useEffect(() => {
        const token = localStorage.getItem("TOKEN")

        fetch(import.meta.env.VITE_API_URL + "/alerts/types",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => setReglas(data.data))
            .catch(error => console.error("Error:", error));

    }, [])

    console.log(severity, alertType)

    return (
        <div className="dark:bg-gray-900 min-h-[100vh]">


            <section className="bg-white dark:bg-gray-900 w-[80vw] p-4">

                <h2 className="text-4xl font-medium text-gray-800 dark:text-white px-10 py-5">Alertas que se han generado ultimamente</h2>

                <div className="flex justify-between items-center">
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 px-10">Aca podras ver el filtro del las alertas segun su severidad.</p>
                    <button
                        onClick={() => DownloadAlerts()}
                        className="px-4 py-1 m-1 mx-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Download excel of alerts
                    </button>

                </div>

                <div className="flex flex-col">
                    <div className=" overflow-x-auto">
                        <div className="py-2 mx-10">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-start rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Severidades</span>
                                                </button>
                                            </th>

                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-start rtl:text-right text-gray-500 dark:text-gray-400">
                                                Color de severidad
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-start rtl:text-right text-gray-500 dark:text-gray-400">Porcentajes por listas</th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">Warning</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="inline px-3 py-1 text-sm font-normal text-yellow-500 bg-gray-100 rounded-full dark:text-yellow-400 gap-x-2 dark:bg-gray-800">
                                                    Color de alerta
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex justify-start items-center my-auto pt-6">
                                                <div className="w-48 h-2 bg-blue-200 overflow-hidden rounded-full">
                                                    <div
                                                        className="bg-yellow-500 h-2"
                                                        style={{ width: `${(warning / 10) * 100}%` }} // Calcula el ancho basado en el porcentaje
                                                    >
                                                    </div>
                                                </div>
                                                <p className="text-white px-5">{(warning / 10) * 100 + " %"}</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">Danger</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                                    Color de alerta
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap flex justify-start items-center pt-6">
                                                <div className="w-48 h-2 bg-blue-200 overflow-hidden rounded-full">
                                                    <div
                                                        className="bg-red-500 h-2"
                                                        style={{ width: `${(danger / 10) * 100}%` }} // Calcula el ancho basado en el porcentaje
                                                    >
                                                    </div>
                                                </div>
                                                <p className="text-white px-5">{(danger / 10) * 100 + " %"}</p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900 font-light">
                <section className="bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center py-2">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white p-4 ml-8">
                            Paginacion de Alertas obtenidas exitosamente
                        </h2>

                        <div className="flex mr-10">
                            <div className="max-w-xl mx-auto px-4">
                                <label className="relative mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtro de severidad</label>
                                <select value={severity} // Cambiará dinámicamente según el valor actual
                                    onChange={(e) => setSeverity(Number(e.target.value))}
                                    id="severity"
                                    className="bg-gray-50 pr-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="0">Elija la severidad</option>
                                    <option value="2">Advertencia</option>
                                    <option value="1">Peligro</option>
                                </select>
                            </div>
                            <div className="max-w-sm mx-auto px-4">
                                <label className="relative mb-2 text-sm font-medium text-gray-900 dark:text-white">Filtro de regla</label>
                                <select value={alertType}
                                    onChange={(e) => setAlertType(Number(e.target.value))}
                                    id="type"
                                    className="bg-gray-50 pr-20 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="0">Elija cual regla</option>
                                    {
                                        reglas.map((regla) => (
                                            <option key={regla.id} value={regla.id}>{regla.name}</option>
                                        ))
                                    }

                                </select>
                            </div>
                        </div>

                    </div>
                    <hr className="text-white" />

                    <div className="overflow-x-auto pb-20">
                        <table className="bg-gray-800 text-gray-200 w-full ">
                            <thead>
                                <tr className="bg-gray-900 text-gray-600 uppercase text-sm">
                                    <th className="py-3 text-center px-10">ID</th>
                                    <th className="py-3 text-center">Message</th>
                                    <th className="py-3 text-center">Severity</th>
                                    <th className="py-3 text-center px-5">Status</th>
                                    <th className="py-3 text-center px-5">Created At</th>
                                    <th className="py-3 text-center">Change status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-200 bg-gray-900 text-sm" >
                                {
                                    currentData?.length === 0
                                        ? <tr><td colSpan="11" className="py-4 text-center">No hay datos disponibles</td></tr>
                                        : currentData?.map((alert) => (
                                            <tr key={alert.id} onClick={() => informationAlerts(alert)} className="border-b border-gray-200 text-center cursor-pointer">
                                                <td className="py-3">{alert.id}</td>
                                                <td className="py-3">{alert.message}</td>
                                                <td className={`${alert.severity == "Peligro" ? 'text-red-500' : 'text-yellow-400'} py-3`}><strong>{alert.severity}</strong></td>
                                                <td className="py-3">
                                                    {alert.status === 1 ? "Active" : alert.status === 2 ? "Resived" : "Ended"}
                                                </td>
                                                <td className="py-3">
                                                    {new Date(alert.created_at).toLocaleString()}
                                                </td>
                                                <td className="py-3">
                                                    <button
                                                        onClick={() => statusChanges(alert.id, "ended")}
                                                        className="px-4 py-1 m-1 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                    >
                                                        Ended
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="fixed bottom-2 left-96  backdrop-blur-sm rounded-2xl">

                    <div className="flex items-center m-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination?.page === 1}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {"<"}
                        </button>
                        <span className="text-gray-800 dark:text-white mx-5">
                            Página {pagination?.page} de {pagination?.total_pages}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={pagination?.page === pagination?.total_pages}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            {">"}
                        </button>
                    </div>
                </section>

            </section>
            <InfoAlerts
                isOpen={isOpen}
                onClose={closeModal}
                alerts={selectedAlerts}
            />

        </div>
    )
}

const InfoAlerts = ({ isOpen, onClose, alerts }) => {

    if (!isOpen) return null;

    console.log(alerts)

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-lg"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">

                <div className="relative inline-block py-10 px-2 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-4xl">
                    <h3
                        className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                        id="modal-title"
                    >
                        Información Completa de la Alerta
                    </h3>

                    <hr className="mt-6" />

                    <div className="w-full px-6 py-4 mt-6 bg-gray-50 rounded-lg shadow-md dark:bg-gray-900">
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">ID</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.id}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Categoría</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.category.name}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Descripción</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                {alerts.context}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Severidad</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.severity}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Dirección IP de Origen</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.source_ip}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Dirección IP de Destino</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.dest_ip}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Mensaje</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                {alerts.message}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Timestamp</h4>
                            <p className="text-gray-600 dark:text-gray-300">{new Date(alerts.created_at).toLocaleString()}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Log ID</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                                {alerts.log_ids}
                            </p>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">ID</h4>
                            <p className="text-gray-600 dark:text-gray-300">{alerts.second_id}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alertas