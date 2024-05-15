<script>
import { RouterLink, RouterView } from 'vue-router'
import { isLoggedIn } from './utils/auth';

export default {

  computed: {
    userLoggedIn() {
      return isLoggedIn();
    }
  },

  methods : {

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      window.location.replace("http://localhost:5173/login");
    }
  }
}


</script>
<template>
  
  <router-link v-if='userLoggedIn' to="/home">
    Accueil
</router-link>
  <router-link v-if='userLoggedIn' to="/form">
    Ajouter un produit
</router-link>
  <router-link v-if='userLoggedIn' to="/profil">
    Mon profil
</router-link>
<router-link v-if='!userLoggedIn' to="/login">
    Connexion
</router-link>

    <!-- Bouton de déconnexion -->
    <button v-if='userLoggedIn' @click="logout()">Déconnexion</button>

  <!-- <router-link to="/user">
    Ajouter un produit
</router-link> -->
<router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
