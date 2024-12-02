import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import { useState } from "react";

const Dashboard = () => {

    const [abrirTool, setAbrilTool] = useState(false)

    return (
        <div>

            <section className="bg-white dark:bg-gray-900">
                <div className="px-6 py-10">
                    <div className="flex justify-center items-center mb-4" >
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white text-center p-4">Estadisticas</h1>
                        <div className="">
                            <button onClick={() => setAbrilTool(!abrirTool)} className="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-8">
                                    <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                </svg>
                            </button>
                            {
                                
                                abrirTool
                                ?
                                <p className="absolute w-[60vw] px-5 py-3 text-justify text-gray-600 -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white z-50 border border-gray-500">
                                    Cantidad De Logs En Los Últimos 2 Días (Gráfica de Pastel):<br />
                                    Propósito: Representa la distribución de logs generados en los últimos dos días.<br />
                                    Interpretación: Cada segmento del gráfico corresponde a un día (por ejemplo, 2024-11-25 y 2024-11-26). La proporción de cada color indica la cantidad de logs generados ese día, permitiendo identificar días con mayor actividad de logging.
                                    <br /><br />
                                    Números De Alertas Generadas Los Últimos Días (Gráfica de Líneas):<br />
                                    Propósito: Muestra la cantidad de alertas generadas por día en los últimos días.<br />
                                    Interpretación: El eje X indica las fechas, mientras que el eje Y muestra la cantidad de alertas generadas. La línea conecta los puntos de cada día, permitiendo observar tendencias, como picos de actividad o periodos con pocas alertas.
                                    <br /><br />
                                    Cantidad De Alertas Según Su Tipo (Gráfica de Barras):<br />
                                    Propósito: Representa la distribución de alertas generadas según su tipo.<br />
                                    Interpretación: Cada barra corresponde a un tipo de alerta (por ejemplo, "Detección de Alertas Snort" o "Errores del Sistema"). La altura de cada barra indica la cantidad de alertas de ese tipo, ayudando a identificar qué tipos son más comunes.
                                    <br /><br />
                                </p>
                                :
                                <></>
                            }
                        </div>
                    </div>

                    <div className="grid gap-8 xl:grid-cols-2">

                        <div className="rounded-lg z-10">

                            <div className="flex items-end overflow-hidden bg-cover rounded-lg z-10  border border-gray-200 dark:border-gray-700" >
                                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-50">
                                    <BarChart />
                                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                        Cantidad de logs en los ultimos 2 dias
                                    </h2>
                                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">LOGs</p>
                                </div>
                            </div>

                            <div className="flex items-end overflow-hidden bg-cover rounded-lg z-10 my-6 border border-gray-200 dark:border-gray-700" >
                                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-0">
                                    <LineChart />
                                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                        Numeros de alertas generadas los ultimos dias
                                    </h2>
                                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">ALERTAS</p>
                                </div>
                            </div>

                        </div>

                        <div>

                            <div className="flex justify-center items-center mb-2">
                                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center mx-4">

                                    <a href="/LogsEvent">
                                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Cantidad de log totales</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-2xl">🔷{localStorage.getItem("logsAll")}🔷</p>

                                </div>

                                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center mx-4">

                                    <a href="/LogsEvent">
                                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Cantidad de log totales</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 text-2xl">🔷{localStorage.getItem("alertsAll")}🔷</p>

                                </div>
                            </div>

                            <div className="rounded-lg z-10  border border-gray-200 dark:border-gray-700" >
                                <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-50">
                                    <PieChart />
                                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                        Cantidad de alertas segun su tipo
                                    </h2>
                                    <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">ALERTAS</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )

}

export default Dashboard