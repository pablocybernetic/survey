import React, { useEffect, useState, useRef } from 'react';
import Axios from '../services/axios';  // Adjust path as needed
import Chart from 'chart.js/auto';
import { useParams } from 'react-router-dom'; // Import useParams


const StatisticView = () => {  // Assuming 'slug' is passed as a prop
// const slug ='tusker-lager-happy-hour'
const { slug } = useParams();  // Retrieve 'slug' from the URL parameter

  const [surveyData, setSurveyData] = useState(null);
  const chartRefs = useRef([]);

  useEffect(() => {
    // Append the slug as a query parameter to the URL
    const fetchData = async () => {
      try {
        // Axios request with the slug as a query parameter
        const response = await Axios.get(`/responses/${slug}`);
        setSurveyData(response.data);  // Set survey data directly from the response
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchData();  // Fetch the data on component mount
  }, [slug]);  // Depend on 'slug' to refetch when it changes

  useEffect(() => {
    if (surveyData) {
      // Process each question's answers and generate pie charts
      for (let questionId in surveyData) {
        const questionData = surveyData[questionId];
        const question = questionData[0].question;

        // Prepare the chart data
        const answerCounts = {};
        questionData.forEach(answer => {
          const answerText = answer.answer;
          answerCounts[answerText] = (answerCounts[answerText] || 0) + 1;
        });

        // Prepare chart labels and data
        const labels = Object.keys(answerCounts);
        const dataValues = Object.values(answerCounts);

        // Destroy the previous chart if it exists before creating a new one
        if (chartRefs.current[questionId] && chartRefs.current[questionId].chart) {
          chartRefs.current[questionId].chart.destroy();
        }

        // Initialize the pie chart after the data is loaded
        const chart = new Chart(chartRefs.current[questionId], {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Answers',
              data: dataValues,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw;
                  }
                }
              }
            }
          }
        });

        // Store the chart instance on the canvas ref to later destroy it
        chartRefs.current[questionId].chart = chart;
      }
    }
  }, [surveyData]);

  return (
    <div className="max-w-5xl p-8 mx-auto mt-12 bg-white shadow-xl rounded-xl">
      <h2 className="mb-8 text-4xl font-bold text-center text-gray-800">
        Survey Results
      </h2>
      <div id="survey-charts" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {surveyData ? Object.keys(surveyData).map((questionId) => {
          const questionData = surveyData[questionId];
          const question = questionData[0].question;

          return (
            <div key={questionId} className="p-6 space-y-4 transition-transform transform bg-white rounded-lg shadow-md chart-container hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-gray-700">{question}</h3>
              <div className="relative w-full h-64">
                <canvas
                  ref={(el) => chartRefs.current[questionId] = el}
                  id={`chart-${questionId}`}
                  className="w-full h-full"
                ></canvas>
              </div>
            </div>
          );
        }) : (
          <div className="flex items-center justify-center col-span-1 sm:col-span-2 lg:col-span-3">
            <p className="text-lg text-center text-gray-600">Loading survey data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticView;
