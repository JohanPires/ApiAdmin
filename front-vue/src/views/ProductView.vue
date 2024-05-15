<script>

import axios from "axios";

export default {

    props :{
        product : {}
    },


    data () {
        return {
            id : this.product.id,
            name : this.product.name,
            description : this.product.description,
            price : this.product.price,
            stock : this.product.stock,
            picture : this.product.picture,
            Allcategories :[],
            edit: false,
        }
    },

    mounted(){
      
            axios
            .get(`http://127.0.0.1:8000/api/v1/categories` ,{
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "multipart/form-data"
                }
            })
            .then(res => {
                this.Allcategories = res.data
                
            })
            .catch(error => console.error(error));
        
    },

    methods : {
        deleteProduct(id){
            axios
            .delete(`http://127.0.0.1:8000/api/v1/products/${id}`, {
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "application/json"
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.error(error));
        },


        previewFiles(event){
            this.product.picture = event.target.files[0]
            console.log(this.product.picture);
        },

    
        editProduct(id) {
            let pictureFormData;
            if (typeof this.product.picture === 'string') {  
                pictureFormData = {};   
                
            } else {
                pictureFormData = new FormData();
                pictureFormData.append('picture', this.product.picture);
            }

                axios
            .post(`http://127.0.0.1:8000/api/v1/products/picture/${id}`, pictureFormData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    "Content-type": "multipart/form-data"
                }
            })
            .then(() => {
                let formData = new FormData();
                let idCateArray = [];
                this.product.categories.forEach(element => {
                    idCateArray.push(element.id)
                });
                let strinCate = idCateArray.join(',')
                console.log(this.product.categories);
                formData.append('name', this.product.name);
                formData.append('description', this.product.description);
                formData.append('stock', this.product.stock);
                formData.append('price', this.product.price);
                formData.append('categories', strinCate);


                axios
                .put(`http://127.0.0.1:8000/api/v1/products/${id}`, formData, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                        "Content-type": "application/json"
                    }
                })
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        },


        stockEdit(id, change){

            let formData = new FormData();
            formData.append('name', this.product.name);
            formData.append('description', this.product.description);
            if (change === 'plus') {
                formData.append('stock', String(this.product.stock + 1));
            } else {
                formData.append('stock', String(this.product.stock - 1));
            }
            formData.append('price', String(this.product.price));
            formData.append('categories', String(this.product.categories));

            axios
            .put(`http://127.0.0.1:8000/api/v1/products/${id}`, formData, {
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
                "Content-type": "application/json"
                }
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.error(error));
        },


        checkEdit() {
            if (this.edit) {
                this.edit = false
            } else {
                this.edit = true
            }
            console.log(this.Allcategories);
        },

        isCategorySelected(categoryId) {
        return this.product.categories.some(cat => cat.id === categoryId);
        },

        toggleCategorySelection(categoryId) {
            const index = this.product.categories.findIndex(cat => cat.id === categoryId);
            if (index !== -1) {
                this.product.categories.splice(index, 1);
            } else {
                this.product.categories.push(this.Allcategories.find(cat => cat.id === categoryId));
            }
        }
    }
   
}

</script>


<template >
    <div v-if="!edit" class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="flex font-sans">
    <div class="flex-none w-48 relative">
      <img v-if="product.picture" :src="'http://127.0.0.1:8000/images/' + product.picture" alt="" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    </div>
    <div class="flex-auto p-6">
      <div class="flex flex-wrap">
        <h3 class="flex-auto text-xl font-semibold text-gray-900">{{ product.name }}</h3>
        <div class="text-lg font-semibold text-black-500">
          {{ product.price }}
        </div>
        <div class="w-full flex-none text-sm font-medium text-black-700 mt-2" v-if="product.stock > 0">
          In stock
        </div>
        <div class="w-full flex-none text-sm font-medium text-red-700 mt-2" v-else>
          Out of stock
        </div>
      </div>
      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        <ul class="space-x-2 flex text-sm">
          <li v-for="categorie in product.categories" :key="categorie.id">{{ categorie.name }}</li>
        </ul>
      </div>
      <button class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900" type="button" v-on:click="checkEdit()">
        Modifier
      </button>
      <button class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900" type="button" v-on:click="deleteProduct(product.id)">
        Supprimer
      </button>
      <button class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900" type="button" v-on:click="stockEdit(product.id, 'plus')">
        +
      </button>
      <button class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900" type="button" v-on:click="stockEdit(product.id, 'moins')">
        -
      </button>
      <p class="text-sm text-slate-700">
        Free shipping
      </p>
    </div>
  </div>
</div>

    <!-- <ul v-if="!edit">
        <h3>{{ product.name }}</h3>
        <li>
            <p>
            {{ product.description}}
            </p>
        </li>
        <li>
            {{ product.price }}
        </li>
        <li>
            {{ product.stock }}
        </li>
        <ul  v-for="categorie in product.categories" >
            <li>{{ categorie.name }}</li>
        </ul>
      
        <img v-if="product.picture" :src="'http://127.0.0.1:8000/images/' + product.picture" alt="">

        <button v-on:click="checkEdit()">Modifier</button>
        <button v-on:click="deleteProduct(product.id)">Supprimer</button>
        <button v-on:click="stockEdit(product.id, 'plus')">+</button>
        <button v-on:click="stockEdit(product.id, 'moins')">-</button>
    </ul> -->
    <ul v-if="edit" >
            <input v-model="product.name" type="text">
            <textarea v-model="product.description"></textarea>
            <input v-model="product.price" type="number">
            <input v-model="product.stock" type="number">
            <div class="checkbox" v-for="categorie in Allcategories" :key="categorie.id">
                <input 
                type="checkbox" 
                :value="categorie.id" 
                :checked="isCategorySelected(categorie.id)"
                @change="toggleCategorySelection(categorie.id)"
                >
                <label>{{ categorie.name }}</label>
            </div>
            <input @change="previewFiles" type="file">
            <button v-on:click="editProduct(product.id)">Valider</button>
            <button v-on:click="checkEdit()">Annuler</button>

    </ul>
</template>

