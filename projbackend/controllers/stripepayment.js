const stripe = require("stripe")("sk_test_uTtXJz6FSa9iFJB8JKXGK3wn00zrppBGxo");
const uuid = require("uuid/v4");

//"stripe": "^8.56.0",


exports.makepayment=(req,res)=>{
    const {products, token} = req.body;
    console.log("PRODUCTS",products);

    let amount = 0;
    products.map(p => {
      amount = amount + p.price;
    });

    const idempotencyKey = uuid();
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stripe.charges.create({
                amount: amount*100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                shipping:{
                    name:token.card.name
                }
            }, {idempotencyKey})
            .then(result => res.status(200).json(result))
            .catch(err => console.log(err));
        });
};






