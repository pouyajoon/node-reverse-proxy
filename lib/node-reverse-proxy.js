var sys = require('util');
var http = require('http');
var httpProxy = require('http-proxy');
var utils = require('socket.io').utils;
var io = require('socket.io');

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
  this.proxyServer.listen(this.port);
}

module.exports = node_reverse_proxy;