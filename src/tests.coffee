$.freud('register', 'Test1',
  class Test1
    constructor: (@element, options = {}) ->
      @count = 0
      @element.append('Behaviour 1 applied')
      @button = $('<button>nr</button>')
      @element.append(@button)
      @button.on 'click', @handleClick

    handleClick: =>
      @count = @count + 1;
      @button.text(@count)
)
#
$.freud('register',
  class Test2
    constructor: (@element, options = {}) ->
      @count = 0
      @element.append('Behaviour 2 applied')
      @button = $('<button>nr</button>')
      @element.append(@button)
      @button.on 'click', @handleClick

    handleClick: =>
      @count = @count + 1;
      @button.text(@count)
)
