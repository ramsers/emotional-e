import React, {useState, useEffect, useRef} from 'react';
import './HomePage.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Hero from '../Hero/Hero';
import {gsap, Power3} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)





const API_URL = 'http://localhost:8080';

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
         axios.get(`${API_URL}/clicks`,)
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
         postRequest(`${API_URL}/clicks`, {anxietyClicks: anxiety + 1})
     }
     let angerClick = () => {
         postRequest(`${API_URL}/clicks`, {angerClicks: anger + 1})
     }
    let depressionClick = () => {
         postRequest(`${API_URL}/clicks`, {depressionClicks: depression + 1})
     }
        return(
            <>
            <Hero/>
            <section ref={el => {emotionsCardSection = el}} className="emotions">
                <h2 ref={el => {emotionHead = el}} className="emotions__head">How're You Feeling Today?</h2>
                <div  className="emotions__wrap">

                    <Link  className="emotions__card-link emotions--anxiety" ref={el => {emotionsCard = el}} onClick={anxietyClick} to='/anxiety'>
                            <p className="emotions__card-desc">Everyone feels anxious now and then. It’s a normal emotion. 
                            For example, you may feel nervous when faced with a problem at work, 
                            before taking a test, or before making an important decision. Anxiety disorders a little different. 
                            They are a group of mental illnesses, and the distress they cause can 
                            keep you from carrying on with your life normally. For people who have one, worry and fear are constant and overwhelming, and this can be disabling. 
                            But with treatment, many people can manage those feelings and get back to a fulfilling life.
                            </p>

                        <div  className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Anxiety</h2>
                        </div>
                    </Link>
                    
                    
                    <Link className="emotions__card-link emotions--anger" ref={el => {emotionsCard2 = el}} onClick={angerClick} to='/anger'>
                    <p className="emotions__card-desc">Everyone feels anxious now and then. It’s a normal emotion. 
                            For example, you may feel nervous when faced with a problem at work, 
                            before taking a test, or before making an important decision. Anxiety disorders a little different. 
                            They are a group of mental illnesses, and the distress they cause can 
                            keep you from carrying on with your life normally. For people who have one, worry and fear are constant and overwhelming, and this can be disabling. 
                            But with treatment, many people can manage those feelings and get back to a fulfilling life.
                            </p>

                        <div className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Anger</h2>
                        </div>
                    </Link>
                    
                   
                   <Link className="emotions__card-link emotions--depression" ref={el => {emotionsCard3 = el}} onClick={depressionClick} to='/depression'>
                        
                   <p className="emotions__card-desc">Everyone feels anxious now and then. It’s a normal emotion. 
                            For example, you may feel nervous when faced with a problem at work, 
                            before taking a test, or before making an important decision. Anxiety disorders a little different. 
                            They are a group of mental illnesses, and the distress they cause can 
                            keep you from carrying on with your life normally. For people who have one, worry and fear are constant and overwhelming, and this can be disabling. 
                            But with treatment, many people can manage those feelings and get back to a fulfilling life.
                            </p>

                        <div className="emotions__card"></div>
                        <div className="emotions__card-title-ctn">
                                <h2 className="emotions__card-title">Depression</h2>
                        </div>
                    </Link>
                </div>
            </section>
            </>
        )
}

export default HomePage;