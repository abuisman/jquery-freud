(($) ->
  default_options = {
    behaviourKey: 'behaviours',
  }

  freud_behaviours = {} unless freud_behaviours

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
      # Init the internal collection when needed
      options = $.extend {}, default_options, options
      behaviourKey = options.behaviourKey

      # Loop through the elements matched by the jQuery selector
      return this.each (index, el) ->
        $el = $(el)

        if $el.data(behaviourKey)
          el_behaviours = $el.data(behaviourKey)

          # Lets see if an array was given or not
          try
            el_behaviours = JSON.parse(el_behaviours)
          catch e
            el_behaviours = el_behaviours

          # When just a single behaviour was given as a string we wrap it in an array
          unless typeof el_behaviours == 'object'
            el_behaviours = [el_behaviours]

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
