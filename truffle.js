module.exports = {
  build: {
    "index.html": "index.html",
    "auction.html": "auction.html",
    "header.html": "header.html",
    "footer.html": "footer.html",
    "createAuction.html": "createAuction.html",
    "about.html": "about.html",
    "app.js": [
      "javascripts/app.js",
    ],
    "network.js": [
      "javascripts/network.js"
    ],
    "auction.js": [
      "javascripts/auction.js"
    ],
    "createAuction.js": [
      "javascripts/createAuction.js"
    ],
    "bootstrap.min.js": [
      "javascripts/bootstrap.min.js"
    ],
    "bootstrap.min.css": [
      "stylesheets/bootstrap.min.css"
    ],
    "bootstrap-theme.min.css": [
      "stylesheets/bootstrap-theme.min.css"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    // port: 8081
    port: 8545
  },
  networs: {
    "development": {
      network_id: "default"
    },
    "modern": {
      network_id: 2
    },
    "live": {
      network_id: 1
    }
  }
};
