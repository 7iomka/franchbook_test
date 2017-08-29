/**
	 * @param   {object} props   Object with properties and number values
	 * @param   {object} options Object with options. Defaults:
	 *                           duration: 400,
	 *                           easing: easeInOut,
	 *                           queue: true,
	 *                           step: function(progress, element, value) {},
	 *                           complete: function (elements) {}
	 * @returns {object} Object/jQuery object
	 */
	;
	(function (global, window, document, undefined) {
		'use strict';

		/**
		 * @private
		 * Plugin name var
		 */
		var pluginName = 'smoothAnimate',
			/**
			 * Default settings
			 */
			defaults = {
				duration: 400,
				easing: 'easeInOut',
				step: function (progress, element, value) {},
				complete: function (elements) {},
				queue: true
			};

		/**
		 * @private
		 * Parse numeric value/units
		 * @param   {string} value String to parse
		 * @returns {Array}        [originalString, operator, numeric value, units]
		 */
		function parseValue(value) {
			return value.toString().match(/^(\+\=|\-\=|\*\=|\/\=)?([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/i);
		}

		/**
		 * @private
		 * Retrieve unit type for simple properties. Used when one is not supplied by user
		 * @param   {string} property Property name in camelCase notation
		 * @returns {string}          Unit type
		 */
		function setUnitType(property) {
			property = normalizeProperty(property);
			if (/(^(zIndex|fontWeight|opacity)$)/.test(property)) return '';
			return 'px';
		}

		/**
		 * @private
		 * Normalize css property's name to camelCase
		 * @param   {string} property Property name
		 * @returns {string} camelCase name
		 */
		function normalizeProperty(property) {
			return property.replace(/-(\w)/g, function (match, subMatch) {
				return subMatch.toUpperCase();
			});
		}

		/**
		 * @private
		 * Generate easing from bezier coordinates
		 * @param   {String|Array} funcName/coordArr  String with easing function name/array with bezier coords
		 * @param   {string}       predefinedFuncName Name for new easing function to create
		 * @returns {function}     Easing function
		 */
		function bezier(funcName, coordArr, predefinedFuncName) {
			if (Array.isArray(funcName)) {
				coordArr = funcName;

				if (predefinedFuncName) funcName = predefinedFuncName;
				else funcName = pluginName + '_' + coordArr.join('_').replace(/\./g, 'd').replace(/\-/g, 'm');
			}
			if (typeof $.easing[funcName] !== 'function') {
				var newBezFunc = function (progress, cX1, cY1, cX2, cY2) {

					function A(a1, a2) {
						return 1 - 3 * a2 + 3 * a1;
					}

					function B(a1, a2) {
						return 3 * a2 - 6 * a1;
					}

					function C(a1) {
						return 3 * a1;
					}

					function calcBezier(t, a1, a2) {
						return ((A(a1, a2) * t + B(a1, a2)) * t + C(a1)) * t;
					}

					function slopeGet(t, a1, a2) {
						return 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + C(a1);
					}

					function tForX(progress) {
						var aT = progress,
							i;
						for (i = 0; i < 14; ++i) {
							var currSlope = slopeGet(aT, cX1, cX2);
							if (currSlope === 0) return aT;
							var currX = calcBezier(aT, cX1, cX2) - progress;
							aT -= currX / currSlope;
						}
						return aT;
					}
					return calcBezier(tForX(progress), cY1, cY2);
				};

				$.easing[funcName] = function (x, t, b, c, d) {
					return c * newBezFunc(x, coordArr[0], coordArr[1], coordArr[2], coordArr[3]) + b;
				};
			}
			return funcName;
		}

		/**
		 * @public
		 * Predefined easings
		 */
	[
			['ease', [0.25, 0.1, 0.25, 1]],
			['easeIn', [0.42, 0, 1, 1]],
			['easeOut', [0, 0, 0.58, 1]],
			['easeInOut', [0.42, 0, 0.58, 1]],
			['easeInSine', [0.47, 0, 0.745, 0.715]],
			['easeOutSine', [0.39, 0.575, 0.565, 1]],
			['easeInOutSine', [0.445, 0.05, 0.55, 0.95]],
			['easeInQuad', [0.55, 0.085, 0.68, 0.53]],
			['easeOutQuad', [0.25, 0.46, 0.45, 0.94]],
			['easeInOutQuad', [0.455, 0.03, 0.515, 0.955]],
			['easeInCubic', [0.55, 0.055, 0.675, 0.19]],
			['easeOutCubic', [0.215, 0.61, 0.355, 1]],
			['easeInOutCubic', [0.645, 0.045, 0.355, 1]],
			['easeInQuart', [0.895, 0.03, 0.685, 0.22]],
			['easeOutQuart', [0.165, 0.84, 0.44, 1]],
			['easeInOutQuart', [0.77, 0, 0.175, 1]],
			['easeInQuint', [0.755, 0.05, 0.855, 0.06]],
			['easeOutQuint', [0.23, 1, 0.32, 1]],
			['easeInOutQuint', [0.86, 0, 0.07, 1]],
			['easeInExpo', [0.95, 0.05, 0.795, 0.035]],
			['easeOutExpo', [0.19, 1, 0.22, 1]],
			['easeInOutExpo', [1, 0, 0, 1]],
			['easeInCirc', [0.6, 0.04, 0.98, 0.335]],
			['easeOutCirc', [0.075, 0.82, 0.165, 1]],
			['easeInOutCirc', [0.785, 0.135, 0.15, 0.86]],
			['easeInBack', [0.6, -0.28, 0.735, 0.045]],
			['easeOutBack', [0.175, 0.885, 0.32, 1.275]],
			['easeInOutBack', [0.68, -0.49, 0.265, 1.55]]
	].forEach(function (easing) {
			if (!$.easing[easing[0]]) {
				bezier(easing[1], null, easing[0]);
			}
		});

		/**
		 * @public
		 * @constructor
		 * @param {object} elements Element(s)
		 * @param {object} props    Object with properties to animate
		 * @param {object} options  Options object
		 */
		var SmoothAnimate = function (elements, props, options) {
			this.props = props;
			this.elements = elements;
			this.options = $.extend({}, defaults, options);
			this._init();
		};

		/**
		 * SmoothAnimate prototype
		 */
		SmoothAnimate.prototype = {
			/**
			 * @private
			 * Initialization
			 */
			_init: function () {
				this.start = Date.now();
				this._prepare();
				this._loop();
			},

			/**
			 * @private
			 * Preparing to animate
			 */
			_prepare: function () {
				this.options.easing = typeof this.options.easing === 'string' ? this.options.easing : bezier(this.options.easing);
				this.length = this.elements.length;
				this.properties = Object.create(null);
				var i;

				for (i = 0; i < this.length; i++) {
					var values = Object.create(null),
						property;

					for (property in this.props) {
						if (this.props.hasOwnProperty(property)) {

							var fromVal,
								toVal,
								getVal,
								getVal2,
								units,
								operator;

							if (Array.isArray(this.props[property])) {
								getVal = parseValue(this.props[property][0]);
								getVal2 = parseValue(this.props[property][1]);

								fromVal = +getVal[2];
								toVal = +getVal2[2];
								units = getVal[3] || getVal2[3] || setUnitType(property);
							} else {
								getVal = parseValue(this.props[property]);

								toVal = +getVal[2];
								operator = getVal[1];
								units = getVal[3] || setUnitType(property);

								if (property === 'scrollTop' || property === 'scrollLeft') {
									fromVal = _scroll;
								} else {
									fromVal = parseFloat(getComputedStyle(this.elements[i])[property]) || 0;
								}

								switch (operator) {
									case '+=':
										toVal = fromVal + toVal;
										break;
									case '-=':
										toVal = fromVal - toVal;
										break;
									case '*=':
										toVal = fromVal * toVal;
										break;
									case '/=':
										toVal = fromVal / toVal;
								}

							}
							values[property] = {
								from: fromVal,
								to: toVal,
								units: units
							};
						}
					}
					this.properties[i] = values;
				}
			},

			/**
			 * @private
			 * Animation loop
			 */
			_loop: function () {
				var _this = this,
					timePassed = Date.now() - this.start,
					progress = timePassed / this.options.duration,
					value,
					i,
					property;

				if (progress > 1) {
					progress = 1;
					timePassed = this.options.duration;
				}

				for (i = 0; i < this.length; i++) {
					for (property in this.props) {
						if (this.props.hasOwnProperty(property)) {

							if (this.options.easing === 'linear') {
								value = this.properties[i][property].from + progress * (this.properties[i][property].to - this.properties[i][property].from);
							} else {
								value = $.easing[this.options.easing](progress, timePassed, this.properties[i][property].from, this.properties[i][property].to - this.properties[i][property].from, this.options.duration);
							}

							//Special animated properties
							if (property === 'scrollTop') {
								window.scrollTo(0, value);
								continue;
							} else if (property === 'scrollLeft') {
								window.scrollTo(value, 0);
								continue;
							}
							if (property === 'value') {
								continue;
							}

							//skip DOM update if it is not needed
							if (this.properties[i][property].to === this.properties[i][property].from) continue;

							//set style properties
							this.elements[i].style[property] = value + this.properties[i][property].units;
						}
					}
					//call step function
					this.options.step(progress, this.elements[i], value); //value of the last property
				}

				if (timePassed < this.options.duration) {
					requestAnimationFrame(function () {
						_this._loop();
					});
				} else {
					this.elements[this.length - 1].removeAttribute('data-smooth-animate');

					this.options.complete(this.elements);

					queue.run(this.elements);
				}
			}
		};


		/**
		 * @private
		 * @decorator
		 * @param   {function} func Function
		 * @returns {object} New instance
		 */
		function constructorDecorator(func) {
			return function () {
				var elems = arguments[0].length ? arguments[0] : [arguments[0]],
					instance = elems[elems.length - 1].getAttribute('data-smooth-animate');

				if (instance === 'running') {
					queue.add(elems[elems.length - 1], arguments[1], arguments[2]);
				} else {
					instance = new func(elems, arguments[1], arguments[2]);
					//if the queue is enabled - set flag that we started to prevent new calls on these elems
					//and pass them to queue
					if (instance.options.queue) {
						elems[elems.length - 1].setAttribute('data-smooth-animate', 'running');
					}
					return instance;
				}
			};
		}
		SmoothAnimate = constructorDecorator(SmoothAnimate);

		/**
		 * Queue of calls
		 */
		var queue = {
			calls: [],

			add: function (el, props, options) {
				this.calls.push([el, props, options]);
			},

			run: function (elems) {
				var lastElCall = elems[elems.length - 1],
					len = this.calls.length,
					i;

				for (i = 0; i < len; i++) {
					var lastElQueue = this.calls[i][0];

					if (lastElCall === lastElQueue) {
						SmoothAnimate(elems, this.calls[i][1], this.calls[i][2]);
						//remove current call from queue
						this.calls.splice(i, 1);
						return;
					}
				}
			}
		};
		SmoothAnimate.queue = queue;

		/**
		 * Make jQuery plugin
		 */
		if (window.jQuery) {
			$.fn[pluginName] = function (props, options) {
				SmoothAnimate(this, props, options);
				return this;
			};
		}

		//Globalize SmoothAnimate
		window.SmoothAnimate = SmoothAnimate;

	})((window.jQuery || window), window, document);
