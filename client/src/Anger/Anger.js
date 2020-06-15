import React, { useState, useEffect} from 'react';
import './Anger.scss';
import axios from 'axios';
import articleIcon from './AngerAssets/article-type-icon.svg';
import videoIcon from './AngerAssets/video-type-icon.svg';

const API_URL = 'http://localhost:8080/anger';

const Anger = () => {
     const [angResources, setAngResources] = useState([]);
    
     useEffect(()=> {
        let source = axios.CancelToken.source();

        axios.get(`${API_URL}`, {cancelToken: source.token})
        .then(res=> {
            setAngResources(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        return() => {
            source.cancel();
        }
     },);
     


     return(
         <section className="anger">
             <div className="anger__wrap">
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
                                    <a href={resource.link} className="anger__resource-link">Link to the {resource.type}</a>
                                </div>
                            </div>
                        )
                    })}
             </div>
         </section>
     )
}

export default Anger;