var braintree = require("braintree");

var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   '4wkx7778hfb7cf24',
  publicKey:    '95t8yhfqcz4bx23q',
  privateKey:   '2112f1c1c3bbdfabf01c03898dc22910'
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );
};
