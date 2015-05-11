import Promise from 'bluebird'
import ripple from 'ripple-lib'

const ADDRESS = 'rLnxHVjm8LRhjsNPBbSqVjVzC52stczNUE'

export default class Payment {

  constructor(options) {
    this.destination = options.destination
    this.amount = options.amount
    this.currency = options.currency
    this.issuer = options.issuer
  }

  submit(remote) {
    return new Promise((resolve, reject) => {

      var transaction = remote.createTransaction('Payment', {
        account: ADDRESS,
        destination: this.destination,
        amount: ripple.Amount.from_human(`${this.amount}${this.currency}`),
        LastLedgerSequence: undefined
      });

      transaction.submit(function(err, res) {
        if (err) { return reject(err) }
        resolve(res)
      });
    });
  }
}

