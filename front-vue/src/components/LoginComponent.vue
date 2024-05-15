<script>

import axios from 'axios';

    export default {

        data() {
            return {
                email: '',
                password: ''
            }
        },

        methods: {


            login() {   
                let formData = new FormData();
                formData.append('email', this.email);
                formData.append('password', this.password);

                axios.post('http://127.0.0.1:8000/api/v1/login', formData,  { headers :{"Content-type": "multipart/form-data"}}).then(res => {
                    const token = res.data.token;
                    const id = res.data.user.id;
                    localStorage.setItem('token', token);
                    localStorage.setItem('id', id);
                    window.location.replace('http://localhost:5173/home')
                })
            }  
        }
    }

</script>

<template>
    <form action="" @submit.prevent="login()">
        <input v-model="this.email" type="email">
        <input  v-model="this.password" type="password">
        <input type="submit">
    </form>
    <a href="http://localhost:5173/register">Si vous n'êtes pas encore inscrit</a>
</template>