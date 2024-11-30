import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

  const [datos, setDatos] = useState([])
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/logs/by-date")
      .then(response => response.json())
      .then(data => setDatos(data.data))
  }, [])

  console.log(datos)

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