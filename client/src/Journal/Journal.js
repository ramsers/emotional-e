import React, {useState, useEffect} from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/journal';

let Journal = () => {
    const [journal, setJournal] = useState([])

    useEffect(()=> {
        let source = axios.CancelToken.source();

       axios.get(`${API_URL}`, {cancelToken: source.token})
        .then(res=> {
            // console.log(res.data)
            // console.log(res.data.length)
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
            <div>
                {
                journal.map(entry => {
                    return(
                    <div>{entry.title}</div>
                    
                    )
                })
                }
            </div>
        )
}

export default Journal;