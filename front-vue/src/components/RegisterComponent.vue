<script>

import axios from 'axios';

export default{


    data(){
        return{
            user: {
                name: '',
                email: '',
                password: '',
            }
        }
    },

methods : {
    createUser() {
        let formData = new FormData();
                formData.append('name', this.user.name);
                formData.append('email', this.user.email);
                formData.append('password', this.user.password);


            axios
            .post(`http://127.0.0.1:8000/api/v1/register`, formData ,{
                headers: {
                "Content-type": "application/json"
                }
            })
            .then(res => {
                const token = res.data.token;
                const id = res.data.lastUser;
                localStorage.setItem('token', token)
                localStorage.setItem('id', id)
                window.location.replace('http://localhost:5173/home')
            })
            .catch(error => console.error(error));
    }
}
}


</script>

<template>
    <h1>Vous êtes sur le register</h1>
    <form action="" @submit.prevent="createUser()">
        <label for="name">Nom</label>
        <input v-model="user.name" type="text" name="name">
        <label for="email">Email</label>
        <input v-model="user.email" type="email" name="email">
        <label for="password">Mot de passe</label>
        <input v-model="user.password" type="password" name="password">
        <input type="submit">
    </form>
</template>