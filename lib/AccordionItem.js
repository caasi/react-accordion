'use strict';

var React  = require('react')
var assign = require('object-assign')
var transitionend = require('transitionend-property')
var prefixer = require('react-prefixr')

window.items = {}

function getExpandToolStyle(props){
    var style = prefixer({
        transition: 'all ' + props.expandToolTransitionDuration
    })

    if (!props.collapsed){
        style.transform = 'rotate(-180deg)'
    }

    return style
}

function emptyFn(){}

module.exports = React.createClass({

    displayName: 'ReactAccordionItem',

    getDefaultProps: function() {

        return {
            collapsed: false,
            isAccordionItem: true,
            expandTool: true,
            expandToolTransitionDuration: '0.1s',
            defaultTitleStyle: {
                padding      : 10,
                fontSize     : '2em',
                fontWeight   : 'bold',
                display      : 'flex',
                flexDirection: 'row',
                alignItems   : 'center',
                cursor       : 'pointer',
                boxSizing    : 'border-box',
                border : '4px solid red'
            },

            defaultBodyStyle: {
                padding: 10,
                boxSizing: 'border-box'
            },
            defaultStyle: prefixer({
                transform: 'translate3d(0px, 0px, 0px)'
            }),
            transitionDuration: '0.1s'
        }
    },

    componentDidMount: function() {

        window.items[this.props.index] = this
        this.getDOMNode().addEventListener(transitionend, this.onTransitionEnd)
    },

    componentWillUnmount: function() {
        this.getDOMNode().removeEventListener(transitionend, this.onTransitionEnd)
    },

    onTransitionEnd: function(event) {
        if (event.target == this.getDOMNode()){
            var newState = {
                transitioning: false
            }
            if (this.state.collapsing){
                newState.collapsing = false
            }
            if (this.state.expanding){
                newState.expanding = false
            }
            this.setState(newState)
            ;(this.props.onTransitionEnd || emptyFn)(event);
        }
    },

    getInitialState: function() {
        return {
            collapsing: false,
            expanding : false
        }
    },

    prepareProps: function(thisProps, state) {
        var props = assign({}, thisProps)

        props.style = this.prepareStyle(props, state)
        props.bodyStyle  = this.prepareBodyStyle(props, state)
        props.titleStyle = this.prepareTitleStyle(props, state)

        return props
    },

    shouldPrepareExpand: function(props, state){
        return !props.collapsed && this.isMounted() && !this.inExpandAction && this.collapsed
    },

    shouldPrepareCollapse: function(props, state){
        return props.collapsed && this.isMounted() && !this.inCollapseAction && !this.collapsed
    },

    prepareExpandStyle: function(style, props, state){
        if (this.shouldPrepareExpand(props, state)){
            //we set the height to the current height
            style.height   = this.getDOMNode().offsetHeight
            style.overflow = 'hidden'
            style.flex = 'none'

            setTimeout(function(){
                if (!this.isMounted()){
                    return
                }
                this.inExpandAction = true
                this.setState({
                    expanding    : true,
                    collapsing   : false,
                    transitioning: true
                })
            }.bind(this), 0)
        }

        if (this.inExpandAction){
            //after height was set to current current height
            //we set the height to the new height to which we have to expand
            style.height   = this.getDOMNode().scrollHeight
            style.overflow = 'hidden'
            this.inExpandAction = false
        }

        // if (state.expanding){
        //     style.flex = 'none'
        // }
    },

    prepareCollapseStyle: function(style, props, state){
        if (this.shouldPrepareCollapse(props, state)){
            style.height = this.getDOMNode().offsetHeight
            style.overflow = 'hidden'
            style.flex = 'none'

            setTimeout(function(){
                if (!this.isMounted()){
                    return
                }
                this.inCollapseAction = true
                this.setState({
                    collapsing   : true,
                    expanding    : false,
                    transitioning: true
                })
            }.bind(this), 0)
        }

        if (this.inCollapseAction){
            style.height = this.refs.title.getDOMNode().offsetHeight
            style.overflow = 'hidden'
            style.flex = 'none'
            this.inCollapseAction = false
        }

        if (props.collapsed || state.collapsing){
            style.flex = 'none'
        }
    },

    prepareStyle: function(props, state) {
        var style = assign({}, props.defaultStyle, prefixer({
            transition: props.transitionDuration? ('height ' + props.transitionDuration): 'none'
        }), props.style)

        this.prepareExpandStyle(style, props, state)
        this.prepareCollapseStyle(style, props, state)

        return style
    },

    prepareTitleStyle: function(props, state) {
        return assign({}, props.defaultTitleStyle, props.titleStyle)
    },

    render: function() {
        var props = this.prepareProps(this.props, this.state)
        var title = this.renderTitle(props, this.state)
        var body  = this.renderBody(props, this.state)

        this.collapsed = props.collapsed

        return React.createElement("div", React.__spread({},  props, {title: null}), 
                title, 
                body
            )
    },

    renderTitle: function(props, state) {

        var title = props.title || 'Untitled'

        if (typeof title == 'string'){
            title = React.createElement("span", {style: {}}, title)
        }

        title.props.style = title.props.style || {}
        title.props.style.flex = 1

        var titleProps = {
            ref     : 'title',
            style   : props.titleStyle,
            children: [
                title,
                this.renderExpandTool(props)
            ],
            onClick: props.onTitleClick
        }
        return props.titleFactory?
                        props.titleFactory(titleProps):
                        React.createElement("div", React.__spread({},  titleProps))
    },

    renderExpandTool: function(props) {
        var tool

        if (props.expandTool){
            var expandToolProps = {
                style    : getExpandToolStyle(props),
                collapsed: props.collapsed,
                children : '▾'
            }

            if (props.expandTool === true){
                tool = React.createElement("span", React.__spread({},  expandToolProps))
            } else {
                tool = typeof props.expandTool == 'function'?
                            props.expandTool(expandToolProps):
                            props.expandTool
            }
        }

        return tool
    },

    prepareBodyStyle: function(props, state) {
        var bodyStyle = assign({}, props.defaultBodyStyle, props.bodyStyle)

        if (this.shouldPrepareCollapse(props, state) || this.shouldPrepareExpand(props, state)){
            return bodyStyle
        }

        if (props.collapsed && !state.collapsing){
            bodyStyle.height  = 0
            bodyStyle.padding = 0
            bodyStyle.margin  = 0
            bodyStyle.border  = 0
            bodyStyle.overflow = 'hidden'
        }

        return bodyStyle
    },

    renderBody: function(props, state) {
        var bodyProps = {
            style   : props.bodyStyle,
            children: props.children,
            ref     : 'body'
        }

        return props.bodyFactory?
                    props.bodyFactory(bodyProps):
                    React.createElement("div", React.__spread({},  bodyProps))
    }
})