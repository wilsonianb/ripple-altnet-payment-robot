# Ripple Altnet Payment Bot

Submits a 20 XRP payment every second to the altnet.

[Fund an altnet account here](https://ripple.com/build/ripple-test-net/)

## Usage

````
npm install
RIPPLE_ADDRESS=<your-altnet-account-address> RIPPLE_SECRET=<your-altnet-account-secret> DESTINATION_ADDRESS=<altnet-destination-address> RIPPLE_SERVER="wss://s.altnet.rippletest.net:51233" node_modules/babel/bin/babel-node index.js
````
