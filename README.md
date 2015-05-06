Mithril Translate [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
=================

Mithril Translate is a library which allows to internationalize your mithril applications including lazy loading and variable replacement.

## Get Started

One way to use Mithril Translate: download this project, get the `dist` folder files and link to mithril and mithril-translate in the head of your app:

```html
<head>
    <meta charset="utf-8">
    <script src="mithril.js"></script>
    <script src="mithril-translate.js"></script>
</head>
```

## Demo

Take a look at http://kawan16.github.io/mithril-translate/ and see Mithril-translate in action.

## How to use it

### The `mx.translate.configure` function

First, you need to initialize the translations environment mainly by calling the `mx.translate.configure` and passing it configuration options.

```js
  mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );
```
The method accepts the following options:

* *infix* : the infix string which allows to access to remote translations files
* *suffix* : the suffix of the translation files

### The `mx.translate.use` function

The `mx.translate.use` function sets ( or returns ) the current translation language. By calling it with a given language path filename, the related translation file will be loaded ( if it has not been done yet ) by using the `infix` and `suffix` from the configuration options.

```js
  mx.translate.configure( { infix: '/i18n/' , suffix: '.json' } );
  mx.translate.use( 'en' ); // Load the translation file located at '/i18n/en.json'
  mx.translate.use(); // Return 'en'
```

The `mx.translate.use` expects to get an javascript object which contains translations through its properties such as: 
```js
{
    'home' : 'Home',
    'login' : 'Login',
    'component' : {
        'widgetA-title' : 'Widget A',
        'widgetB-title' : 'Widget B'
    }
}
```

#### Inline translations

You may use local/inline/static translations for a given language by passing a translation object as second paramater of the `mx.translate.use` function:

```js
// In this case, no need to configure infix or suffix

var enTranslations = {
    hello: 'Hello !'
};
mx.translate.use( 'en' , enTranslations );
mx.translate( 'hello' ); // returns 'Hello !'

```

### The `mx.translate` function

Once configuring and setting a language, the `mx.translate` is very easy to use. Given the property path, the function returns the translation.

```js
    // Suppose the above translation file
    mx.translate( 'home' ); // Returns  'Home'
    mx.translate( 'component.widgetA-title' ); // Returns 'Widget A' 
```

#### Variable replacement

Translation content can contain variables which will be instantiated at translation call. We use the interpolation symbols `{{}}` in order specify a variable. We pass the variable settings in a key / value object as the second paramater of the `mx.translate` function. Suppose:

```js
// In the translation file
{
    'welcome' : 'Welcome {{name}}',
}

// In the application js file
mx.translate( 'welcome' , { name: 'Kawan16' } ); // Returns 'Welcome Kawan16'

```

#### Pluralization

You can define and use pluralization ( and mix it with variable replacement ). 

```js
// In the translation file
{
    'viewing' : {
        '0' : 'Nobody is viewing',
        '1' : '{{ person1 }} is viewing',
        '2' : '{{ person1 }} and {{ person2 }} are viewing',
        'other' : 'Several persons are viewing'
    }
}

// In the application js file

// Only pluralization index
mx.translate( 'viewing' , '0' ); // Returns 'Nobody is viewing'

// Pluralization index and variable assignment
mx.translate( 'viewing' , { person1: 'Kawan16' } , '0' ); // Returns 'Kawan16 is viewing'
mx.translate( 'viewing' , { person1: 'Kawan16' , person2: 'Toto' } , '0' ); // Returns 'Kawan16 and Toto are viewing'

```

## History

* 0.1.0 - Initial Release
    * 0.1.1 - Pluralization   

## License

Licensed under the MIT license.
