import React, {useState, useEffect} from 'react';
import ReactModal from'react-modal';
import './NotesModal.scss';
import noteAdd from './NotesModalAssets/addNote.svg';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

let NotesModal =()=> {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [note, setNotes] = useState([])


   const addNotes =(e)=> {
        e.preventDefault();
        let newNote = note.slice();
        let title = e.target.title.value;
        let notes = e.target.journal.value;

        if(!title || !notes) {
            alert('Please Input A Title andc Note')
        } else {
            newNote.push({title, notes})
            axios.post(`${API_URL}/api/journal`, {title:title, notes:notes})
            .then(()=>{
                setNotes(newNote)
            })
        }
    }


        return (
            <div className="modal">
                <button className="modal__button" onClick={()=> {setModalIsOpen(true)}}>
                <div className="modal__text">Add A Note</div>
                <img src={noteAdd} alt=""/>
                </button>
                <ReactModal
                 className="modal__window" 
                 isOpen={modalIsOpen} 
                 onRequestClose={()=> {setModalIsOpen(false)}}
                 overlayClassName="Overlay">
                     <div className="modal__ctn">
                        <h2 className="modal__header">Don't Lose That Thought!</h2>
                        <form className="modal__form" action="" onSubmit={addNotes}>
                            <label className="modal__label" htmlFor="Title">Title Your Note</label>
                            <input className="modal__title-input" type="text" id="title"/>
                            <label className="modal__label" htmlFor="notes">Input Your Thoughts</label>
                            <textarea className="modal__notes-input" type="text" id="journal"/>
                            <div className="modal__btn-ctn">
                                <button className="modal__form-btn" type="submit">Post Note</button>
                                <button className="modal__form-btn" onClick={()=>{setModalIsOpen(false)}}>
                                    Close
                                </button>
                            </div>
                        </form>
                     </div>
                </ReactModal>
            </div>
            
        )
    }

    ReactModal.setAppElement('#root');
export default NotesModal;