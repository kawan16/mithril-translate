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
                _store_[ currentLanguage ] = JSON.stringify( item );
            },
            get: function( name ) {
                var translations = JSON.parse( _store_[ currentLanguage ] );
                return translations[name];
            }
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
        return storage.get( item );
    };

    /**
     * Loads the translations files for the given folder
     */
    mx.translate.configure = function( options ) {
        configuration = options;
    };

    /**
     * Get / Set the language
     */
    mx.translate.use = function( languageToUse ) {
        if( languageToUse && currentLanguage !== languageToUse ) {
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
        return configuration.prefix || '';
    }


})( m );