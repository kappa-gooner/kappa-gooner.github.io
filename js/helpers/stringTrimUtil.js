define(function () {
    'use strict';
    (function(){
        String.prototype.trimToLength = function(m) {
            return (this.length > m)
                ? $.trim(this).substring(0, m) + "..."
                : this;
        };
    })();
});

