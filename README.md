A reverse proxy in node.js for HTTP and Websockets.

Requires node.js <= v0.4.x

Example usage :

```javascript
var node_reverse_proxy = require('./index');
var ip = '127.0.0.1';
var reverse_proxy = new node_reverse_proxy({
    'first_host.com' : ip + ':8082',
    'my.second_host.com' : ip + ':8081',
    'my.second_host.com/page/' : ip + ':8080'
});

reverse_proxy.start(80);
```

