var http = require('http');
var httpProxy = require('http-proxy');

function node_reverse_proxy(router) {
  this.proxy = new httpProxy.RoutingProxy({ router: router });
  this.proxyServer = http.createServer(function (req, res) {
    this.proxy.proxyRequest(req, res);
  }.bind(this));
  this.proxyServer.on('upgrade', function (req, socket, head) {
    this.proxy.proxyWebSocketRequest(req, socket, head);
  }.bind(this));
  return this;
}

node_reverse_proxy.prototype.start = function(port) {
  this.port = port;
  this.proxyServer.listen(this.port).on('error', function(err){
    if (err.code == "EACCES"){
      console.log('ERROR : Unable to bind on the port', port);
      if (port < 1024){
        console.log("HELP : Port under 1024 require root user, you have used port", port);  
      }      
    }
    throw err;
  });
}

module.exports = node_reverse_proxy;