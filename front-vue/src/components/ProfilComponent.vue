<script>
import axios from 'axios';

export default {

    data() {
        return {
            users : [],
            password: '',
            edit : false
        }
    },

    mounted() {
        const id = localStorage.getItem('id');
        axios
      .get(`http://127.0.0.1:8000/api/v1/users/${id}`, {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token'),
         "Content-type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        this.users = res.data
      })
      .catch(error => console.error(error));
    },

    methods : {
        editUser(){

            const formData = new FormData;
            formData.append('name', this.users.name)
            formData.append('email', this.users.email)
            formData.append('password', this.password)
            console.log(formData.get('name'));
            console.log(formData.get('email'));

            const id = localStorage.getItem('id');
            axios.put(`http://127.0.0.1:8000/api/v1/users/${id}`, formData, {
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "application/json"
                }
            })
            .then(res => {
                console.log(res.data);
                this.users = res.data
            })
            .catch(error => console.error(error));
        },

        setEdit(){
            if (this.edit) {
                this.edit = false
            } else {
                this.edit = true
            }
        }, 

        deleteUser(){
            const id = localStorage.getItem('id');
            if(confirm('Vous Vous apprêter à effacer votre compte. êtes vous sur ?')){

            axios.delete(`http://127.0.0.1:8000/api/v1/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    "Content-type": "application/json"
        }
            }).then(res => {
                console.log(res);
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                window.location.replace('http://localhost:5173/login')
            })
        }

        }
    }
}

</script>

<template>

    <div v-if="!edit" class="users-container">
        <h3>Nom :{{ users.name }}</h3>
        <p>Email : {{ users.email }}</p>
        <p>Mot de passe : **** </p>
        <button @click="setEdit()">Modifier</button>
    </div>
    <div v-if="edit" class="users-container">
        <input v-model="users.name" type="text">
        <input v-model="users.email" type="email">
        <input v-model="password" type="password">
        <button @click="setEdit()">Annuler</button>
        <button @click="editUser()">Valider</button>
    </div>

    <button @click="deleteUser()">Supprimer mon compte</button>
    
</template>