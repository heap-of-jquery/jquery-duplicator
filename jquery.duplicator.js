function duplicable(selector, max) {
  jQuery(selector).parent().on('keyup', selector, (function() {
    var empties = false;
    // search through and find empties.
    jQuery(selector).each(function() {
      // TODO: allow variable definitions of empty
      if(jQuery(this).val() == '') {
        if(!empties) {
          empties = true;
          return;
        } else {
          jQuery(this).remove();
        }
      }
    });

    if(!empties) {
      // TODO: allow parent groups (for duplicating groups of values or for duplicating UI to go with the field) and inserting in different places as appropriate.
      if(!max || jQuery(selector).length < max)
      {
        var thing = jQuery(selector).filter(':first').clone().val('');
        thing.insertAfter(jQuery(selector).filter(':last'));
      }
    }
  }));
}
