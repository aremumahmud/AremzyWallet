const axios = require('axios');
const { v4: uuidV4 } = require('uuid');
const generateKey = require('./generatekey');

const options = (wallet_name, key) => ({
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/developer/walletSets',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_KEY}` },
    data: {
        idempotencyKey: uuidV4(),
        entitySecretCipherText: key,
        name: wallet_name
    }
});



async function createWalletSet(wallet_name) {

    try {
        let key = await generateKey()
        let response = await axios.request(options(wallet_name, key))
        let { data } = response


        return data
    } catch (err) {
        console.log(err.response)
    }

}

module.exports = createWalletSet