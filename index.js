import ripple from 'ripple-lib'
import Payment from './lib/payment'
import Promise from 'bluebird'
import _ from 'lodash'

const ADDRESS = process.env['ALTNET_PAYMENT_ROBOT_RIPPLE_ADDRESS']
const SECRET = process.env['ALTNET_PAYMENT_ROBOT_RIPPLE_SECRET']

const ips = [
  's.altnet.rippletest.net'
]

let remotes = _.map(ips, ip => {
  let remote = new ripple.Remote({
    servers: [`wss://${ip}:51233`]
  })
  remote.setSecret(ADDRESS, SECRET)
  remote.last_ledger_offset = 1000
  return Promise.promisifyAll(remote)
})

let connections = _.map(remotes, remote => {
  return remote.connectAsync() 
})

let successfulPayments = 0
let failedPayments = 0
let paymentsSent = 0

Promise.all(connections).then(() => {
  console.log('connections', connections)
  remotes.forEach(remote => {

    setInterval(() => {
      console.log('sent payment', ++paymentsSent)
      new Payment({
        destination: 'rPrfkgeiGewvr6W1LGkacGXRDv3mXoyvbH',
        amount: 0.05,
        currency: 'XRP'
      })
      .submit(remote).then(result => {
        console.log('successful payments:', ++successfulPayments)  
      })
      .catch(error => {
        console.log('failed payments:', ++failedPayments)  
      })
    }, 1000)
  })
})

