<script setup>
    import { RouterLink, RouterView} from 'vue-router'
    import { ref } from 'vue'
    import { useTokensStore } from '../stores/tokens';
    const tokens = useTokensStore();
    let username = ref("");
    let password = ref("");
    function login(){
        const data = {username:username.value, password:password.value};
        console.log(data);
        fetch("http://127.0.0.1:3000/register/login",{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
            'Content-type':'application/json',
            },
        })
        .then(response => response.json())
        .then(data =>{
            console.log('response from server:',data)
            tokens.setTokens(data);
        })
    }
</script>
<template>
    <div>
        <header>
        <div class="wrapper">
        <form>
          <label>Login</label>
          <label>Username</label>
          <input type="text" v-model="username" placeholder="username">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="password">
          <input type="submit" value="login" @click.prevent="login()">
        </form>
    </div>
  </header>
    </div>
</template>
<style>
    form{
        display: flex;
        flex-direction: column;
    }
</style>