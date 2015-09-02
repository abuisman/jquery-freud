(($) ->
  default_options = {
    behaviourKey: 'behaviours',
  }

  freud_behaviours = {} unless freud_behaviours

  utils =
    normalize_behaviours: (behaviours) ->
      return [] unless behaviours
      # Lets see if a JSON array was given or not
      try
        behaviours = JSON.parse(behaviours)
      catch e
        behaviours = behaviours
      # When just a single behaviour was given as a string we wrap it in an array
      unless typeof behaviours == 'object'
        behaviours = [behaviours]
      behaviours

  # These methods are defined on top level jQuery
  top_methods =
    register: (behaviour_or_name, behaviour = null) ->
      name = if typeof behaviour_or_name == 'function' then behaviour_or_name.name else behaviour_or_name;
      behaviour = if typeof behaviour_or_name == 'function' then behaviour_or_name else behaviour
      freud_behaviours[name] = behaviour

  $.freud = (method_or_options = {}) ->
    if top_methods[method_or_options]
      return top_methods[ method_or_options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    else if typeof method_or_options == 'object' || ! method_or_options
      # Default to "init"
      return top_methods.init.apply( this, arguments );
    else
      $.error( 'Method ' +  method + ' does not exist on jquery-freud' );

  # These methods are callable by the user of the plugin (developer)
  fn_methods =
    init: (options) ->
      # Checking whether an array was passed, or options were passed
      if options && (options.constructor == Array)
        given_behaviours = options
        options = $.extend {}, default_options
      else
        # Init the internal collection when needed
        options = $.extend {}, default_options, options

      behaviourKey = options.behaviourKey

      # Loop through the elements matched by the jQuery selector
      return this.each (index, el) ->
        $el = $(el)
        el_behaviours = []
        el_behaviours = utils.normalize_behaviours($el.data(behaviourKey))

        if given_behaviours
          el_behaviours = el_behaviours.concat(given_behaviours)

        for behaviour_name in el_behaviours
          # Prevent double binding of behaviour
          unless $el.data("loaded_behaviour_#{behaviour_name}")
            $el.data("loaded_behaviour_#{behaviour_name}", true);
            $el.data $.extend({}, options, $el.data())
            new freud_behaviours[behaviour_name]($el, options) if freud_behaviours[behaviour_name]

  # And finally the function that goes into jQuery
  $.fn.freud = (method_or_options = {}) ->
    if fn_methods[method_or_options]
      return fn_methods[ method_or_options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    else if typeof method_or_options == 'object' || ! method_or_options
      # Default to "init"
      return fn_methods.init.apply( this, arguments );
    else
      $.error( 'Method ' +  method + ' does not exist on jQuery(...).behaviours' );
)(jQuery)
