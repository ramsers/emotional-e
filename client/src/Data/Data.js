import React, {useState, useEffect} from 'react';
import './Data.scss';
import { defaults} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import axios from 'axios';
// defaults.global.animation = 10000

const API_URL = 'http://localhost:8080/clicks';


const EmotionData = () => {
    const [chartData, setChartData] = useState({});
    const [clicks, setClicks] = useState({});

    const chart = () => {
        axios.get(`${API_URL}`)
        .then(res => {
            let anxietyData = res.data.anxietyClicks;
            let angerData = res.data.angerClicks;
            let depressionData = res.data.depressionClicks
            
            setChartData({
                labels: ['Anxiety', 'Anger', 'Depression'],
                datasets: [
                    {
                        data: [anxietyData, angerData, depressionData],
                        backgroundColor: ['#02efeb','#f1c3f7', '#fc2397' ]
                    }
                ],
            }
            )
        })
        .catch(err => {
            console.log(err)
        })
    };

    useEffect(()=> {
        chart()
        
    }, [])


        return (
            <section className="chart">
                
                <div className="chart__ctn">
                <h2 className="chart__title">Day Spent in Emotional State</h2>
                    <Pie className="chart__pie"
                     data={chartData} options={{
                    responsive:true,
                    animation: {duration: 4000},
                    maintainAspectRatio: false ,
                    cutoutPercentage: 20,
                    rotation: 120
                    }}/>
                    </div>
            </section>
        )
}

export default EmotionData;