<template>
  <form class="login-form" @submit="onSubmit" autocomplete="off">
    <h1>
      <span>Login</span>
      <span class="error-msg" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input
      type="text"
      class="login-input"
      placeholder="username"
      v-model="username"/>
      <input
        type="password"
        class="login-input"
        placeholder="password"
        autocomplete="off"
        v-model="password"/>
      <button type="submit" class="login-btn">Login</button>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  metaInfo: {
    title: 'Login'
  },
  data () {
    return {
      errorMsg: '',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    onSubmit (e) {
      e.preventDefault()
      if (this.validate()) {
        this.login({
          username: this.username,
          password: this.password
        }).then(() => {
          this.$router.replace({
            path: '/app'
          })
        }).catch(() => {})
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = 'username cannot be empty.'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = 'password cannot be empty.'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style lang="scss">
.login-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
  h1 {
    font-weight: 100;
    color: #3d3d3d;
    margin-bottom: 10px;
  }
  .login-input {
    appearance: none;
    padding: 0 10px;
    line-height: 30px;
    margin-bottom: 20px;
    border: 1px solid #aaa;
    width: 100%;
    border-radius: 0;
    box-shadow: 0 0 0;
    box-sizing: border-box;
  }
  .login-btn {
    appearance: none;
    width: 100%;
    line-height: 30px;
    text-align: center;
    background-color: #0d60c7;
    color: #eaeaea;
    cursor: pointer;
    border-color: #0d60c7;
    transition: all .3s;
    &:hover {
      color: #fff;
      background-color: darken(#0d60c7, 10);
    }
  }
  .error-msg {
    font-size: 12px;
    color: red;
  }
}

@media screen and (max-width: 600px) {
  .login-form {
    width: 90%
  }
  .login-input{
    line-height: 40px
  }
}

</style>
