import React, {useState, useEffect} from 'react';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';

const API_URL = 'http://localhost:8080/clicks';

const EmotionData = () => {
    const [chartData, setChartData] = useState({});
    const [emotionData, setEmotionData] = useState([]);

    const chart = () => {
        let anxData = []
        axios.get(`${API_URL}`)
        .then(res => {
            let anxietyData = res.data;
            console.log(anxietyData);
            let anxSum = anxietyData.map(click => click.clicks).reduce((prev, curr)=> prev + curr, 0)
            console.log(anxSum)
            setChartData({
                labels: ['Anxiety', 'Anger', 'Depression'],
                datasets: [
                    {
                        label: 'Emotional State Split',
                        data: [anxSum, 32, 54],
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