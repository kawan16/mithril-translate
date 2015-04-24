
var i18n = i18n || {};

i18n.en = {
    title: "The Little prince",
    sample: "In the book it said: \"Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.\" I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One. [...]",
    chapterOne: {
        title: "Chapter one"
    }
}

i18n.de = {
    title: "Kapitel eins",
    sample: "In dem Buche hieß es: \"Die Boas verschlingen ihre Beute als Ganzes, ohne sie zu zerbeißen. Daraufhin können sie sich nicht mehr rühren und schlafen sechs Monate, um zu verdauen.\" Ich habe damals viel über die Abenteuer des Dschungels nachgedacht, und ich vollendete mit einem Farbstift meine erste Zeichnung. Meine Zeichnung Nr. 1. [...]",
    chapterOne: {
        title: "Chapter one"
    }
}


i18n.fr = {
    title: "Le Petit prince",
    sample: "On disait dans le livre: \"Les serpents boas avalent leur proie tout entière, sans la mâcher. Ensuite ils ne peuvent plus bouger et ils dorment pendant les six mois de leur digestion\".J'ai alors beaucoup réfléchi sur les aventures de la jungle et, à mon tour, j'ai réussi, avec un crayon de couleur, à tracer mon premier dessin. Mon dessin numéro 1. [...]",
    chapterOne: {
        title: "Chapitre un"
    }
}

/* Mock Http Request */
m.request = function( options ) {
    var deferred = m.deferred();
    if( options.url === '/i18n/en.json' ) {
        deferred.resolve( i18n.en );
    } else if  ( options.url === '/i18n/de.json' ) {
        deferred.resolve( i18n.de );
    } else if ( options.url === '/i18n/fr.json' ) {
        deferred.resolve( i18n.fr );
    }
    return deferred.promise;
}
