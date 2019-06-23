"use strict";

io('console')
    .inject('config')
    .wait(function (config) {

        var self = {};

        self.log = function (message) {
            self.write('log', message);
        };

        self.info = function (message) {
            self.write('info', message);
        };

        self.error = function (message) {
            self.write('error', message);
        };

        self.warn = function (message) {
            self.write('warn', message);
        };

        self.clear = function () {
            console.clear();
        };

        self.write = function (type, message) {
            config.env !== 'production' ? console[type](message) : null;
        };

        return Object.assign(true, console, self);

    });