/* setviewport v1.00, by Joe Komenda (Komejo). Copyright 2013, MIT Licence.

  This script looks for a cookie, using the function readCookie().
  If it does not find it (or it is expired), it calls a modal
  window (id = agemodal). If you correctly submit the form,
  it sets a cookie with the appropriate expiry.
*/
jQuery(document).ready(function() {

    var agemodal = "#agemodal",
        formsubmit = "#formsubmit",
        modalContent = "#content",
        agecookie = 'jqverify';

    if (!readCookie( agecookie)) {
        jQuery(agemodal).fadeIn();
    } else {
        jQuery(modalContent).fadeIn();
    }

    jQuery(formsubmit).on('click', function(event){
      var day, month, year, age, remember, mydate, currdate;

        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }

        day = jQuery("#day").val() ? jQuery("#day").val() : 'notset';
        month = jQuery("#month").val() ? jQuery("#month").val() : 'notset';
        year = jQuery("#year").val() ? jQuery("#year").val() : 'notset';
        age = jQuery("#location").val();
        remember = jQuery("#remember").is(':checked') ? 'checked' : false;

        mydate = new Date();
        mydate.setFullYear(year, month-1, day);
        currdate = new Date();
        currdate.setFullYear(currdate.getFullYear() - age);

        if (day == 'notset' || month == 'notset' || year == 'notset' ) {
            alert("Please enter your birthdate.");
            return false;
        } else if (age == 99 ) {
            alert("Sorry, visitors from your country are not permitted to view this site");
            return false;
        } else if ((currdate - mydate) < 0) {
            alert("Sorry, only visitors over the age of " + age + " may enter this site");
            return false;
        } else {
            if (remember) {
                createCookie( agecookie, 1, 3650); // expire in 10 years
            } else {
                createCookie( agecookie, 1, 1); // expire in a day
            }

            jQuery(agemodal).fadeOut();
            jQuery(modalContent).fadeIn();
            return true;
        }
    });

    function createCookie(name,value,days) {
      var date = new Date();
      var expires = "";
      if (days) {
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires="+date.toGMTString();
      }
      document.cookie = name+"="+value+expires+"; path=/";

      console.log(name+"="+value+expires+"; path=/");
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) {
              return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    /**
     * A handy little function to erase cookies,
     * useful when testing/debugging:
     */
    function eraseCookie(cookieName) {
        createCookie(cookieName,"",-1);
    }

});
