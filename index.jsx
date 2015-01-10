'use strict';

var React = require('react')
var Accordion = require('./src')

require('./index.styl')


var ACTIVE = {2: true}
function titleClick(){
    // console.log('clicked second')
}

var App = React.createClass({

    onChange: function(index){
        ACTIVE[index] = !ACTIVE[index]
        this.setState({})
    },

    render: function() {

        return (
            <div className="App" style={{padding: 20}}>
                <Accordion exclusive={true} transitionDurationx={'1550ms'} defaultActiveIndex={ACTIVE} style={{border: '1px solid gray', height: 800, display: 'flex'}}>

                    <div data-title="first item" style={{flex: 1}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam venenatis, lacus sit amet feugiat sodales, arcu ex tristique justo, vel fringilla risus turpis quis libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis lacinia finibus lorem, vitae consectetur nunc tempor et. Pellentesque elementum venenatis massa, nec vestibulum est fermentum vel. Aliquam sem nisi, iaculis quis nisi nec, consectetur euismod velit. Sed tempor faucibus tristique. Donec bibendum nunc non lacinia convallis. Nullam a neque ut tellus aliquet ullamcorper. Quisque molestie rutrum feugiat. Pellentesque id enim ut dolor aliquet fringilla. Etiam massa risus, laoreet eu tristique ac, tincidunt at urna. Curabitur consectetur porta tristique.
                        </p>
                    </div>

                    <div style={{flex: 1}}>
                        <h2 onClick={titleClick} style={{margin: 0}}>Second item</h2>
                        <p>Nulla ac felis eget metus vestibulum ornare. Sed elementum velit quis vulputate ultricies. Fusce et hendrerit urna, in egestas turpis. Nulla fringilla ac turpis vel faucibus. Ut varius massa eleifend, accumsan ligula et, auctor ipsum. Fusce dignissim urna vitae arcu placerat, nec sodales felis scelerisque. Maecenas suscipit facilisis orci. Sed odio neque, tincidunt non quam non, venenatis dignissim lacus. Nulla facilisi. Nullam ut sapien mauris. Aliquam auctor eu purus vel euismod. Donec varius, lacus vel egestas convallis, mi mi rhoncus turpis, sit amet tincidunt lectus leo at dolor. Mauris molestie fermentum nisl vulputate ullamcorper. Curabitur arcu libero, consequat a mauris vel, maximus pretium nibh. Morbi sed facilisis tortor, dignissim aliquam lectus. Nunc pharetra libero ornare magna elementum ultrices.
                        </p>
                    </div>

                    <div style={{flex: 1, textAlign: 'right'}}>
                        THIRD!
                        <p>Cras tristique neque sit amet eleifend consectetur. Praesent ut lobortis arcu. Quisque eget libero cursus, iaculis diam at, facilisis turpis. Fusce molestie aliquam ante nec maximus. Integer leo nibh, semper eget porta sed, cursus ac enim. Ut nec viverra neque. Suspendisse vitae ligula fringilla, pretium tortor vel, mollis mi. Maecenas nunc dolor, dignissim vel tincidunt vel, finibus at turpis. Curabitur vitae viverra nibh. Nam at vulputate enim. Integer tincidunt efficitur dolor molestie iaculis. Ut eros neque, pharetra at mattis sed, dignissim accumsan enim.</p>
                    </div>

                </Accordion>
            </div>
        )
    }
})

React.render(<App />, document.getElementById('content'))