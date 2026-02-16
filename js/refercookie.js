jQuery(document).ready(function ($) {
    var debug = false;
    
    // referrer
    var immReferrer =  document.referrer;


    // get referrer cookie
    var referrerURLCookie = (Cookies.get("referrerurl")) ? Cookies.get("referrerurl") : false;


    // if not, set cookie
    if (!referrerURLCookie) {
        Cookies.set('referrerurl', immReferrer.toString(), { expires: 5, path: '/', domain: 'mailhippo.com' });
        referrerURL = immReferrer.toString();
    } else {
        // cookie valid
        referrerURL = referrerURLCookie.toString();
    }
    

    // get gclid from cookie
    var gclid = (Cookies.get('gclid')) ? Cookies.get('gclid') : false;

    // if no cookie, then set it
    if (!gclid && getQueryVar('gclid')) {

        // pull the gclid  from querystring
        gclid = getQueryVar('gclid');

        // set cookie with gclid
        Cookies.set('gclid', getQueryVar('gclid'), { expires: 5, path: '/', domain: 'mailhippo.com' });

    }

    // search params
    var urlParams = location.search;

    // get search params cookie
    var urlParamsCookie = (Cookies.get("urlparams")) ? Cookies.get("urlparams") : false;

    // if not, set cookie
    if (!urlParamsCookie) {
        Cookies.set('urlparams', urlParams, { expires: 5, path: '/', domain: 'mailhippo.com' });
    } else {
        // cookie is valid
        urlParams = urlParamsCookie.toString();
    }
	
	
	// get mhProperty from cookie -----------
    var cookMhProp = (Cookies.get('mhproperty')) ? Cookies.get('mhproperty') : false;

    // if no cookie, then set it
    if (!cookMhProp) {

        // set cookie with gclid
        Cookies.set('mhproperty', 'mailhippo', { expires: 5, path: '/', domain: 'mailhippo.com' });

    }


    if (debug == true) { 
        console.log('Raw-Referrer: ' + document.referrer);
        console.log("Cookie: " + Cookies.get("clinic_refreferrerurl"));
        console.log("gclid: " + gclid)
        console.log("referrerURL: " + referrerURL)
        console.log("urlParams: " + urlParams)
    }
});


function getQueryVar( param ) {

    var query = window.location.search.substring(1);
    var vars = query.split("&");

    var query_string = {};

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }

  return query_string[ param ];
}
