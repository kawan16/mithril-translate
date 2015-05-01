
/* global describe, it, expect */


m.deps( mock.window );


/* i18n configuration */
describe('mx.translate.configure()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.translate.configure ).toBe( 'function' );
    });

    it( 'should have an object as 1st parameter' , function( ) {
        var call = function( _options_ ) { return function() { mx.translate.configure(  _options_  ); } };
        expect( call( 'Not an object' ) ).toThrowError( TypeError );
        expect( call( 156 ) ).toThrowError( TypeError );
    });

});

/* i18n use */
describe('mx.translate.use()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.translate.use ).toBe( 'function' );
    });

    it( 'should have a string as 1st parameter' , function( ) {
        var call = function( _options_ ) { return function() { mx.translate.use(  _options_  ); } };
        expect( call(  { not: 'string' } ) ).toThrowError( TypeError );
        expect( call( 156 ) ).toThrowError( TypeError );
    });

    it( 'should set the correct ( language ) filename' , function( ) {
        mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );

        mx.translate.use( 'en' );
        expect( mx.translate.use() ).toEqual( 'en' );

        mx.translate.use( 'de' );
        expect( mx.translate.use() ).toEqual( 'de' );

        mx.translate.use( 'fr' );
        expect( mx.translate.use() ).toEqual( 'fr' );
    });

});


/* i18n use */
describe('mx.translate' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.translate ).toBe( 'function' );
    });

    it( 'should have a string as 1st parameter' , function( ) {
        var call = function( _options_ ) { return function() { mx.translate(  _options_  ); } };
        expect( call(  { not: 'string' } ) ).toThrowError( TypeError );
        expect( call( 156 ) ).toThrowError( TypeError );
    });

    it( 'should return undefined given a wrong identifier' , function() {
        mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );
        mx.translate.use( 'en' );
        expect( mx.translate( 'wrongKey' ) ).not.toBeDefined();
    });

    it( 'should return the correct translation given a given simple identifier' , function( ) {
        mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );

        mx.translate.use( 'en' );
        expect( mx.translate( 'title' ) ).toEqual( i18n.en.title );
        expect( mx.translate( 'sample' ) ).toEqual( i18n.en.sample );

        mx.translate.use( 'de' );
        expect( mx.translate( 'title' ) ).toEqual( i18n.de.title );
        expect( mx.translate( 'sample' ) ).toEqual( i18n.de.sample );

        mx.translate.use( 'fr' );
        expect( mx.translate( 'title' ) ).toEqual( i18n.fr.title );
        expect( mx.translate( 'sample' ) ).toEqual( i18n.fr.sample );
    });

    it( 'should return the correct translation given a given nested identifier' , function( ) {
        mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );

        mx.translate.use( 'en' );
        expect( mx.translate( 'chapterOne.title' ) ).toEqual( i18n.en.chapterOne.title );

        mx.translate.use( 'de' );
        expect( mx.translate( 'chapterOne.title' ) ).toEqual( i18n.de.chapterOne.title );

        mx.translate.use( 'fr' );
        expect( mx.translate( 'chapterOne.title' ) ).toEqual( i18n.fr.chapterOne.title );
    })

    it( 'should return the correct translation given a set of inline translations' , function( ) {
        var translations = {
            hello : 'hello',
            nested : {
                seeYou: 'See you'
            }
        };

        mx.translate.use( 'en' , translations );
        expect( mx.translate( 'hello' ) ).toEqual( translations.hello );
        expect( mx.translate( 'nested.seeYou' ) ).toEqual( translations.nested.seeYou );
    })

});