# io.js - mini javascript container

## variable

```javascript
// define variable
io('config', {
    env: 'dev',
    url: 'http://localhost/'
});

// console variable
console.log(io('config'));
```

### module
```javascript
// define module
io('my-module', function () {
        console.log('my-module');
    });

// run module
io('my-module');
```

### module inject another module or variable
```javascript
// define module
io('my-module', function (config) {
        console.log(config.env);
    });

// run module
io('my-module');
```
### use module another way
```javascript
// define module
io('my-module', function (config) {
        this.log = function(){
            console.log(config.env);
        }
    });

// run module and use method
io('my-module').log();
```