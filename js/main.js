

/* Set up Mithril translate */

 mx.translate.configure( { infix: '/mithril-translate/data/' , suffix: '.json' });
 mx.translate.use( 'en' );


/* Main component */

var menu = {}
menu.view = function( controller ) {
    return [
        m( '.ui.menu' ,
            m( '.item' , { style: 'width: 200px;' } , mx.translate( 'select' ) ),
            m( 'a' ,
                {
                    class: mx.translate.use() === 'en' ? 'active item' : 'item',
                    onclick: function( ) { mx.translate.use( 'en' ); }
                } ,
                m('i' , { class:'united kingdom flag' }  )
            ),
            m( 'a' ,
                {
                    class: mx.translate.use() === 'fr' ? 'active item' : 'item',
                    onclick: function( ) {  mx.translate.use( 'fr' ); }
                } ,
                m('i' , { class:'france flag' }  )
            ),
            m( 'a' ,
                {
                    class: mx.translate.use() === 'de' ? 'active item' : 'item',
                    onclick: function( ) {  mx.translate.use( 'de' ); }
                } ,
                m('i' , { class:'germany flag' }  )
            )
        )
    ];
};


var content = {}
content.view = function( controller ) {
    return [
        m( '.ui.segment' ,
            m( '.ui.hidden.divider' ),

            m( '.ui.grid' ,
                m( '.four.wide.column',
                    m( '.ui.action.input' ,
                        m( 'input' ,
                            {
                                type: 'text',
                                value: controller.name(),
                                placeholder: mx.translate( 'ask-name' ),
                                onchange:  m.withAttr( 'value' , controller.name )
                            }
                        ),
                        m( 'button' ,
                            {
                                class: 'ui icon button',
                            },
                            m( 'i' , 'OK' )
                        )
                    )
                ),
                m( '.five.wide.column', m('h2' , mx.translate( 'welcome-name' , { name: controller.name() } ) ) )
            ),
            m( '.ui.hidden.divider' )
        ),
        m( '.ui.hidden.divider' ),
        m( '.ui.segment' ,
            m( '.ui.grid'  ,
                m( '.six.wide.column' ,
                    m ( 'img' ,
                        {
                            class: '.ui.small.image',
                            src: '/mithril-translate/img/prince.jpg'
                        }
                    )
                ),
                m( '.ten.wide.column' ,
                    m( 'h2' , mx.translate( 'title' ) ),
                    m( 'p' , mx.translate( 'sample' ) ),
                    m( 'p' , mx.translate( 'sample2' ) ),
                    m( 'p' , '[...]')
                )
            )
        )
    ];
};


var main = {};
main.controller = function() {
    this.name = m.prop('');
};
main.view = function( controller ) {
    return [
        m( '.ui.hidden.divider' ),
        m( '.ui.page.grid',
            menu.view( controller ),
            m( '.ui.hidden.divider' ),
            content.view( controller )
        )
    ];
};

m.module( document.body , main );