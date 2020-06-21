import React, { useState, useEffect, useRef} from 'react';
import './Anxiety.scss';
import NotesModal from '../NotesModal/NotesModal';
import axios from 'axios';
import articleIcon from './AnxietyAssets/article-type-icon.svg';
import videoIcon from './AnxietyAssets/video-type-icon.svg';
import {TweenMax, Power3} from 'gsap';

const API_URL = process.env.REACT_APP_API_URL;

const Anxiety = () => {
     const [anxResources, setAnxResources] = useState([]);
     let anxHeader = useRef(null);
     let anxContent = useRef(null);
    
     useEffect(()=> {

        TweenMax.to(
            anxHeader,
            2,
            {
                opacity: 1,
                x: 0,
                ease: Power3.easeOut
            }
        )
        TweenMax.to(
            anxContent,
            1.5,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeIn
            }
        )

        let source = axios.CancelToken.source();

        axios.get(`${API_URL}/anxiety`, {cancelToken: source.token})
        .then(res=> {
            setAnxResources(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        return() => {
            source.cancel();
        }

     }, []);
     


     return(
         <section className="anxiety">
             <div ref={el => {anxHeader = el}} className="anxiety__header-ctn">
                <h2 className="anxiety__header">Your Anxiety Resources</h2>
             </div>
             <div ref={el => {anxContent = el}} className="anxiety__wrap">
                    {anxResources.map(resource => {
                        return(
                            <div key={resource.id} className="anxiety__card">
                                <div className="anxiety__card-img-ctn">
                                    <img src={resource.image} alt="" className="anxiety__img"/>
                                </div>
                                <div className="anxiety__card-content-ctn">
                                {(() =>{
                                    if(resource.type === "Article") {
                                        return (
                                            <div className="anxiety__type-ctn">
                                                <img src={articleIcon} alt="" className="anxiety__type-icon"/>
                                                <p className="anxiety__type">{resource.type}</p>
                                            </div>
                                        )
                                    } else{
                                        return (
                                            <div className="anxiety__type-ctn">
                                                <img src={videoIcon} alt="" className="anxiety__type-icon"/>
                                                <p className="anxiety__type">{resource.type}</p>
                                            </div>
                                        )
                                    }
                                }) ()}
                                    <h4 className="anxiety__card-title">{resource.title}</h4>
                                    <p className="anxiety__card-desc">{resource.description}</p>
                                    <a href={resource.link} target='_blank' rel="noopener noreferrer" className="anxiety__resource-link">Link to the {resource.type}</a>
                                </div>
                            </div>
                        )
                    })}
                    <NotesModal/>
             </div>
             
         </section>
     )
}

export default Anxiety;
