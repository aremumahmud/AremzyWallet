// require('dotenv').config()

const forge = require('node-forge')
const axios = require('axios');

async function generateKey() {


    const options = {
        method: 'GET',
        url: 'https://api.circle.com/v1/w3s/config/entity/publicKey',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.CIRCLE_KEY}`
        }
    };

    let pkey = await axios.request(options)

    // console.log(pkey.data.data.publicKey)


    const entitySecret = forge.util.hexToBytes(process.env.ENTITY_SECRET);

    const publicKey = forge.pki.publicKeyFromPem(pkey.data.data.publicKey);

    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', { md: forge.md.sha256.create(), mgf1: { md: forge.md.sha256.create(), }, });

    return forge.util.encode64(encryptedData)
}


module.exports = generateKey