import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DATA from './data/characters'


ReactDOM.render(<App characters={DATA.characters}/>, document.getElementById('root'));
