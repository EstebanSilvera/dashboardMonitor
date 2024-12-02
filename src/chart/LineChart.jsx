
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {

  const [datos, setDatos] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("TOKEN")
    fetch(import.meta.env.VITE_API_URL +"/alerts/by-date",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Agregar el token como Authorization Bearer
        }
      }
    )
      .then(response => response.json())
      .then(data => {setDatos(data.data.alerts_by_date); localStorage.setItem("alertsAll",data.data.total_alerts)})
  }, [])

  // console.log(datos)

  // console.log(datos.map((alert) => ( alert.date )))

  const data = {
    labels:datos.map((alert) => ( alert.date )),
    datasets: [
      {
        label: 'Numero de alertas',
        data: datos.map((alert) => ( alert.count )),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // Cambiar color de las etiquetas de la leyenda
        },
      },
      title: {
        display: true,
        text: 'Numero de alertas creadas los ultimos dias',
        color: '#FFFFFF'
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', // Cambiar color de las etiquetas del eje X
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF', // Cambiar color de las etiquetas del eje Y
        },
      },
    },
  };

  return (
    <div className="max-w-xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;