# jquery-freud

Master: [![Build Status](https://travis-ci.org/abuisman/jquery-freud.svg?branch=master)](https://travis-ci.org/abuisman/jquery-freud)

Version 1.1.0: [![Build Status](https://travis-ci.org/abuisman/jquery-freud.svg?branch=v1.1.0)](https://travis-ci.org/abuisman/jquery-freud)

![sigmund](https://cloud.githubusercontent.com/assets/27729/9395534/56b81cd0-478f-11e5-9543-7d0afaa5a855.jpg)

Add behaviours to DOM elements, somewhat like components. These are simple Javascript classes that can do whatever you want with the element. Much simpler than building a jQuery plugin and less messy than one big js file.

![freudsignature](https://cloud.githubusercontent.com/assets/27729/9395535/56b9558c-478f-11e5-8994-788cbffadfe5.png)

## What is a behaviour?

A behaviour is a simple class with a constructor that gets passed the element they are applied to. That class can then do all sorts of magical and not so magical things with that element.

## An example

````
class IncreaseCount
  constructor: (@element, options = {}) ->
    @count = @element.data(‘count’) || 0
		$button = $(‘<button>Add one</button>’)
		@element.append($button)
		$button.on(‘click’, @handleButtonClick)

  buttonClick: =>
    @count = @count + 1;
    @element.find(‘.count’).text(@count)
````

For brevity the above code is in Coffeescript, but you can use any class you want. Freud creates an instance like this: `new behaviour(element)`.

You can now tell Freud about the behaviour like so:

`$.freud(‘register’, IncreaseCount)`

Freud now knows this behaviour as ‘IncreaseCount’. If you want to use a different name you can do:

`$.freud(‘register’, ‘OtherName’, IncreaseCount)`

Of course you can also directly declare the behaviour as you pass it to freud:

````
$.freud('register',
  class OttoLoewi
    constructor: (@element, options = {}) ->
      neurotransmit(@element)
)
````

## Applying behaviours

### Data attribute 'behaviours'

Behaviours can be applied to an element by setting a `data` attribute called `behaviours` on them with the name of the behaviour(s) as the value:

````
 -- HTML:
  <div class='greeting-card' data-behaviours='greetingCard'></div>

 -- Javascript
  $(function() {
    $('[data-behaviours]').freud();
  });
````

### Passing behaviours to freud()

Alternatively you may pass data-attributes to freud by passing an array to freud when selecting elements:

````
-- HTML:
  <div class='greeting-card'></div>

-- Javascript
  $(function(){
    $('.greeting-card').freud(['greetingCard']);
  })
````

### Hybrid

You can also use both methods at the same time:

````
-- HTML:
  <div class='greeting-card' data-behaviours='anotherBehaviour'></div>

-- Javascript
  $(function(){
    $('.greeting-card').freud(['greetingCard']);
  })
````

### Other key

You can also use your own key in case you don't want to use `'behaviours'`:

````
 -- HTML:
  <div class='greeting-card' data-custom-key='greetingCard'></div>

 -- Javascript
  $(function() {
    $('[data-behaviours]').freud({ behaviourKey: 'custom-key'});
  });
````

### More than one behaviour

Apply more than one behaviour to the same element by passing a JSON array as the behaviours value:

````
  <div class='greeting-card' data-behaviours='["GreetingCard", "HelloWorld"]'></div>
````

You can also apply many behaviours through passing behaviours through the freud function:

````
-- HTML:
  <div class='greeting-card'></div>

-- Javascript
  $(function(){
    $('.greeting-card').freud(['greetingCard', 'anotherBehaviour']);
  })
````

### Example uses

Some things that I have used behaviours for:

- In a calculations app we have charts displaying the results of calculations. My behaviour sits on the chart’s container and opens up the web socket connection to listen for changes to the chart. When there is a change I refresh the chart with `@element.load(@element.data(‘chartUrl’))`

- In forms you sometimes have select boxes that manage the values of other select boxes. E.g. ‘select country’, ‘select city’. When you select a country the list of cities changes to display the cities for that country, etc. Instead of binding directly to the first select box, you can manage the code more easily in a behaviour that you put on the whole form. If you use the same pattern more often for different forms you can even apply multiple behaviours:

`<form behaviours=‘[“CountrySelect”, ”GoogleMaps”]’>`

## Feedback

If you find any bugs or issues please create a ticket here (on github). If you have any questions feel free to e-mail me at the e-mail address contained in the `package.json` and `bower.json`.

## Contributing

With regards to bugs and issues, or when you find a killer feature for Freud please consider contributing.

### Grunt

Freud is written in Coffeescript. You can edit the file in `src` and build it by running the command `grunt`. This will also start a simple static file server where you can play around with the plugin on a simple index.html.

Also make sure that all tests are passing by running `grunt test`.

## License

--------------

The MIT License (MIT)

Copyright (c) 2015 Achilleas L.D. Buisman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
