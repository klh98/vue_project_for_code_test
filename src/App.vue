<template>
  <header>
    <div class="wrapper">

      <nav v-if="this.$route.name != 'login'" class="navbar navbar-expand-lg navbar-light bg-light">
        <RouterLink class="navbar-brand" to="/">
          <img src="../public/img/logo.png" width="50" height="50" alt="">
          <!-- Logo -->
        </RouterLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <RouterLink to="/" class="nav-link active">Home</RouterLink>
            </li>
            <!-- <li class="nav-item">
              <RouterLink to="/about" class="nav-link">About</RouterLink>
            </li> -->
            <li class="nav-item">
              <RouterLink to="/company" class="nav-link">Company</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/employee" class="nav-link">Employee</RouterLink>
            </li>
            <li class="nav-item">
              <a href="" @click="logout" class="btn btn-danger btn-sm mt-1">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

    

      
    </div>
  </header>

  <RouterView />
</template>

<script>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

export default{
  name: "App",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({name : 'login'})
    }
  },
}
</script>

<style scoped>

</style>
