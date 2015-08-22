(function() {
  (function($) {
    var default_options, fn_methods, freud_behaviours, top_methods;
    default_options = {
      behaviourKey: 'behaviours'
    };
    if (!freud_behaviours) {
      freud_behaviours = {};
    }
    top_methods = {
      register: function(behaviour_or_name, behaviour) {
        var name;
        if (behaviour == null) {
          behaviour = null;
        }
        name = typeof behaviour_or_name === 'function' ? behaviour_or_name.name : behaviour_or_name;
        behaviour = typeof behaviour_or_name === 'function' ? behaviour_or_name : behaviour;
        return freud_behaviours[name] = behaviour;
      }
    };
    $.freud = function(method_or_options) {
      if (method_or_options == null) {
        method_or_options = {};
      }
      if (top_methods[method_or_options]) {
        return top_methods[method_or_options].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method_or_options === 'object' || !method_or_options) {
        return top_methods.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jquery-freud');
      }
    };
    fn_methods = {
      init: function(options) {
        var behaviourKey;
        options = $.extend({}, default_options, options);
        behaviourKey = options.behaviourKey;
        return this.each(function(index, el) {
          var $el, behaviour_name, e, el_behaviours, i, len, results;
          $el = $(el);
          if ($el.data(behaviourKey)) {
            el_behaviours = $el.data(behaviourKey);
            try {
              el_behaviours = JSON.parse(el_behaviours);
            } catch (_error) {
              e = _error;
              el_behaviours = el_behaviours;
            }
            if (typeof el_behaviours !== 'object') {
              el_behaviours = [el_behaviours];
            }
            results = [];
            for (i = 0, len = el_behaviours.length; i < len; i++) {
              behaviour_name = el_behaviours[i];
              if (!$el.data("loaded_behaviour_" + behaviour_name)) {
                $el.data("loaded_behaviour_" + behaviour_name, true);
                $el.data($.extend({}, options, $el.data()));
                if (freud_behaviours[behaviour_name]) {
                  results.push(new freud_behaviours[behaviour_name]($el, options));
                } else {
                  results.push(void 0);
                }
              } else {
                results.push(void 0);
              }
            }
            return results;
          }
        });
      }
    };
    return $.fn.freud = function(method_or_options) {
      if (method_or_options == null) {
        method_or_options = {};
      }
      if (fn_methods[method_or_options]) {
        return fn_methods[method_or_options].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method_or_options === 'object' || !method_or_options) {
        return fn_methods.init.apply(this, arguments);
      } else {
        return $.error('Method ' + method + ' does not exist on jQuery(...).behaviours');
      }
    };
  })(jQuery);

}).call(this);
