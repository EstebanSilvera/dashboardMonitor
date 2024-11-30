import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';

// Registro de componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {

  const [datos, setDatos] = useState([])
  useEffect(() => {
    fetch("http://192.168.68.115:8000/alerts/by-category")
      .then(response => response.json())
      .then(data => setDatos(data.data))
  }, [])

  // console.log(datos)

  const data = {
    labels: datos.map((alert) => ( alert.category )),
    datasets: [
      {
        label: 'Cantidad de Logs',
        data: datos.map((alert) => ( alert.count )),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)','rgba(106, 90, 205, 0.6)', 'rgba(60, 179, 113, 0.6)', 'rgba(255, 165, 0, 0.6)', 'rgba(255, 99, 71, 0.6)' , 'rgba(180, 180, 180, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',' rgba(106, 90, 205, 1)', 'rgba(60, 179, 113, 1)', 'rgba(255, 165, 0, 1)', 'rgba(255, 99, 71, 1)' , 'rgba(180, 180, 180, 1)'],
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
        text: 'Numero de Logs de los ultimos 2 dias',
        color: '#FFFFFF'
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;