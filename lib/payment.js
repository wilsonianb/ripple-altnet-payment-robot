import Promise from 'bluebird'

export default class Payment {

  constructor(options) {
    this.source = {
      address: options.address,
      maxAmount: {
        value: options.amount,
        currency: options.currency
      }
    },
    this.destination = {
      address: options.destination,
      amount: {
        value: options.amount,
        currency: options.currency
      }
    }
  }

  submit(remote, secret) {
    return remote.preparePayment(this.source.address, this).then(prepared => {
      const {signedTransaction} = remote.sign(prepared.txJSON, secret);
      remote.submit(signedTransaction);
    });
  }
}

