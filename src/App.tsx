import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


function App() {
  const [config, setConfig] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: {},
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  const getData = async () => {
    let apiResult = await axios.get('https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000');

    apiResult = apiResult.data as any;
    
    console.log(apiResult);
    setConfig({
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: apiResult,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Line options={options} data={config} />
    </div>
  );
}

export default App;
