(function() {
  var Test1, Test2,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $.freud('register', 'Test1', Test1 = (function() {
    function Test1(element, options) {
      this.element = element;
      if (options == null) {
        options = {};
      }
      this.handleClick = bind(this.handleClick, this);
      this.count = 0;
      this.element.append('Behaviour 1 applied');
      this.button = $('<button>nr</button>');
      this.element.append(this.button);
      this.button.on('click', this.handleClick);
    }

    Test1.prototype.handleClick = function() {
      this.count = this.count + 1;
      return this.button.text(this.count);
    };

    return Test1;

  })());

  $.freud('register', Test2 = (function() {
    function Test2(element, options) {
      this.element = element;
      if (options == null) {
        options = {};
      }
      this.handleClick = bind(this.handleClick, this);
      this.count = 0;
      this.element.append('Behaviour 2 applied');
      this.button = $('<button>nr</button>');
      this.element.append(this.button);
      this.button.on('click', this.handleClick);
    }

    Test2.prototype.handleClick = function() {
      this.count = this.count + 1;
      return this.button.text(this.count);
    };

    return Test2;

  })());

}).call(this);
