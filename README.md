# io.js - mini javascript container

## variable

```javascript
io('config', {
    env: 'dev',
    url: 'http://localhost/'
});
```

### module
```javascript
io('my-module', function () {
        console.log('my-module');
    })
    .run();
```
or
```javascript
io('my-module').run(function () {
    console.log('my-module');
});
```

### module inject another module or variable
```javascript
io('my-module', function (config) {
        console.log(config.env);
    })
    .inject('config')
    .run();
```
or
```javascript
io('my-module')
    .inject('config')
    .run(function (config) {
        console.log(config.env);
    });
```
### use module another way
```javascript
io('my-module', function (config) {
        this.log = function(){
            console.log(config.env);
        }
    })
    .inject('config');

io('my-module').log();
```