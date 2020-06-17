import React, {useState, useEffect} from 'react';
import './Journal.scss';
import cardTop from './JournalAssets/notesTop.png';
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
                                        <div>{entry.title}</div>
                                        <div>{entry.notes}</div>
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