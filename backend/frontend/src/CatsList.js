import React, { Component } from 'react';

import CatsService from './CatsService';

import './App.css';

const catsService = new CatsService();

class CatsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: []
        };
        //console.log(this.state);
    }


    componentDidMount() {
        var self = this;
        catsService.getCats().then(function (result) {
            // console.log(result);
            self.setState({ cats: result })
            console.log(result)
        });
    }

    render() {

        return (
            <div>
                <div className="row align-items-center top-block">
                    <div className="col text-center">
                        <h1>Hello cat lovers!</h1>
                        <p>Find Cutest Cats Here </p>
                    </div>
                </div>
                <div className="row main-block">
                    <div className="col-md-12">
                        <div className="d-flex flex-wrap justify-content-around">
                            {this.state.cats.map(cat =>
                                <div key={cat.pk} className="img-container" style={{ width: '20rem' }}>
                                    <a href={cat.description} target="_blank" rel="noopener noreferrer">
                                        <img referrerPolicy="no-referrer" src={cat.cat_image} className="img-top" alt={cat.breed} />
                                    </a>
                                    <div className="cat-breed" target="_blank" rel="noopener noreferrer">
                                        <a href={cat.description}>
                                            {cat.breed}</a>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>

            </div>








        );
    }

}





export default CatsList;