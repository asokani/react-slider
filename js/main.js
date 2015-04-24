import React from 'react'
require('../css/index.scss');

import App from './components/App'

const app = document.getElementById('react-slider');
React.render(<App sliderWidth="600" sliderHeight="20" />, app);


