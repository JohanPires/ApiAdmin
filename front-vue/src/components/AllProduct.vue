<script>
import axios from "axios";
import ProductView from '../views/ProductView.vue';

export default {
  components: {
    ProductView
  },
  data () {
    return {
      products: [],
      Allcategories: [],
      navCate: []
    }
  },

  mounted () {
   


      axios
      .get(`http://127.0.0.1:8000/api/v1/products`, {
        headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token'),
         "Content-type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        this.products = res.data
        axios
      .get(`http://127.0.0.1:8000/api/v1/categories` ,{
          headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          "Content-type": "multipart/form-data"
          }
      })
      .then(res => {
          this.Allcategories = res.data
          console.log(this.Allcategories);
          
      })
      .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
    
  },

  methods : {


    toggleCategorySelection(categoryId) {
      const index = this.navCate.indexOf(categoryId);
      if (!this.navCate.includes(categoryId)) {
        this.navCate.push(categoryId);
        
      } else {
        this.navCate.splice(index, 1);
      }

      if (this.navCate.length > 0) {

        let cate = this.navCate.join(',')

      axios
      .get(`http://127.0.0.1:8000/api/v1/products_categories/${cate}`, {
        headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        this.products = res.data
        
      })
      .catch(error => console.error(error));
      } else {


      axios
      .get(`http://127.0.0.1:8000/api/v1/products`, {
        headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        this.products = res.data
       
      })
      .catch(error => console.error(error));
      }

          
    }


  }


}

</script>

<template>

  <div v-for="categorie in Allcategories" class="nav">
    
    <input 
    type="checkbox" 
    :value="categorie.id" 
    @change="toggleCategorySelection(categorie.id)">
    <label :for="categorie.id">{{ categorie.name }}</label>
  </div>
<div v-for="product in products" :key="product.id">
  <ProductView :product="product"/>
</div>
</template>