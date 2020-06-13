import React from 'react';
import './HomePage.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';



const API_URL = 'http://localhost:8080';

 class HomePage extends React.Component {
     state = {
         anxietyClick: 0,
         angerClick: 0,
         depressionClick: 0
     }


     componentDidMount() {
         axios.get(`${API_URL}/clicks`,)
         .then(res => {
             this.setState({
                 anxietyClick: res.data.anxietyClicks,
                 angerClick:res.data.angerClicks,
                 depressionClick: res.data.depressionClicks
             })
         })
         .catch(err => {
             console.log(err)
         })
     }

     postRequest = (url, kvPairs) => {
        axios.post(`${url}`, kvPairs)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }

     anxietyClick = () => {
         this.postRequest(`${API_URL}/clicks`, {anxietyClicks: this.state.anxietyClick + 1})
     }
     angerClick = () => {
         this.postRequest(`${API_URL}/clicks`, {angerClicks: this.state.angerClick + 1})
     }
     depressionClick = () => {
         this.postRequest(`${API_URL}/clicks`, {depressionClicks: this.state.depressionClick + 1})
     }
     render() {
        return(
            <section className="emotions">
                <div className="emotions__wrap">
                    <Link  className="emotions__card-link" onClick={this.anxietyClick} to='/anxiety'>
                        <div  className="emotions__card">
                            Anxiety
                        </div>
                    </Link>
                    
                    
                    <Link className="emotions__card-link" onClick={this.angerClick} to='/anger'>
                        <div className="emotions__card">
                            Anger
                        </div>
                    </Link>
                    
                   
                   <Link className="emotions__card-link" onClick={this.depressionClick} to='/depression'>
                        <div className="emotions__card">
                            Depression
                        </div>
                    </Link>
                </div>
            </section>
        )
     }
}

export default HomePage;