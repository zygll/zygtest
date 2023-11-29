<template>
    <div>
        <h1><span class="tag">AES:</span>{{ aesMsg }}</h1>
        <h1><span class="tag">RSA:</span>{{ rsaMsg }}</h1>
        <!-- :disabled="aesDisbled" -->
        <!-- :disabled="!aesDisbled" -->
        <el-button @click="encryptAES">AES加密</el-button>
        <el-button @click="decryptAES">AES解密</el-button>
        <!-- <el-button @click="encryptRSA" :disabled="rsaDisbled">RSA加密</el-button> -->
        <!-- <el-button @click="decryptRSA" >RSA解密</el-button> -->
    </div>
</template>

<script>
import cryptojs from '@/utils/cryptojs.js'
console.log(cryptojs, 'cryptojs');


export default {
    data() {
        return {
            aesMsg: 'p9tUaBMyZSg154Y5sic8Fw==',
            rsaMsg: 'ezWIxNOVoaUkeEqPZ99qnjHqboGJN8Id6YVF3g8oeNvqsdFuBzTXW/zqQI8PXlgyMTvnHN94y6WeYoPj2Lck+yBjndb/UFtrjfQ9cw2yTcz8pRLSCjjDKIc3paSC5cAlPfBviDRU/trZN36KjKCd1dU+J9uvB/G3qkPEb4fSdxA=',
            aesDisbled: false,
            rsaDisbled: false,
        }
    },
    methods: {
        encryptAES() {
            const res = cryptojs.encryptAes(this.aesMsg)
            this.aesMsg = res
            this.aesDisbled = !this.aesDisbled
            console.log(res);
        },
        decryptAES() {
            // const res = cryptojs.decryptAes(this.aesMsg)
            // this.aesMsg = res
            // this.aesDisbled = !this.aesDisbled
            // console.log(res);
            const res = cryptojs.decryptAes(this.aesMsg)
            this.aesMsg = res

        },
        // encryptRSA() {
        //     const res = cryptojs.encryptRsa(this.rsaMsg)
        //     this.rsaMsg = res         
        //        this.rsaDisbled = !this.rsaDisbled
        //     console.log(res);
        // },
        decryptRSA() {
            const res = cryptojs.decryptRsa(this.rsaMsg)
            this.rsaMsg = res
            this.rsaDisbled = !this.rsaDisbled
            console.log(res);
        }
    },
}
</script>

<style>
.tag {
    color: #ffffff;
    background: #409EFF;
    padding: 0 10px;
    border-radius: 5px;
    margin-right: 10px;


}
</style>