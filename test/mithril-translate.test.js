
/* global describe, it, expect */


m.deps( mock.window );


/* i18n configuration*/
describe('mx.translate.configure()' , function() {

    it( 'should be a function' , function() {
        expect( typeof mx.translate.configure ).toBe( 'function' );
    });

    it( 'should have a string as 1st parameter' , function( ) {

        /* Configuration */
        mx.translate.configure( { infix: '/test/i18n/' , suffix: '.json' } );

        /* Load */
        mx.translate.use( 'en' );

        /*var call = function( _state_ ) { return function() { mx.route.go( _state_ ) } };
        expect( call( { a: 'object' } ) ).toThrowError( TypeError );
        expect( call( 156 ) ).toThrowError( TypeError );*/
    });
});