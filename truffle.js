module.exports = {
  build: {
    "index.html": "index.html",
    "auction.html": "auction.html",
    "header.html": "header.html",
      "footer.html": "footer.html",
      "rightPanel.html": "rightPanel.html",
    "createAuction.html": "createAuction.html",
    "about.html": "about.html",
    "app.js": [
      "javascripts/app.js",
    ],
    "auctionhouse.js": [
      "javascripts/auctionhouse.js"
    ],
    "auction.js": [
      "javascripts/auction.js"
    ],
    "createAuction.js": [
      "javascripts/createAuction.js"
    ],
    "jquery.min.js": [
      "javascripts/jquery.min.js"
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
  }
};
