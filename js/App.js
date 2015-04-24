import React from 'react'
require('../css/index.scss');

let App = React.createClass({
    render() {
        return (
            <div>
                ahoj
            </div>

        )
    }
})

const app = document.getElementById('react-slider');
React.render(<App/>, app);

