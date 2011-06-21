/*global Ply */
/*jshint eqeqeq: true, curly: true, white: true */

// The Read module is an abstraction on top of Ajax for loading particular
// views, or named URLs.

// By convention, every view defined has a read method created for it on `Ply.read`.
// That URL can be explicitly defined using a `__url` property on the view, or can be
// automatically generated by a function assigned to `Ply.config.read.urlGenerator`.

// This module also exists as a namespace for user-defined read functions that are created
// outside of the automatic view instantiation process. The intention is to avoid explicitly
// using `Ply.ajax` with hardcoded URLs. Instead, clients and views should prefer named methods
// corresponding to the data or view being loaded.

// Note that this module makes no assumption about REST, and does not handle requests for any
// other HTTP verbs. An extension for handling POST and UPDATE requests may come in the future,
// but has not yet appeared useful.

// Define the `read` module.
Ply.read = (function () {

    return {

        // Private method used by the `ui` module to generate read
        // functions for `ui` views.
        _create: function (name, url) {

            // If a URL is explicitly passed to this function, that
            // URL is used, otherwise the view name is passed to
            // `Ply.config.read.urlGenerator` to create a URL.
            url = url || Ply.config.read.urlGenerator(name);

            // Create a method on `Ply.read` corresponding to the view name.
            Ply.read[name] = function (data, success, failure) {

                // Return the result of calling Ply.ajax.request, so the XHR object
                // gets returned to the user. Allows them to call methods of the XHR.
                return Ply.ajax.request({
                    url: url,
                    type: 'GET',
                    data: data
                }, success, failure);

            };

        }

    };

})();

// &#8618; [UI](ui.html).