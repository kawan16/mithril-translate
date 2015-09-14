/* global m */

;( function( m ) {

    'use strict';

    window.mx = window.mx ||  {};

    /**
     * Storage constructor
     */
    var Storage = function( ) {
        var store = {};
        var variableRegex = /\{\{(.*?)\}\}/g;
        return {

            /**
             * Stores the given translation object in the current language cache
             * @param {object} The translation object
             */
            set: function( item ) {
                store[ currentLanguage ] = item;
            },

            /**
             * Returns the translation given the current language, the given name property and the optional
             * values replacement in case of template message
             * @param {String} The name of translation property
             * @param {object} The key/value map of variable / values to replace in the translation content
             */
            get: function( name , values ) {
                var translations =  store[ currentLanguage ];
                var result = translations;
                name
                    .split('.')
                    .forEach( function( property ) {
                        result = result[ property ];
                    });
                if( values ) {
                    var variables = result.match( variableRegex );
                    for( var key in values ) {
                        variables.forEach( function( variable ) {
                            if( variable.indexOf( key ) !== -1 ) {
                                result = result.replace( variable , values[ key ] );
                            }
                        })
                    }
                }
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
     * Returns the translation of a given item name with optional variable/value substitution
     */
    mx.translate = function( item ) {
        validators.string( item );
        if( arguments.length > 1  ) {
            var secondParameter = arguments[ 1 ];
            if( arguments.length === 3 ) {
                var thirdParameter = arguments[ 2 ];
                return storage.get( item + '.' + thirdParameter , secondParameter );
            } else if( typeof secondParameter === 'object' )  {
                return storage.get( item , secondParameter );
            } else {
                return storage.get( item + '.' + secondParameter );
            }
        }
        else {
            return storage.get( item );
        }
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
    mx.translate.use = function( languageToUse , optionalTranslations ) {
        if( languageToUse && currentLanguage !== languageToUse ) {
            validators.string( languageToUse );
            if( optionalTranslations ) {
                $store( languageToUse , optionalTranslations );
            } else {
                return $load( languageToUse );
            }
        } else {
            return currentLanguage;
        }
    };

    /**
     * Stores static translations for a given language
     */
    function $store( languageToUse , translationsToStore ) {
        currentLanguage = languageToUse || currentLanguage;
        storage.set( translationsToStore );
    }

    /**
     * Load the given language translation file and returns the promise of its loading
     */
    function $load( languageToLoad ) {
        m.startComputation();
        var deferred = m.deferred();
        m.request( { method: "GET", url: $infix() + languageToLoad + $suffix()  } )
            .then( function( translations ) {
                currentLanguage = languageToLoad || currentLanguage;
                storage.set( translations );
                deferred.resolve();
                m.endComputation();
            }, function( error ) {
                deferred.reject( error );
                m.endComputation();
            });
        return deferred.promise;
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