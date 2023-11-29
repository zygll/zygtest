<template>
    <div>
      <input type="text" v-model="inputText" placeholder="输入文本" />
      <input type="text" v-model="secretKey" placeholder="输入密钥" />
      <button @click="encryptText">加密</button>
      <button @click="decryptText">解密</button>
      <p >加密后的值: {{ encryptedText }}</p>
      <p>解密后的值: {{ decryptedText }}</p>
    </div>
  </template>
  
  <script>
  import CryptoJS from "crypto-js";
  
  export default {
    data() {
      return {
        inputText: "",
        secretKey: "",
        encryptedText: "",
        decryptedText: "",
      };
    },
    methods: {
      encryptText() {
        const cipher = CryptoJS.AES.encrypt(
          this.inputText,
          this.secretKey
        ).toString();
        this.encryptedText = cipher;
      },
      decryptText() {
        const bytes = CryptoJS.AES.decrypt(this.encryptedText, this.secretKey);
        this.decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      },
    },
  };
  </script>