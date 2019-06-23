# io.js - mini javascript container

## examples to use

```javascript
io('config', {
    env: 'dev',
    url: 'http://localhost/'
});
```

### usage 1
```javascript
io('my-module', function (config) {
            console.log(config.env);
        })
        .inject('config')
        .run();
```
### usage 2
```javascript
io('my-module')
        .inject('config')
        .run(function (config) {
            console.log(config.env);
        });
```
