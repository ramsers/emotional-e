import React, {useState, useEffect, useRef} from 'react';
import './HomePage.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Hero from '../Hero/Hero';
import {gsap, Power3} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)





// const API_URL = "https://stark-stream-18350.herokuapp.com:5000";

 let HomePage = () => {

let [anxiety, setAnxietyClick] = useState({anxietyClick: 0});
let [anger, setAngerClick] = useState({angerClick: 0});
let [depression, setDepressionClick] = useState({depressionClick: 0});

let emotionHead = useRef(null);
let emotionsCardSection = useRef(null);
let emotionsCard = useRef(null);
let emotionsCard2 = useRef(null);
let emotionsCard3 = useRef(null);

useEffect(() => {
         axios.get('/api/clicks',)
         .then(res => {
                setAnxietyClick(res.data.anxietyClicks);
                setAngerClick(res.data.angerClicks);
                setDepressionClick(res.data.depressionClicks)
         })
         .catch(err => {
             console.log(err)
         })
        gsap.to(emotionHead, {
            scrollTrigger: emotionsCardSection,
            opacity:1,
                x: 0,
                ease:Power3.eastOut,
                duration: 1.3,  
                delay: .2 
        })
        gsap.to(emotionsCard, {
            scrollTrigger: emotionHead,
            opacity: 1,
            y: 0,
            ease:Power3.eastOut,
            duration: 1,
            delay: .35
        })
        gsap.to(emotionsCard2, {
            scrollTrigger: emotionHead,
            opacity: 1,
            y: 0,
            ease:Power3.eastOut,
            duration: 1,
            delay: .35
        })
        gsap.to(emotionsCard3, {
            scrollTrigger: emotionHead,
            opacity: 1,
            y: 0,
            ease:Power3.eastOut,
            duration: 1,
            delay: .35
        })
        
}


, []);

    let postRequest = (url, kvPairs) => {
        axios.post(`${url}`, kvPairs)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }

    let anxietyClick = () => {
         postRequest('/api/clicks', {anxietyClicks: anxiety + 1})
     }
     let angerClick = () => {
         postRequest('/api/clicks', {angerClicks: anger + 1})
     }
    let depressionClick = () => {
         postRequest('/api/clicks', {depressionClicks: depression + 1})
     }
        return(
            <>
            <Hero/>
            <section ref={el => {emotionsCardSection = el}} className="emotions">
                <h2 ref={el => {emotionHead = el}} className="emotions__head">How're You Feeling Today?</h2>
                <div className="emotions__wrap">

                    <Link  className="emotions__card-link emotions--anxiety" ref={el => {emotionsCard = el}} onClick={anxietyClick} to='/anxiety'>
                            <p className="emotions__card-desc">
                                Everyone feels anxious now and then. It’s a normal emotion. 
                                For example, you may feel nervous when faced with a problem at work, before taking a test, 
                                or before making an important decision. Anxiety disorders a little different. 
                                They are a group of mental illnesses, and the distress they cause can keep you from carrying on with your life normally. 
                                For people who have one, worry and fear are constant and overwhelming, and this can be disabling. 
                                But with treatment, many people can manage those feelings and get back to a fulfilling life.
                                Click this card for more resources.
                            </p>

                        <div  className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Anxious</h2>
                        </div>
                    </Link>
                    
                    
                    <Link className="emotions__card-link emotions--anger" ref={el => {emotionsCard2 = el}} onClick={angerClick} to='/anger'>
                        <p className="emotions__card-desc">
                            Anger is an emotion characterized by antagonism toward someone or something you feel has deliberately done you wrong. Anger can be a good thing. 
                            It can give you a way to express negative feelings, for example, or motivate you to find solutions to problems. 
                            But excessive anger can cause problems. Increased blood pressure and other physical changes associated with anger make it difficult to think straight and harm your physical and mental health.
                            Click this card for more resources.
                        </p>

                        <div className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Angry</h2>
                        </div>
                    </Link>
                    
                   
                   <Link className="emotions__card-link emotions--depression" ref={el => {emotionsCard3 = el}} onClick={depressionClick} to='/depression'>
                        
                        <p className="emotions__card-desc">
                            Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. 
                            It affects how you feel, think and behave and can lead to a variety of emotional and physical problems. 
                            You may have trouble doing normal activities, and sometimes you may feel as if life isn't worth living. 
                            More than just a bout of the blues, depression isn't a weakness and you can't simply "snap out" of it. Click this card for more resources.
                        </p>
                        

                        <div className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Depressed</h2>
                        </div>
                    </Link>
                </div>
            </section>
            </>
        )
}

export default HomePage;