import React, { useState, useEffect, useRef} from 'react';
import './Anger.scss';
import axios from 'axios';
import articleIcon from './AngerAssets/article-type-icon.svg';
import videoIcon from './AngerAssets/video-type-icon.svg';
import NotesModal from '../NotesModal/NotesModal';
import {TweenMax, Power3} from 'gsap';

const API_URL = process.env.REACT_APP_API_URL;

const Anger = () => {
     const [angResources, setAngResources] = useState([]);
     let angHeader = useRef(null);
     let angContent = useRef(null);

    
     useEffect(()=> {
        // GSAP Animations
        TweenMax.to(
            angHeader,
            2,
            {
                opacity: 1,
                x: 0,
                ease: Power3.easeOut
            }
        )
        TweenMax.to(
            angContent,
            1.5,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeIn
            }
        )

        // Axios Request and Axios Cancel Token
        let source = axios.CancelToken.source();

        axios.get(/api/anger, {cancelToken: source.token})
        .then(res=> {
            setAngResources(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        return() => {
            source.cancel();
        }
     }, []);
     


     return(
         <section className="anger">
             <div ref={el => {angHeader = el}} className="anger__header-ctn">
                <h2 className="anger__header">Your Anger Resources</h2>
             </div>
             <div ref={el => {angContent = el}} className="anger__wrap">
                    {angResources.map(resource => {
                        return(
                            <div key={resource.id} className="anger__card">
                                <div className="anger__card-img-ctn">
                                    <img src={resource.image} alt="" className="anger__img"/>
                                </div>
                                <div className="anger__card-content-ctn">
                                {(() =>{
                                    if(resource.type === "Article") {
                                        return (
                                            <div className="anger__type-ctn">
                                                <img src={articleIcon} alt="" className="anger__type-icon"/>
                                                <p className="anger__type">{resource.type}</p>
                                            </div>
                                        )
                                    } else{
                                        return (
                                            <div className="anger__type-ctn">
                                                <img src={videoIcon} alt="" className="anger__type-icon"/>
                                                <p className="anger__type">{resource.type}</p>
                                            </div>
                                        )
                                    }
                                }) ()}
                                    <h4 className="anger__card-title">{resource.title}</h4>
                                    <p className="anger__card-desc">{resource.description}</p>
                                    <a href={resource.link} target='_blank' rel="noopener noreferrer" className="anger__resource-link">Link to the {resource.type}</a>
                                </div>
                            </div>
                        )
                    })}
                    <NotesModal/>
             </div>
         </section>
     )
}

export default Anger;