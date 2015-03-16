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
		neighbors: {
			prev: false,
			next: false
		},
		_create: function() {
			var _this = this,
				s;

			originalCreate.call(_this);

			if (typeof _this.options.neighbors != 'undefined') {
				s = _this.options.neighbors;
				if (s.prev && s.prev instanceof $) {
					s.prev.on('click', function() {
						openSibling.call(_this, false);
					});
				}
				if (s.next && s.next instanceof $) {
					s.next.on('click', function() {
						openSibling.call(_this, true);
					});
				}
			}
		}
	});

})(jQuery);
