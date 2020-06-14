import React, { useState, useEffect} from 'react';
import './Anxiety.scss';
import axios from 'axios';
import articleIcon from './AnxietyAssets/article-type-icon.svg';
import videoIcon from './AnxietyAssets/video-type-icon.svg';
import {Link} from 'react-router-dom';

const API_URL = 'http://localhost:8080/anxiety';

const Anxiety = () => {
     const [anxResources, setAnxResources] = useState([]);
    
     useEffect(()=> {
        let source = axios.CancelToken.source();

        axios.get(`${API_URL}`, {cancelToken: source.token})
        .then(res=> {
            setAnxResources(res.data);
        })
        .catch(err => {
            console.log(err)
        })
        return() => {
            console.log("unmounting");
            source.cancel();
        }
     }, [API_URL]);
     


     return(
         <section className="anxiety">
             <div className="anxiety__wrap">
                 
                    {anxResources.map(resource => {
                        return(
                            <div key={resource.id} className="anxiety__card">
                                <div className="anxiety__card-img-ctn">
                                    <img src={resource.image} alt="" className="anxiety__img"/>
                                </div>
                                {(() =>{
                                    if(resource.type === "Article") {
                                        return (
                                            <div className="anxiety__type-ctn">
                                                <img src={articleIcon} alt="" className="anxiety__type-icon"/>
                                                <p className="anxiety__type">{resource.type}</p>
                                            </div>
                                        )
                                    } else if(resource.type === "Video") {
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
                            </div>
                        )
                    })}
             </div>
         </section>
     )
}

export default Anxiety;
