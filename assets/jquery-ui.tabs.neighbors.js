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
			var widget = this,
				s;
			
			originalCreate.call(widget);

			if (s = widget.options.neighbors) {
				if (s.prev && s.prev instanceof $) {
					s.prev.on('click', function() {
						openSibling.call(widget, false);
					});
				}
				if (s.next && s.next instanceof $) {
					s.next.on('click', function() {
						openSibling.call(widget, true);
					});
				}
			}
		}
	});

})(jQuery);
