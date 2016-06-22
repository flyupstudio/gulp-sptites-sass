jQuery(function() {
    jQuery.fn.autoClear = function () {
		 if ($(this).is("input")) {
			// сохраняем во внутреннюю переменную текущее значение
			jQuery(this).each(function() {
				jQuery(this).data("autoclear", jQuery(this).attr("value"));
			});
			jQuery(this)
				.bind('focus', function() {   // обработка фокуса
					if (jQuery(this).attr("value") == jQuery(this).data("autoclear")) {
						jQuery(this).attr("value", "").addClass('autoclear-normalcolor');
					}
				})
				.bind('blur', function() {    // обработка потери фокуса
					if (jQuery(this).attr("value") == "") {
						jQuery(this).attr("value", jQuery(this).data("autoclear")).removeClass('autoclear-normalcolor');
					}
				});
			return jQuery(this);
		}
		
		if ($(this).is("textarea")) {
			// сохраняем во внутреннюю переменную текущее значение
			jQuery(this).each(function() {
				jQuery(this).data("autoclear", jQuery(this).text());
			});
			jQuery(this)
				.bind('focus', function() {   // обработка фокуса
					if (jQuery(this).text() == jQuery(this).data("autoclear")) {
						jQuery(this).text("").addClass('autoclear-normalcolor');
					}
				})
				.bind('blur', function() {    // обработка потери фокуса
					if (jQuery(this).text() == "") {
						jQuery(this).text(jQuery(this).data("autoclear")).removeClass('autoclear-normalcolor');
					}
				});
			return jQuery(this);
		}
		
    }
});