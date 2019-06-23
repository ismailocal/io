var io = (function () {

    var self = {
        modules: {},
        module: {
            name: 'default'
        }
    };

    this.run = function (name) {
        if (typeof self.modules[name].value === 'function') {
            var injects = [];
            self.modules[name].injects.map(function (inject) {
                if (!self.modules[inject].object) {
                    this.run(inject);
                }
                injects.push(self.modules[inject].object);
            }.bind(this));

            self.modules[name].object = new (Function.prototype.bind.apply(self.modules[name].value, [null].concat(injects)));
        } else {
            return self.modules[name].object = self.modules[name].value;
        }
    };

    return function (name, value) {
        self.modules[self.module.name = name] = {
            injects: [],
            extends: [],
            object: null,
            value: value
        };

        return {
            inject: function () {
                [].slice.call(arguments).map(function (inject) {
                    self.modules[self.module.name].injects.push(inject);
                });
                return this;
            },
            wait: function (callable) {
                self.modules[self.module.name].value = callable;
                return this;
            },
            run: function (callable) {
                if (callable) {
                    self.modules[self.module.name].value = callable;
                }
                this.run(self.module.name);
            }.bind(this)
        };
    };
})();