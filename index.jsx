'use strict';

var React = require('react')
var Accordion = require('./src')


var App = React.createClass({


    render: function() {

        return (
            <div className="App" >
                <Accordion />
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))