import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';
import './ordercount.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ordercount() {

  const [chartData, setChartData] = useState();  
  const [error, setError] = useState();       

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/cart/testdashboard', { withCredentials: true }); 
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data) && data.length > 0) {
          // Extract product names and counts
          const productNames = data.map(item => item.product_name || 'Unknown Product');  // Fallback for missing product_name
          const productCounts = data.map(item => item.product_count || 0);               // Fallback for missing product_count

          // Prepare data for Chart.js
          setChartData({
            labels: productNames,
            datasets: [
              {
                label: 'จำนวนคำสั่งซื้อ',
                data: productCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError('No data available');  // If data is not an array or is empty
        }
      } catch (error) {
        setError('Error fetching data');  // Catch any errors
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-content">
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Count of Products Sold',
                    },
                  },
                }}
              />
            ) : (
              <p>No data to display</p>  // Fallback in case chartData is not ready
            )}
          </div>
    </>
  )
}

export default ordercount