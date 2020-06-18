import React, {useRef, useEffect} from 'react';
import  './Hero.scss';
import downArrow from './HeroAssets/hero-arrow.png';
import {TweenMax, TimelineMax, Power3} from 'gsap';

const Hero = () => {

    let heroText = useRef(null);
    let arrow = useRef(null);
    let arrowText = useRef(null);

    
let tl = new TimelineMax({repeat: 2, delay: 2});
    useEffect(()=> {
        TweenMax.to(
            heroText,
            2,
            {
                opacity:1,
                x:20,
                ease:Power3.eastOut
            }
        )
        tl.to(
            arrow,
            .10,
            {transformOrigin: "50% 100%",  
            yoyo:true, 
            repeat:1,
            }
        )
        .to(arrow, .75, {y:-20, ease:Power3.easeOut, yoyo:true, repeat:1,})
        TweenMax.to(
            arrowText,
            2,
            {
                opacity:1,
                y:-15,
                ease:Power3.eastOut,
                delay:1.5
            }
        )
        TweenMax.to(
            arrow,
            3,
            {
                opacity:1,
                ease:Power3.eastOut,
                delay: 2
            }
        )
    }, [])
    

    return (
        <section className="hero">
            <div className="hero__wrap">
                <h1 ref={el => {heroText = el}} className="hero__header">It's Time to Find Your Peace</h1>
                <div className="hero__scroll-ctn">
                    <p ref={el=> {arrowText = el}} className="hero__scroll-text">Scroll Down</p>
                    <img className="hero__arrow" ref={el=> {arrow = el}} src={downArrow} alt=""/>
                </div>
            </div>
        </section>
    )
}

export default Hero;

