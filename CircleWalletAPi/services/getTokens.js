const axios = require('axios');

// require('dotenv').config()
async function FetchTokens(wallet_id) {
    if (!wallet_id) return []
    const options = {
        method: 'GET',
        url: `https://api.circle.com/v1/w3s/wallets/${wallet_id}/balances`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ process.env.CIRCLE_KEY }`
        }
    };

    let response = await axios.request(options)
    return response.data.data.tokenBalances
}


FetchTokens()

module.exports = FetchTokens