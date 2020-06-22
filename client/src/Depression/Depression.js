import React, { useState, useEffect, useRef} from 'react';
import './Depression.scss';
import axios from 'axios';
import articleIcon from './DepressionAssets/article-type-icon.svg';
import videoIcon from './DepressionAssets/video-type-icon.svg';
import NotesModal from '../NotesModal/NotesModal';
import {TweenMax, Power3} from 'gsap';

const API_URL = 'https://nameless-lowlands-84986.herokuapp.com';;

const Depression = () => {
     const [depResources, setDepResources] = useState([]);
     let depHeader = useRef(null);
     let depContent = useRef(null);
    
     useEffect(()=> {


        TweenMax.to(
            depHeader,
            2,
            {
                opacity: 1,
                x: 0,
                ease: Power3.easeOut
            }
        )
        TweenMax.to(
            depContent,
            1.5,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeIn
            }
        )

        let source = axios.CancelToken.source();

        axios.get(`${API_URL}/api/depression`, {cancelToken: source.token})
        .then(res=> {
            // console.log(res.data);
            setDepResources(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        return() => {
            source.cancel();
        }
     }, []);
     


     return(
         <section className="depression">
              <div ref={el => {depHeader = el}} className="depression__header-ctn">
                <h2 className="anxiety__header">Your Depression Resources</h2>
             </div>
             <div ref={el=> {depContent = el}} className="depression__wrap">
                    {depResources.map(resource => {
                        return(
                            <div key={resource.id} className="depression__card">
                                <div className="depression__card-img-ctn">
                                    <img src={resource.image} alt="" className="depression__img"/>
                                </div>
                                <div className="depression__card-content-ctn">
                                    {(() =>{
                                        if(resource.type === "Article") {
                                            return (
                                                <div className="depression__type-ctn">
                                                    <img src={articleIcon} alt="" className="depression__type-icon"/>
                                                    <p className="depression__type">{resource.type}</p>
                                                </div>
                                            )
                                        } else{
                                            return (
                                                <div className="depression__type-ctn">
                                                    <img src={videoIcon} alt="" className="depression__type-icon"/>
                                                    <p className="depression__type">{resource.type}</p>
                                                </div>
                                            )
                                        }
                                    }) ()}
                                    <h4 className="depression__card-title">{resource.title}</h4>
                                    <p className="depression__card-desc">{resource.description}</p>
                                    <a href={resource.link} target='_blank' rel="noopener noreferrer" className="depression__resource-link">Link to the {resource.type}</a>
                                </div>
                            </div>
                        )
                    })}
                    <NotesModal/>
             </div>
         </section>
     )
}

export default Depression;