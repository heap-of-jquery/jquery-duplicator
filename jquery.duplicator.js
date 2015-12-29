(function($) {
	var methods = {
		init : function(selector, options) {
			var defaults = {
				max: undefined,
				after: false,
				empty: function(selected) {
					return (selected.is(":input") && selected.val() == "") || selected.find(":input").val() == ""
				}
			};
			var settings = $.extend({}, defaults, options);

			$(selector).parent().on('keyup', selector, function () {

				var empties = false;
				// search through and find empties.
				$(selector).each(function () {
					if (settings.empty($(this))) {
						if (!empties) {
							empties = true;
							return;
						} else {
							$(this).remove();
							if (settings.after)
								settings.after();
						}
					}
				});


				if (!empties) {
					// TODO: allow parent groups (for duplicating groups of values or for duplicating UI to go with the field) and inserting in different places as appropriate.
					if ((settings.max == undefined) || $(selector).length < settings.max) {
						var thing = $(selector).filter(':last').clone().css({'z-index': 1});
						if (thing.is(":input"))
							thing.val('');
						else
							thing.find(":input").val('');

						thing.insertAfter($(selector).filter(':last'));
						if (settings.after) {
							settings.after();
						}
					}

				}
			});
		},

		add : function(selector, value) {
			// TODO: generalize this a bit. right now, it assumes the duplicable is a textarea. Can at least make it :input?

			var thing = $(selector).filter(":last").clone()
			thing.find('textarea').val(value);
			//thing.find(".iterative-message").find(".message").addClass(messageclass).html(messagestring);
			thing.insertAfter($(selector).filter(":last"));
			$(selector).parent().find(selector).trigger("keyup");
		},

		resort : function(selector) {
			// search through and find empties.
			var empties = false;

			if ($(selector).length <= 1)
				return;

			$(selector).each(function () {
				if ($(this).val() == '') {
					$(this).remove();
					return;
				}
			});

			$(selector).parent().find(selector).trigger("keyup");
		}
	};

	$.duplicable = function(methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			// Default to "init"
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.duplicable' );
		}
	};
})(jQuery);
