/* global m */

;( function( m ) {

    'use strict';

    window.mx = window.mx ||  {};

    /**
     * Storage constructor
     */
    var Storage = function( ) {
        var _store_ = {};
        return {
            set: function( item ) {
                _store_[ currentLanguage ] = item;
            },
            get: function( name ) {
                var translations =  _store_[ currentLanguage ];
                var result = translations;
                name
                    .split('.')
                    .forEach( function( property ) {
                        result = result[ property ];
                    });
                return result;
            }
        }
    };


    /*
     * Validators for router function
     */
    var validators = {
        /**
         * Check whether the given parameter is a string
         * @param {String} string
         * @returns {String} value
         * @throws {TypeError} for non strings
         */
        string : function(string){
            if(typeof string !== 'string'){
                throw new TypeError('a string is expected, but ' + string + ' [' + (typeof string) + '] given');
            }
            return string;
        },

        /**
         * Check whether the given parameter is a plain object (array and functions aren't accepted)
         * @param {Object} object
         * @returns {Object} object
         * @throws {TypeError} for non object
         */
        plainObject : function(object){
            if(typeof object !== 'object' ){
                throw new TypeError('an object is expected, but ' + object + '  [' + (typeof object) + '] given');
            }
            return object;
        }
    };

    /**
     * The module configuration
     */
    var configuration;

    /**
     * The current language
     */
    var currentLanguage;

    /**
     * The translation storage
     */
    var storage = new Storage();

    /**
     * Returns the translation of a given item name in the optional given or current language
     */
    mx.translate = function( item ) {
        validators.string( item );
        return storage.get( item );
    };

    /**
     * Loads the translations files for the given folder
     */
    mx.translate.configure = function( options ) {
        validators.plainObject( options );
        configuration = options;
    };

    /**
     * Get / Set the language
     */
    mx.translate.use = function( languageToUse ) {
        if( languageToUse && currentLanguage !== languageToUse ) {
            validators.string( languageToUse );
            $load( languageToUse );
        } else {
            return currentLanguage;
        }
    };

    /**
     * Load the given language translation file
     */
    function $load( languageToLoad ) {
        m.request( { method: "GET", url: $infix() + languageToLoad + $suffix()  } )
            .then( function( translations ) {
                currentLanguage = languageToLoad || currentLanguage;
                storage.set( translations );
            });
    }

    /**
     * Returns the configuration infix option
     */
    function $infix() {
        return configuration.infix;
    }

    /*
     * Returns the configuration suffix option
     */
    function $suffix() {
        return configuration.suffix || '';
    }


})( m );