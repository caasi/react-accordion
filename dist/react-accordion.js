(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactAccordion"] = factory(require("React"));
	else
		root["ReactAccordion"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(3)
	var prefixer = __webpack_require__(4)

	function emptyFn(){}

	var Item = __webpack_require__(2)

	var Accordion = React.createClass({

	    displayName: 'ReactAccordion',

	    getDefaultProps: function() {
	        return {
	            defaultActiveIndex : 0,
	            exclusive   : true,

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

	        return React.createElement("div", React.__spread({},  props))
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
	            index       : index,
	            expandTool  : props.expandTool,
	            expandToolStyle: props.expandToolStyle,
	            collapsed   : collapsed,

	            title       : title,
	            children    : body,

	            titleStyle  : props.titleStyle,
	            bodyStyle   : assign({}, props.bodyStyle),

	            style       : assign({}, props.itemStyle, item.props.style),

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
	                props.itemFactory(itemProps, index, arr) || React.createElement(Item, React.__spread({},  itemProps)):
	                React.createElement(Item, React.__spread({},  itemProps))
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
	                var defaultActiveIndex = this.state.defaultActiveIndex
	                var defaultIndex       = defaultActiveIndex

	                if (typeof defaultIndex == 'string' || typeof defaultIndex == 'number'){
	                    defaultIndex = {}
	                    defaultIndex[defaultActiveIndex] = true
	                }

	                newActiveIndex = assign({}, defaultIndex)
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

	        return prefixer(style)
	    },

	    prepareClassName: function(props, state) {
	        var className = props.className || ''

	        return className
	    }

	})

	Accordion.Item = Item
	module.exports = Accordion

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(3)
	var transitionend = __webpack_require__(5)
	var prefixer = __webpack_require__(4)

	function getExpandToolStyle(props){
	    var style = {
	        transition: 'all ' + props.expandToolTransitionDuration
	    }

	    if (!props.collapsed){
	        style.transform = 'rotate(-180deg)'
	    }

	    return prefixer(style)
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
	                // fontSize     : '2em',
	                fontWeight   : 'bold',
	                display      : 'flex',
	                flexDirection: 'row',
	                alignItems   : 'center',
	                cursor       : 'pointer',
	                boxSizing    : 'border-box',
	                flex: 'none'
	            },

	            defaultBodyStyle: {
	                overflow: 'auto',
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
	        this.getDOMNode().addEventListener(transitionend, this.onTransitionEnd)
	    },

	    componentWillUnmount: function() {
	        this.getDOMNode().removeEventListener(transitionend, this.onTransitionEnd)
	    },

	    onTransitionEnd: function(event) {
	        if (this.props.transitionDuration && event.target == this.getDOMNode()){
	            this.endTransition()
	        }
	    },

	    endTransition: function(){
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
	        if (!props.transitionDuration){
	            return
	        }

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
	    },

	    prepareCollapseStyle: function(style, props, state){
	        if (props.transitionDuration){

	            if (this.shouldPrepareCollapse(props, state)){
	                style.height   = this.getDOMNode().offsetHeight
	                style.overflow = 'hidden'
	                style.flex     = 'none'

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
	            } else if (this.inCollapseAction || state.collapsing){
	                style.height          = this.refs.title.getDOMNode().offsetHeight
	                style.overflow        = 'hidden'
	                style.flex            = 'none'
	                this.inCollapseAction = false
	            }
	        }

	        if (props.collapsed || state.collapsing){
	            style.flex = 'none'
	        }
	    },

	    prepareBodyStyle: function(props, state) {
	        var bodyStyle = assign({}, props.defaultBodyStyle, props.bodyStyle)

	        if (props.transitionDuration && (this.shouldPrepareCollapse(props, state) || this.shouldPrepareExpand(props, state))){
	            return bodyStyle
	        }

	        if (props.collapsed && !state.collapsing){
	            bodyStyle.height  = 0
	            bodyStyle.padding = 0
	            bodyStyle.margin  = 0
	            bodyStyle.border  = 0
	            bodyStyle.overflow = 'hidden'
	        }

	        return prefixer(bodyStyle)
	    },

	    prepareStyle: function(props, state) {
	        var style = assign({}, props.defaultStyle, {
	            transition: props.transitionDuration? ('height ' + props.transitionDuration): 'none'
	        }, props.style)

	        this.prepareExpandStyle(style, props, state)
	        this.prepareCollapseStyle(style, props, state)

	        return prefixer(style)
	    },

	    prepareTitleStyle: function(props, state) {
	        return prefixer(assign({}, props.defaultTitleStyle, props.titleStyle))
	    },

	    render: function() {
	        var props = this.prepareProps(this.props, this.state)
	        var title = this.renderTitle(props, this.state)
	        var body  = this.renderBody(props, this.state)

	        this.collapsed = props.collapsed
	        this.renderWhileCollapsing = false

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
	                style    : prefixer(assign({}, props.expandToolStyle, getExpandToolStyle(props))),
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hasOwn      = __webpack_require__(6)
	var getPrefixed = __webpack_require__(7)

	var map      = __webpack_require__(8)
	var plugable = __webpack_require__(9)

	function plugins(key, value){

		var result = {
			key  : key,
			value: value
		}

		;(RESULT.plugins || []).forEach(function(fn){

			var tmp = map(function(res){
				return fn(key, value, res)
			}, result)

			if (tmp){
				result = tmp
			}
		})

		return result
	}

	function normalize(key, value){

		var result = plugins(key, value)

		return map(function(result){
			return {
				key  : getPrefixed(result.key, result.value),
				value: result.value
			}
		}, result)

		return result
	}

	var RESULT = function(style){
		var k
		var item
		var result = {}

		for (k in style) if (hasOwn(style, k)){
			item = normalize(k, style[k])

			if (!item){
				continue
			}

			map(function(item){
				result[item.key] = item.value
			}, item)
		}

		return result
	}

	module.exports = plugable(RESULT)

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Transition-end mapping
	 */

	var map = {
	  'WebkitTransition' : 'webkitTransitionEnd',
	  'MozTransition' : 'transitionend',
	  'OTransition' : 'oTransitionEnd',
	  'msTransition' : 'MSTransitionEnd',
	  'transition' : 'transitionend'
	};

	/**
	 * Expose `transitionend`
	 */

	var el = document.createElement('p');

	for (var transition in map) {
	  if (null != el.style[transition]) {
	    module.exports = map[transition];
	    break;
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(obj, prop){
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getStylePrefixed = __webpack_require__(10)
	var properties       = __webpack_require__(11)

	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		return getStylePrefixed(key, value)
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(fn, item){

		if (!item){
			return
		}

		if (Array.isArray(item)){
			return item.map(fn).filter(function(x){
				return !!x
			})
		} else {
			return fn(item)
		}
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getCssPrefixedValue = __webpack_require__(12)

	module.exports = function(target){
		target.plugins = target.plugins || [
			(function(){
				var values = {
					'flex':1,
					'inline-flex':1
				}

				return function(key, value){
					if (key === 'display' && value in values){
						return {
							key  : key,
							value: getCssPrefixedValue(key, value)
						}
					}
				}
			})()
		]

		target.plugin = function(fn){
			target.plugins = target.plugins || []

			target.plugins.push(fn)
		}

		return target
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(13)
	var getPrefix    = __webpack_require__(14)
	var el           = __webpack_require__(15)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key// + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed

	    if (!(key in STYLE)){//we have to prefix

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = prefix + toUpperFirst(key)

	            if (prefixed in STYLE){
	                key = prefixed
	            }
	        }
	    }

	    MEMORY[k] = key

	    return key
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  'alignItems': 1,
	  'justifyContent': 1,
	  'flex': 1,
	  'flexFlow': 1,

	  'userSelect': 1,
	  'transform': 1,
	  'transition': 1,
	  'transformOrigin': 1,
	  'transformStyle': 1,
	  'transitionProperty': 1,
	  'transitionDuration': 1,
	  'transitionTimingFunction': 1,
	  'transitionDelay': 1,
	  'borderImage': 1,
	  'borderImageSlice': 1,
	  'boxShadow': 1,
	  'backgroundClip': 1,
	  'backfaceVisibility': 1,
	  'perspective': 1,
	  'perspectiveOrigin': 1,
	  'animation': 1,
	  'animationDuration': 1,
	  'animationName': 1,
	  'animationDelay': 1,
	  'animationDirection': 1,
	  'animationIterationCount': 1,
	  'animationTimingFunction': 1,
	  'animationPlayState': 1,
	  'animationFillMode': 1,
	  'appearance': 1
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrefix     = __webpack_require__(14)
	var forcePrefixed = __webpack_require__(16)
	var el            = __webpack_require__(15)

	var MEMORY = {}
	var STYLE = el.style

	module.exports = function(key, value){

	    var k = key + ': ' + value

	    if (MEMORY[k]){
	        return MEMORY[k]
	    }

	    var prefix
	    var prefixed
	    var prefixedValue

	    if (!(key in STYLE)){

	        prefix = getPrefix('appearance')

	        if (prefix){
	            prefixed = forcePrefixed(key, value)

	            prefixedValue = '-' + prefix.toLowerCase() + '-' + value

	            if (prefixed in STYLE){
	                el.style[prefixed] = ''
	                el.style[prefixed] = prefixedValue

	                if (el.style[prefixed] !== ''){
	                    value = prefixedValue
	                }
	            }
	        }
	    }

	    MEMORY[k] = value

	    return value
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function(str){
		return str?
				str.charAt(0).toUpperCase() + str.slice(1):
				''
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(13)
	var prefixes     = ["ms", "Moz", "Webkit", "O"]

	var el = __webpack_require__(15)

	var PREFIX

	module.exports = function(key){

		if (PREFIX){
			return PREFIX
		}

		var i = 0
		var len = prefixes.length
		var tmp
		var prefix

		for (; i < len; i++){
			prefix = prefixes[i]
			tmp = prefix + toUpperFirst(key)

			if (typeof el.style[tmp] != 'undefined'){
				return PREFIX = prefix
			}
		}
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var el

	if(!!global.document){
	  	el = global.document.createElement('div')
	}

	module.exports = el
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toUpperFirst = __webpack_require__(13)
	var getPrefix    = __webpack_require__(14)
	var properties   = __webpack_require__(11)

	/**
	 * Returns the given key prefixed, if the property is found in the prefixProps map.
	 *
	 * Does not test if the property supports the given value unprefixed.
	 * If you need this, use './getPrefixed' instead
	 */
	module.exports = function(key, value){

		if (!properties[key]){
			return key
		}

		var prefix = getPrefix(key)

		return prefix?
					prefix + toUpperFirst(key):
					key
	}

/***/ }
/******/ ])
});
