import CryptoJS from 'crypto-js'
// import { JSEncrypt } from 'jsencrypt'

// //此处公钥为后端给的
// const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCizj7UJh/wJOCGYN/EDV/BMYzj5ARnjZX7ErKT62P+8/0xu2+63Arjg+SUa4V4vTFuS/B2s1VbVnu7mQSNKbohOQPtG9M0P+4OIv4g8OpXYxzqM+8u2nMBd2wtQYlRyYHDiXs6yZmJ1NUg4qUTZGCxek+FKxXPD1o0QHslYzidWQIDAQAB
// -----END PUBLIC KEY-----`
// 默认的KEY与iv与后端保持一致，不采用后端传值密钥
// const KEY = CryptoJS.enc.Utf8.parse('VASDASFXDSDWERAS');// 密钥
const KEY =  CryptoJS.enc.Utf8.parse("VX\0\0\0\0\0\0\0\0\0\0\0\0\0\0"); // MySQL中使用的两位密钥
// const key1 = 'VX'; // MySQL中使用的两位密钥
// const IV = CryptoJS.enc.Utf8.parse("E9JD/=WFA124DS2F");// 偏移量 
//加密





export default {
    //AES加密
    encryptAes(word) {
        // let key = KEY;
        // let iv = IV;

        // if (keyStr) {
        //     // key = CryptoJS.enc.Utf8.parse(keyStr);
        //     // iv = CryptoJS.enc.Utf8.parse(ivStr);
        // }

        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
            // iv: iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

    },
    //AES解密
    decryptAes(word) {

        let base64 = CryptoJS.enc.Base64.parse(word);
        let src = CryptoJS.enc.Base64.stringify(base64);

        var decrypt = CryptoJS.AES.decrypt(src, KEY, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();

    },
    // jm(encryptedDataHex) {
    //     let encryptedData = CryptoJS.enc.Hex.parse(encryptedDataHex).toString(CryptoJS.enc.Base64);
    //     // 解密方法
    //     const decrypted = CryptoJS.AES.decrypt(
    //         {
    //             ciphertext: CryptoJS.enc.Base64.parse(encryptedData),
    //         },
    //         CryptoJS.enc.Utf8.parse(key1),
    //         {
    //             mode: CryptoJS.mode.ECB,
    //             padding: CryptoJS.pad.Pkcs7,
    //         }
    //     ).toString(CryptoJS.enc.Utf8);
    //     return decrypted;
    // },
    // jm1() {
    //     // 解密函数
    //     function decryptAES(encryptedData,) {
    //         const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, 'VX\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
    //         const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    //         return decryptedData;
    //     }

    //     // 解密示例
    //     const encryptedDataFromBackend = 'p9tUaBMyZSg154Y5sic8Fw==' // 后端加密后的数据

    //     const decryptedData = decryptAES(encryptedDataFromBackend);
    //     return decryptedData;

    // }
    /* RSA加密 */
    // encryptRsa(data) {
    //     // 公钥,，复制前面生成的公钥
    //     // 使用公钥加密
    //     const encrypt = new JSEncrypt()
    //     encrypt.setPublicKey(PUBLIC_KEY)
    //     let result = encrypt.encrypt(data)
    //     return result
    // },
    /*  RSA解密 - PRIVATE_KEY - 验证 */
    // decryptRsa(data) {
    //     //私钥，复制对应的私钥用于解密
    //     const decrypt = new JSEncrypt()
    //     decrypt.setPrivateKey(PUBLIC_KEY)
    //     let result = decrypt.decrypt(data)
    //     return result
    // }
}

