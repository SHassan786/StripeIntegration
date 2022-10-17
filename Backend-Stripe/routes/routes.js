const express = require('express');
const { default: Stripe } = require('stripe');
const router = express.Router();
const connected_account = require('../components/functions')
router.get("/", (req, res) => {
    res.send("My app is working");
})

// Now with post request, we will get the product and the token, Then we will generate a unique key(idempotentkey) just to ensure the customer
//is not charged twice, and finally we will create a customer on stripe

router.post("/payment", (req, res) => {
    // We will take the token which contains all the info of customer and product info
    const { product, token } = req.body;
    console("product", product);
    console("Price", product.price);
    // Unique id just to ensure customer is not charged twice for the same product
    const idempotencyKey = uuid()

    return stripe.customers.create({
        //Create a customer when api hits
        email: token.email,
        source: token.id,
    })
        .then(customer => {
            // Once customer is created have access to the customer object and create charge
            stripe.charges.create({
                amount: product.price * 100,
                currency: "usd",
                customer: customer.id,
                recipient_email: token.email,
                description: `purchase of prouct.name`,
                shipping: {
                    name: token.card.name,
                    address: {
                        country: token.card.adress_country
                    }
                }
            }, { idempotencyKey })
        })
        // If everything works properly respond else give error
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            // Deal with an error
            console.log(err)
        });
});

router.post("/v1/accounts",connected_account.createConnectedAccount)
router.post("/v1/account_links", connected_account.createAccountLink)
router.delete("v1/accounts/:id",connected_account.deleteAccount)
router.get("/v1/accounts", connected_account.listConnectedAccounts)


module.exports = router