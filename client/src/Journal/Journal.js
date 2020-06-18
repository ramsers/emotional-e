import React, {useState, useEffect} from 'react';
import './Journal.scss';
import axios from 'axios';

const API_URL = 'http://localhost:8080/journal';

let Journal = () => {
    const [journal, setJournal] = useState([])

    useEffect(()=> {
        let source = axios.CancelToken.source();

       axios.get(`${API_URL}`, {cancelToken: source.token})
        .then(res=> {
            setJournal(res.data)
        })

        return() => {
            source.cancel();
        }
        
    }, [])


    if(!journal || journal.length <= 0) {
        return(
            <div>Loadiing</div>
        )
    } 
        return (
            <section className="journal">
                <div className="journal__ctn">
                {
                    journal.map(entry => {
                        return(
                                <div key={entry.id} className="journal__card">
                                    <div  className="journal__content-ctn">
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