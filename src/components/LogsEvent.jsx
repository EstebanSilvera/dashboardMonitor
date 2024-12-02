import { useEffect, useState } from "react";


const LogsEvent = () => {

    const [logs, setLogs] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("TOKEN")
        fetch(import.meta.env.VITE_API_URL + '/logs/all?page=1&size=12',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(response => response.json())
            .then(data => setLogs(data));
    }, [])

    console.log(logs)

    return (
        <div>
            <header className="bg-white dark:bg-gray-900">
                <nav className="border-t-4 border-blue-500">
                    <div className="container flex items-center justify-between px-6 py-3 mx-auto">
                        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700 dark:text-white ">Últimos 10 Logs</h1>
                    </div>
                </nav>

            </header>

            {/* <hr className="bg-white dark:bg-black" /> */}

            <div className="bg-white dark:bg-gray-900 min-h-screen p-5">
                <div className="flex flex-wrap justify-center items-center">
                    {logs.map((log, index) => (
                        <LogItem key={index} log={log} index={index} />
                    ))}
                </div>
            </div>

        </div>
    )
}

const LogItem = ({ log, index }) => (
    <div className="bg-gray-300 rounded-lg shadow-md flex justify-center items-center mb-4 transition-transform transform hover:scale-105 w-[54vh] h-[25vh] mx-2 my-6">

        <div className="flex items-center ">

            <div className="rounded-lg">
                <h3 className="m-4 ">{index + 1}</h3>
            </div>

            <div className="bg-white h-[16rem] py-8 my-auto rounded-md overflow-y-auto px-4">
                <div className="flex items-center justify-between mb-2 ">
                    <span className="text-gray-800 font-bold">{log?.type?.toUpperCase()}</span>
                    <span className="text-gray-400 text-sm">{new Date(log?.timestamp).toLocaleString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                    <div><span className="font-semibold">id:</span> {log?.id}</div>
                    <div><span className="font-semibold">PRI:</span> {log?.pri}</div>
                    <div><span className="font-semibold">Type:</span> {log?.type}</div>
                    <div><span className="font-semibold">Protocol:</span> {log?.protocol}</div>
                    <div><span className="font-semibold">IP origen:</span> {log?.src_ip}</div>
                    <div><span className="font-semibold">IP Destino:</span> {log?.dst_ip}</div>
                </div>
                <p className="mt-3 text-gray-700 italic">{log?.msg}</p>
            </div>
        </div>
    </div>
);

export default LogsEvent