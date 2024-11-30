// import { useState, useEffect } from "react"

import LineChart from "../chart/LineChart";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";

const Dashboard = () => {


    return (
        <div>

            <section className="bg-white dark:bg-gray-900">
                <div className="px-6 py-10">

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 lg:grid-cols-2">

                        <div className="flex items-center overflow-hidden bg-cover rounded-lg z-10">
                            <div className="w-full py-4 overflow-hidden rounded-b-lg z-0">
                                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white mb-8">
                                    Estadisticas
                                </h1>
                                <h2 className="text-md font-semibold text-gray-800 dark:text-white my-auto xl:text-md">
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
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-end overflow-hidden bg-cover rounded-lg z-10" >
                            <div className=" w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-50">
                                <PieChart />
                                <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                    Cantidad de alertas segun su tipo
                                </h2>
                                <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">ALERTAS</p>
                            </div>
                        </div>

                        <div className="flex items-end overflow-hidden bg-cover rounded-lg z-10" >

                            <div className="w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-0">
                                <LineChart />
                                <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                    Numeros de alertas generadas los ultimos dias
                                </h2>
                                <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">ALERTAS</p>
                            </div>
                        </div>

                        <div className="flex items-end overflow-hidden bg-cover rounded-lg z-10" >
                            <div className=" w-full px-8 py-4 overflow-hidden rounded-b-lg backdrop-blur-sm bg-white/60 dark:bg-gray-800/60 z-50">
                                <BarChart />
                                <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize dark:text-white">
                                    Cantidad de logs en los ultimos 2 dias
                                </h2>
                                <p className="mt-2 text-lg tracking-wider text-blue-500 uppercase dark:text-blue-400 ">LOGs</p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )

}

export default Dashboard