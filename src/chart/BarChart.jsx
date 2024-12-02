import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

  const [datos, setDatos] = useState([])
  const [datosAll, setDatosAll] = useState([])
  
  useEffect(() => {
    const token = localStorage.getItem("TOKEN")
    fetch(import.meta.env.VITE_API_URL + "/logs/by-date",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Agregar el token como Authorization Bearer
        }
      }
    )
      .then(response => response.json())
      .then(data => {setDatos(data.data.logs_by_date); localStorage.setItem("logsAll",data.data.total_logs)})
  }, [])

  console.log(datosAll)

  const data = {
    labels: datos.map((alert) => (alert.date)),
    datasets: [
      {
        label: 'Numero de logs',
        data: datos.map((alert) => (alert.count)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
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
        text: 'Numero de logs por dias',
        color: '#FFFFFF', // Cambiar color del título
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;