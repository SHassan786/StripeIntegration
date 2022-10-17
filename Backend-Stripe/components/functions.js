const stripe = require('stripe')("sk_test_51LiJglHhAC2PEDzAR6Vrsp9YHKWgpKMDmuJX8ImommMzz10baDoUJFB0Zgc7uUVY1CE2WVogGHwFZnzhlCVMU7PY0034xhAAhK")

async function createConnectedAccount(req, res) {
    try {
        let { type, country, email } = req.body;

        let account = await stripe.accounts.create({
            type: type,
            country: country,
            email: email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        })
        res.status(200).send({ account })
    } catch (error) {
        console.log(error)

    }
}

async function createAccountLink(req, res) {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: "acct_1LjjDvQX02uXWtFZ",
            refresh_url: 'http://localhost:4000/reauth',
            return_url: 'http://localhost:4000/return',
            type: 'account_onboarding',
        });
        console.log(accountLink)
        res.status(400).send({ accountLink });

    } catch (error) {
        console.log(error)
    }
}

async function deleteAccount(req, res) {
    try {
        let id = req.params.id;
        console.log(id)
        const deleted = await stripe.accounts.del(id);

    } catch (error) {
        console.log(error);
    }
}

async function listConnectedAccounts(req, res) {
    try {
        const accounts = await stripe.accounts.list({
            limit: 5,
        });
        res.send({ accounts })

    } catch (error) {
        console.log(error);

    }
}
module.exports = {
    createConnectedAccount,
    createAccountLink,
    deleteAccount,
    listConnectedAccounts
}

