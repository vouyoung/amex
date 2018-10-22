import React, { Component } from 'react';
import './App.css';
import CharacterSwitcher from './components/dropdown';
import CharacterFilmography from './components/character';
import axios from 'axios';


const themes = ['Success', 'Danger', 'Primary', 'Primary'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
      index: null,
      url: null,
      theme: null,
      loading: false,
      error: false,
      ...props
    };

    this.handler = this.handler.bind(this);
  }

  handler(index) {
    let character, url, theme, loading, error;
    if (index === 'reset') {
      index = null;
      character = null;
      url = null;
      theme = null;
      loading = false;
    } else {
     character= this.state.characters[index].name;
     url = this.state.characters[index].url;
     theme = themes[index];
     loading = true;
     error = false;
    }

    this.setState({ index, character, url, theme, loading, error });

    if(url)
      this.getCharacter(url);
  }

  getCharacter(url){
    const that = this;

    axios.get(url)
      .then(res => {
        //console.log(res)
        const filmsUrls = res.data.films;
        //console.log(res.data.name, films);
        axios.all(filmsUrls.map(l => axios.get(l)))
          .then(axios.spread(function (...res) {
            // all requests are now complete
            const films = res.map(function(film, index){
              return film.data
            })

            console.log(films);
            // console.log(that);
            that.setState({
              films,
              loading: false,
              error: false
            });
          }));

      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        console.log('err', err);
        this.setState({
          films: null,
          loading: false,
          error: err
        });
      });
  }

  render() {
    return (
      <div className="App">
          <nav className="App-nav">
            <CharacterSwitcher data={this.state} error={this.state.error} handler={this.handler} />
          </nav>
          <section className="App-content">
          <CharacterFilmography loading={this.state.loading} films={this.state.films} />
          </section>
      </div>
    );
  }
}

export default App;
