'use strict';

var React  = require('react')
var assign = require('object-assign')

function emptyFn(){}

var Item = require('./AccordionItem')

var Accordion = React.createClass({

    displayName: 'ReactAccordion',

    getDefaultProps: function() {
        return {
            defaultActiveIndex : 0,
            exclusive   : false,
            defaultStyle: {
                position     : 'relative',
                flexDirection: 'column',
                overflow     : 'hidden'
            }
        }
    },

    getInitialState: function() {
        return {
            defaultActiveIndex: this.props.defaultActiveIndex
        }
    },

    render: function(){

        var props = this.prepareProps(this.props, this.state)

        return <div {...props} />
    },

    prepareProps: function(thisProps, state) {

        var props = {}

        assign(props, thisProps)

        props.activeIndex = this.prepareActiveIndex(props, state)

        props.className = this.prepareClassName(props, state)
        props.style     = this.prepareStyle(props, state)
        props.children  = this.prepareChildren(props, state)

        return props
    },

    prepareActiveIndex: function(props, state) {
        var activeIndex = props.activeIndex == null?
                            state.defaultActiveIndex:
                            props.activeIndex

        if (!props.exclusive && typeof activeIndex != 'object'){
            var tmp = activeIndex

            activeIndex = {}
            activeIndex[tmp] = true
        }

        if (props.exclusive && typeof activeIndex == 'object'){
            //activeIndex is an object, we need to convert to number/string
            activeIndex = Object.keys(activeIndex)[0]
        }

        return activeIndex
},

    prepareChildren: function(props, state) {

        return React.Children.map(
                props.children,
                this.createItem.bind(this, props)
            )
    },

    createItem: function(props, item, index, arr) {

        var children = item.props.children
        var title    = item.props['data-title']
        var body     = children? children: item

        if (!title && children && children.length){
            title = children[0]
            body  = children.slice(1)

        }

        var collapsed = this.isCollapsed(index, props)

        var itemProps = assign({}, item.props, {
            index: index,
            expandTool  : props.expandTool,
            collapsed   : collapsed,

            title       : title,
            children    : body,

            titleStyle  : props.titleStyle,
            bodyStyle   : props.bodyStyle,

            style       : props.itemStyle,

            titleFactory: props.titleFactory,
            bodyFactory : props.bodyFactory,

            transitionDuration          : props.transitionDuration,
            expandToolTransitionDuration: props.expandToolTransitionDuration,
            onTitleClick : function(event){
                var res = (item.props.onTitleClick || emptyFn)(event)

                if (res !== false){
                    this.handleTitleClick(props, index, event)
                }
            }.bind(this),
            onTransitionEnd: function(event){
                ;(item.props.onTransitionEnd || emptyFn)(event)
            }.bind(this)
        })

        return props.itemFactory?
                props.itemFactory(itemProps, index, arr) || <Item {...itemProps} />:
                <Item {...itemProps} />
    },

    isCollapsed: function(index, props) {
        var collapsed = false

        if (props.exclusive){
            collapsed = index != props.activeIndex
        } else {
            collapsed = !props.activeIndex[index]
        }

        return collapsed
    },

    handleTitleClick: function(props, index) {
        this.toggleAt(index)
    },

    toggleAt: function(index) {
        var props = this.props

        ;(props.onChange || emptyFn)(index, props)

        if (props.activeIndex == null){

            var newActiveIndex = index

            if (!this.props.exclusive){
                newActiveIndex = assign({}, this.state.defaultActiveIndex)
                newActiveIndex[index] = !newActiveIndex[index]
            }

            this.setState({
                defaultActiveIndex: newActiveIndex
            })
        }
    },

    prepareStyle: function(props, state) {

        var style = {}

        assign(style, props.defaultStyle, props.style)

        return style
    },

    prepareClassName: function(props, state) {
        var className = props.className || ''

        return className
    }

})

Accordion.Item = Item
module.exports = Accordion