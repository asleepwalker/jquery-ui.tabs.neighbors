/*
*	jQueryUI.Tabs.Neighbors, v1.0.0
*	(c) 2014–2015 Artyom "Sleepwalker" Fedosov <mail@asleepwalker.ru>
*	https://github.com/asleepwalker/jquery-ui.tabs.neighbors.js
*/

(function($) {

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
		_create: function() {
			var _this = this,
				s,
				_widget = _this.widget(),
				isAutoplayPaused = true,
				timeoutMsec = 1000 * _this.options.autoplayTimeout,
				timeoutID;

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

			_widget.on("tabscreate", function() {
				if (timeoutMsec > 1000){
					isAutoplayPaused = false;
					timeoutID = window.setTimeout(next, timeoutMsec);
				}
			});

			_widget.on("tabsbeforeactivate", function() {
				window.clearTimeout(timeoutID);
			});

			_widget.on("tabsactivate", function() {
				if( !isAutoplayPaused ){
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
		pause: function() {
			// $('#tabs').tabs('pause')
			this.pauseAutoplay();
		}
	});

})(jQuery);
