

var menu = {}
menu.view = function( controller ) {
    return [
        m( '.ui.menu' ,
            m( '.item' , 'Select your language' ),
            m( 'a' , { class: 'item' } ,
                m('i' , { class:'united kingdom flag' }  )
            ),
            m( 'a' , { class: 'item' } ,
                m('i' , { class:'france flag' }  )
            ),
            m( 'a' , { class: 'item' } ,
                m('i' , { class:'germany flag' }  )
            )

        )
    ];
};


var content = {}
content.view = function( controller ) {
    return [
        m( '.ui.segment' ,
            m( 'h1'  , 'content' )
        )
    ];
};


var main = {};
main.view = function( controller ) {
    return [
        m( '.ui.hidden.divider' ),
        m( '.ui.page.grid',
            menu.view( controller ),
            content.view( controller )
        )
    ];
};

m.module( document.body , main );