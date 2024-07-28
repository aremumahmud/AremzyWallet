const axios = require('axios');

const { v4: uuidV4 } = require('uuid');
const generateKey = require('./generatekey');

const options = (walletSetId, key) => ({
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/developer/wallets',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_KEY}` },
    data: {
        idempotencyKey: uuidV4(),
        entitySecretCipherText: key,
        blockchains: [
            "SOL-DEVNET"
        ],
        count: 2,
        walletSetId
    }
});


async function createWallets(walletSetId) {

    try {
        let key = await generateKey()
        let response = await axios.request(options(walletSetId, key))
        let { data } = response


        return data.data.wallets
    } catch (err) {
        console.log(err.response)
    }

}

module.exports = createWallets