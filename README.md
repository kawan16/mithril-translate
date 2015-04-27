Mithril Translate [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
=================

Mithril Translate is a library which allows to internationalize your mithril applications.

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

