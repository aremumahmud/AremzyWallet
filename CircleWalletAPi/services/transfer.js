const axios = require('axios');

const { v4: uuidV4 } = require('uuid');
const generateKey = require('./generatekey');

const options = (key, amount, tokenId, walletId, dest) => ({
    method: 'POST',
    url: 'https://api.circle.com/v1/w3s/developer/transactions/transfer',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CIRCLE_KEY}` },
    data: {
        idempotencyKey: uuidV4(),
        entitySecretCipherText: key,
        destinationAddress: dest,
        amounts: [String(amount)],
        feeLevel: 'HIGH',
        tokenId,
        walletId
    }
});


async function TransferCrypto(amount, tokenId, wallet_id, destinationAddress) {
    try {
        let key = await generateKey()
        let response = await axios.request(options(key, amount, tokenId, wallet_id, destinationAddress))
        let { data } = response

        return data.data
    } catch (err) {
        console.log(err.response.data)
    }


}

module.exports = TransferCrypto