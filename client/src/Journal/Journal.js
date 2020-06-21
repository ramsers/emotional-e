import React, {useState, useEffect, useRef} from 'react';
import './Journal.scss';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

let Journal = () => {
    let [journal, setJournal] = useState([]);
    let notesCtn = useRef(null)

    useEffect(()=> {

        let source = axios.CancelToken.source();

       axios.get(`${API_URL}/journal`, {cancelToken: source.token})
        .then(res=> {
            setJournal(res.data)
        })

        return() => {
            source.cancel();
        }
    }, [])

    if(!journal || journal.length <= 0) {
        return(
            <div  className="loading">
                <h2 className="loading__text">Sorry You Havent Added Any Notes Yet.
                    Have You Been to One of Our Resource Pages? Click A Card on the HomePage.
                </h2>
            </div>
        )
    } 
        return (
            <section className="journal">
                <div className="journal__ctn">
                {
                    journal.map(entry => {
                        return(
                                <div key={entry.id} className="journal__card">
                                    <div className="journal__content-ctn">
                                        <h3 className="journal__date">{entry.date}</h3>
                                        <h3 className="journal__title">{entry.title}</h3>
                                        <p  className="journal__entry">{entry.notes}</p>
                                    </div>
                                    
                                </div>
                        )
                    })
                }
                </div>
            </section>
        )     
}

export default Journal;