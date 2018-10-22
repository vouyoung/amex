import React, { Component } from 'react';
import Moment from 'react-moment';

class CharacterFilmography extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     props
  //   };
  //   console.log(this.props);
  // }
  componentDidMount() {

  }

  render() {
    const listStylings = {
      textAlign: 'center',
      listStyle: 'none',
      width: '50%'
    }
    const crawlStylings = {
      width: '50%',
      display: 'inline-block',
      margin: '0 auto',
      marginBottom: '50px'
    }

    const dateStylings ={
      display: 'block'
    }
    const films = this.props.films;
    const loading = this.props.loading;
    //console.log('films',films);
    return (
      <ul style={listStylings}>
        {(films && !loading) ? films.map(film =>{
          return <li key={film.created}>
            <h1>{film.title} </h1>
            <Moment format="dddd, MMMM DD YYYY" style={dateStylings}>
                {film.release_date}
            </Moment>
            <span style={crawlStylings}>
              {film.opening_crawl}
            </span>
          </li>
        }) : ''}

      </ul>
    );
  }
}

export default CharacterFilmography;
