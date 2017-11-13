/**
 * Verifier module
 * @module verifier
 */

const crypto = require('crypto');
const MAX_ROLL = 999999;
const CHUNK_SIZE = 5;
const HEX_RADIX = 16;

/**
 * Class holding static utility methods for generating bet results
 */
class Verifier {

    /**
     * Returns the hash generated from a set of bet data
     * @param {!string} serverSeed - The server seed
     * @param {!string} clientSeed - The client seed
     * @param {!number} nonce - The nonce
     */
    static getHashFromSeeds(serverSeed, clientSeed, nonce) {
        let hash = crypto.createHmac('sha512', Buffer.from(serverSeed, 'hex'));
        hash.update(`${clientSeed}.${nonce}`);
        return hash.digest('hex');
    }

    /**
     * Returns a number corresponding to the result from the hash in the range [0,1000000)
     * @param {!string} hash 
     */
    static getRollFromHash(hash) {
        let roll = parseInt(hash.substr(0, CHUNK_SIZE), HEX_RADIX);
        let i = 5;
        while(roll > MAX_ROLL && i < 128) {
            roll = parseInt(hash.substr(i, CHUNK_SIZE), HEX_RADIX);
            i += 5;
        }
        return roll;
    }

    /**
     * Returns the corresponding roll number in the range [0, 1000000) from the set of bet data
     * @param {!string} serverSeed - The server seed
     * @param {!string} clientSeed - The client seed
     * @param {!number} nonce - The nonce
     */
    static getRoll(serverSeed, clientSeed, nonce) {
        return Verifier.getRollFromHash(Verifier.getHashFromSeeds(serverSeed, clientSeed, nonce));
    }

}

module.exports = Verifier;