function duplicable(class, max) {
  jQuery(class).parent().on('keyup', class, (function() {
    var empties = false;
    // search through and find empties.
    jQuery(class).each(function() {
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
      if(!max || jQuery(class).length < max)
      {
        var thing = jQuery(class).find(':first').clone().val('');
        thing.insertAfter(jQuery(class).find(':last'));
      }
    }
  }));
}
