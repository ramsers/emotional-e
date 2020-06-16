import React, { useState, useEffect} from 'react';
import './Depression.scss';
import axios from 'axios';
import articleIcon from './DepressionAssets/article-type-icon.svg';
import videoIcon from './DepressionAssets/video-type-icon.svg';

const API_URL = 'http://localhost:8080/depression';

const Depression = () => {
     const [depResources, setDepResources] = useState([]);
    
     useEffect(()=> {
        let source = axios.CancelToken.source();

        axios.get(`${API_URL}`, {cancelToken: source.token})
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
     },);
     


     return(
         <section className="depression">
             <div className="depression__wrap">
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
                                    <a href={resource.link} className="depression__resource-link">Link to the {resource.type}</a>
                                </div>
                            </div>
                        )
                    })}
             </div>
         </section>
     )
}

export default Depression;