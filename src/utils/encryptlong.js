import Encrypt from 'encryptlong'
const publicKey='shdakjhkahd'//此处公钥为后端给的
const privateKey='sdjhskh'//此处私钥为后端给的
/* 加密 */
  encrypt(data) {
    const PUBLIC_KEY = publicKey
    var encryptor = new Encrypt()
    encryptor.setPublicKey(PUBLIC_KEY)
    const result = encryptor.encryptLong(data)
    return result
  },
  /* 解密 - PRIVATE_KEY - 验证 */
  decrypt(data) {
    const PRIVATE_KEY = privateKey
    var encryptor = new Encrypt()
    encryptor.setPrivateKey(PRIVATE_KEY)
    var result = encryptor.decryptLong(data)
    return result
  }