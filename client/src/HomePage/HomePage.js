import React from 'react';
import './HomePage.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

const API_URL = 'http://localhost:8080';

 class HomePage extends React.Component {
     state = {
         anxietyClick:[],
         angerClick:[],
         depressionClick:[]
     }
     componentDidMount() {
         axios.get(`${API_URL}/clicks`)
         .then(res => {
             this.setState({
                 anxietyClick: res.data[0].clicks + 1
             })
         })
         .catch(err => {
             console.log(err)
         })
     }

     componentDidUpdate(){
        axios.get(`${API_URL}/clicks`)
        .then(res => {
            this.setState({
                anxietyClick: res.data[0].clicks
            })
            
        })
        .catch(err => {
            console.log(err)
        })
     }
     postRequest = (url, kvPairs, state) => {
        axios.post(`${url}`, kvPairs)
        .then(()=> {
            this.setState({
                anxietyClick: state
            })
        })
    }

     angerClick = () => {
         this.postRequest(`${API_URL}/clicks`, {description: "anxietyClicks", clicks: this.state.anxietyClick + 1})
         axios.get(`${API_URL}/clicks`)
         .then(res =>{
             console.log(res.data)
         })
     }
     render() {
        return(
            <section className="emotions">
                <div className="emotions__wrap">
                    {/* <Link  className="emotions__card-link" to='/anxiety'> */}
                    <div onClick={this.angerClick} className="emotions__card">
                        Anxiety
                        </div>
                    {/* </Link> */}
                    
                    
                    <Link className="emotions__card-link" to='/anger'>
                    <div className="emotions__card">
                        Anger
                        </div>
                    </Link>
                    
                   
                   <Link className="emotions__card-link" to='/depression'>
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