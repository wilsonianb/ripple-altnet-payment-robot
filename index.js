import ripple from 'ripple-lib'
import Payment from './lib/payment'
import Promise from 'bluebird'
import _ from 'lodash'

const ADDRESS = process.env['RIPPLE_ADDRESS']
const SECRET = process.env['RIPPLE_SECRET']
const DEST = process.env['DESTINATION_ADDRESS']
const IP = process.env['RIPPLE_SERVER']

const api = new ripple.RippleAPI({server: IP});

let successfulPayments = 0
let failedPayments = 0

setInterval(() => {
  api.connect().then(() => {
    return new Payment({
      address: ADDRESS,
      destination: 'rPrfkgeiGewvr6W1LGkacGXRDv3mXoyvbH',
      amount: '20',
      currency: 'XRP'
    })
    .submit(api, SECRET).then(result => {
      console.log('successful payments:', ++successfulPayments)
    })
    .catch(error => {
      console.log(error)
      console.log('failed payments:', ++failedPayments)
    })
  })
}, 2000)
