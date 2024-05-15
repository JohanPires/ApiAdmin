<script>

import axios from 'axios';

export default {

   data () {
        return {
            product :{
                name : '',
                description : '',
                price : '',
                stock : '',
                picture : '',
            },
            categories : [],
            selectedCategories : [],
        }
    }, 

    mounted(){
        this.getCategories();
    },

    methods : {

        previewFiles(event) {
          this.product.picture = event.target.files[0]
        },


        createProduct(){

            // this.selectedCategories = 

            let formData = new FormData();
                formData.append('name', this.product.name);
                formData.append('description', this.product.description);
                formData.append('stock', String(this.product.stock));
                formData.append('price', String(this.product.price));
                formData.append('picture', this.product.picture);
                formData.append('categories', this.selectedCategories);


            axios
            .post(`http://127.0.0.1:8000/api/v1/products`, formData ,{
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "multipart/form-data"
                }
            })
            .then(res => {
                console.log(res.data);
                window.location.replace('http://localhost:5173/home');
            })
            .catch(error => console.error(error));
        },

        getCategories() {
            axios
            .get(`http://127.0.0.1:8000/api/v1/categories` ,{
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "multipart/form-data"
                }
            })
            .then(res => {
                console.log(res.data);
                this.categories = res.data
                // window.location.replace('http://localhost:5173/home');
            })
            .catch(error => console.error(error));
        }

    }
}

</script>

<template>
    <form action="" @submit.prevent="createProduct()">
        <input v-model="this.product.name" placeholder="Entrer un nom" type="text">
        <textarea v-model="this.product.description" placeholder="Entrer une description"></textarea>
        <input v-model="this.product.price" placeholder="Entrer un prix" type="number">
        <input v-model="this.product.stock" placeholder="Entrer un stock" type="number">
        <div class="checkbox" v-for="categorie in categories" :key="categorie.id">
            <input type="checkbox" :value="categorie.id" v-model="selectedCategories" >
        <label>{{ categorie.name }}</label>
        </div>
        <input @change="previewFiles" type="file">
        <input type="submit">
    </form>
</template>