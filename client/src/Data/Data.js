import React, {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

const API_URL = 'http://localhost:8080/clicks';

const EmotionData = () => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        axios.get(`${API_URL}`)
        .then(res => {
            let anxietyData = res.data.anxietyClicks;
            let angerData = res.data.angerClicks;
            let depressionData = res.data.depressionClicks
            console.log(anxietyData);
            setChartData({
                labels: ['Anxiety', 'Anger', 'Depression'],
                datasets: [
                    {
                        label: 'Emotional State Split',
                        data: [anxietyData, angerData, depressionData],
                        backgroundColor: ['#02efeb','#f1c3f7', '#fc2397' ]
                    }
                ]
            })
        })
        .catch(err => {
            console.log(err)
        })

    
    };

    useEffect(()=> {
        chart()
    }, [])
    return (
        <div className="emotions-chart">
            <h1>Chart</h1>
            <div><Pie data={chartData}/></div>
        </div>
    )
}

export default EmotionData;