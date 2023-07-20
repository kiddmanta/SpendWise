import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement,Tooltip,Legend,Title } from 'chart.js';
import Labels from './Labels';
import { NumericFormat } from 'react-number-format';

Chart.register(ArcElement,Tooltip,Legend,Title);

const PieChart = ({allTransaction}) => {
  
    const [totalCategory,setTotalCategory] = useState([
        {
            name:'Bills',
            color : '#9b5fe0',
            value : 0
        },
        {
            name:'Medical',
            color : '#16a4d8',
            value : 0
        },
        {
            name:'Food',
            color : '#60dbe8',
            value : 0
        },
        {
            name:'Shopping',
            color : '#8bd346',
            value : 0
        },
        {
            name:'Fees',
            color : '#efdf48',
            value : 0
        },
        {
            name:'Rent',
            color : '#f9a52c',
            value : 0
        },
        {
            name:'Other',
            color : '#d64e12',
            value : 0
        },
    ]);

    useEffect(() => {
        const calculateCategoryExpenses = () => {
          const categoryExpenses = totalCategory.map((category) => ({
            ...category,
            value: allTransaction
              .filter((transaction) => transaction.Type === 'Expense' && transaction.Category === category.name)
              .reduce((total, transaction) => total + transaction.Amount, 0),
          }));
          setTotalCategory(categoryExpenses);
        };
    
        calculateCategoryExpenses();
    }, [allTransaction]);
    const totalExpenses = totalCategory.reduce((total, category) => total + category.value, 0);
    const formattedText = totalExpenses.toLocaleString('en-IN');
  const config = {
    data : {
      
      datasets: [{
          data: totalCategory.map((category) => category.value),
          backgroundColor: totalCategory.map((category) => category.color),
          hoverOffset: 4,
          borderRadius : 30,
          spacing: 10
        }]
    },
    options : {
        cutout: 98,
        radius: 100,
        plugins: {
            tooltip: {
                displayColors: false,
              callbacks: {
                label: (context) => {
                  const value = context.raw || 0;
                  return `₹${value}`;
                },
              },
            },
            title: {
                display: true,
                text: `Total Spend: ₹${formattedText}`,
                position: 'bottom',
                font: {
                  size: 16,
                  weight: 'bold',
                },
            },
        },
    }
}

    
  return (
    <div className='d-flex justify-content-between pie-chart'>
        <div className='pie-div'>
            <Doughnut {...config} />
        </div>
        <div className='labels-divi'>
            {totalCategory.map((category) => (
                <Labels key={category.name} data={category} totalExpenses={totalExpenses} />
            ))}
        </div>
    </div>
    
  )
};

export default PieChart;