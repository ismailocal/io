var io = (function () {

    this.modules = {};

    this.init = function (name, value) {
        this.modules[name] = {
            injects: [],
            extends: [],
            object: null,
            value: value
        };
    };

    this.args = function (fn) {
        return fn.toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '')
            .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
            .split(/,/);
    };

    this.create = function (name) {
        if (this.modules[name].object) {
            return this.modules[name].object;
        }

        if (typeof this.modules[name].value === 'function') {
            this.modules[name].injects = this.args(this.modules[name].value);
            var injects = [];
            this.modules[name].injects.map(function (inject) {
                if (!this.modules[inject].object) {
                    this.create(inject);
                }
                injects.push(this.modules[inject].object);
            }.bind(this));

            return this.modules[name].object = new (Function.prototype.bind.apply(this.modules[name].value, [null].concat(injects)));
        } else {
            return this.modules[name].object = this.modules[name].value;
        }
    };

    return function () {

        var args = [].slice.call(arguments);

        switch (args.length) {
            case 1:
                return this.create(args[0]);
            case 2:
                return this.init(args[0], args[1]);
        }
    };
})();