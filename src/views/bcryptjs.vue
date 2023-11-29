<template>
    <div>
      <h1>Bcrypt Demo</h1>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" />
      </div>
      <button @click="hashPassword">Hash Password</button>
      <p v-if="hashedPassword">Hashed Password: {{ hashedPassword }}</p>
      <div>
        <label>Verify Password:</label>
        <input v-model="passwordToVerify" type="password" />
      </div>
      <button @click="verifyPassword" :disabled="!hashedPassword">Verify Password</button>
      <p v-if="isPasswordValid !== null">
        Password is {{ isPasswordValid ? "valid" : "invalid" }}
      </p>
    </div>
  </template>
  
  <script>
  import bcrypt from "bcryptjs";
  
  export default {
    data() {
      return {
        password: "",
        hashedPassword: "",
        passwordToVerify: "",
        isPasswordValid: null,
      };
    },
    methods: {
      hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.hashedPassword = bcrypt.hashSync(this.password, salt);
      },
      verifyPassword() {
        this.isPasswordValid = bcrypt.compareSync(
          this.passwordToVerify,
          this.hashedPassword
        );  
      },
    },
  };
  </script>