import React, { Component } from 'react';

import CatsService from './CatsService';

import './App.css';

const catsService = new CatsService();


class CatsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cats: [],
            searchField: "",
        };
    }

    handleChange = e => {
        var lowerValue = e.target.value.toLowerCase();
        this.setState({ searchField: lowerValue });

    };


    componentDidMount() {
        var self = this;
        catsService.getCats().then(function (result) {
            return self.setState({ cats: result })
        });
    }




    getFiltered(prevProps, prevState) {
        var self = this;
        const filtered = self.state.cats.filter((data) => {
            if (self.state.searchField === '') {
                return data
            }
            else {
                return data.breed.toLowerCase().includes(self.state.searchField)
            }
        });
        return filtered
    }

    getNum() {
        if (this.getFiltered().length > 1) {
            return "cats are"
        }
        else {
            return "cat is"
        }


    }


    render() {

        return (
            <div>
                <div className="search-block">
                    <form className="">
                        <div className="col-md-12">
                            <input type="search" className="form-control" onChange={this.handleChange} id="cat-search-form" placeholder="Find a cat (cyrillic name)" />
                        </div>
                    </form>
                </div>
                <div className="row main-block">
                    <div className="col-md-12">
                        <div className='cats-number text-center'>{this.getFiltered().length} {this.getNum()} shown now</div>
                        <div className="d-flex flex-wrap justify-content-around">
                            {console.log(this.getFiltered())}
                            {this.getFiltered().map(cat =>
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