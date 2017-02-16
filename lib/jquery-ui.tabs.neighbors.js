/*
*	jQueryUI.Tabs.Neighbors, v1.0.3
*	(c) 2014–2017 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/jquery-ui.tabs.neighbors.js
*/

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function (root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
}(function ($) {

	var originalCreate = $.ui.tabs.prototype._create;

	function openSibling(goingForward) {
		var target = this.options.active + (goingForward ? 1 : -1);
		this._activate(this._findNextTab(target, goingForward));
	}

	$.extend($.ui.tabs.prototype, {
		autoplayTimeout: 0,
		neighbors: {
			prev: false,
			next: false
		},
		_create: function () {
			var _this = this;
			var s;
			var _widget = _this.widget();
			var isAutoplayPaused = true;
			var timeoutMsec = 1000 * _this.options.autoplayTimeout;
			var timeoutID;

			originalCreate.call(_this);

			this.pauseAutoplay = pauseAutoplay;

			if (typeof _this.options.neighbors != 'undefined') {
				s = _this.options.neighbors;
				if (s.prev && s.prev instanceof $) {
					s.prev.on('click', clickPrev);
				}
				if (s.next && s.next instanceof $) {
					s.next.on('click', clickNext);
				}
			}

			if (timeoutMsec > 1000) {
				isAutoplayPaused = false;
				timeoutID = window.setTimeout(next, timeoutMsec);
			}

			_widget.on('tabsbeforeactivate', function () {
				window.clearTimeout(timeoutID);
			});

			_widget.on('tabsactivate', function () {
				if (!isAutoplayPaused) {
					timeoutID = window.setTimeout(next, timeoutMsec);
				}
			});

			function clickPrev() {
				//pauseAutoplay();
				prev();
			}

			function clickNext() {
				//pauseAutoplay();
				next();
			}

			function next() {
				openSibling.call(_this, true);
			}

			function prev() {
				openSibling.call(_this, false);
			}

			function pauseAutoplay() {
				window.clearTimeout(timeoutID);
				if (!isAutoplayPaused) {
					isAutoplayPaused = true;
					_widget.trigger('tabspaused');
				}
			}

		},
		pause: function () {
			// $('#tabs').tabs('pause')
			this.pauseAutoplay();
		}
	});

}));
