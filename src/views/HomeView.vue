<template>
  <div>
    <h4 class="text-center mt-4">Welcome to Home Page</h4>
    <p>{{ user?.name }}</p>
    <p>{{ user?.email }}</p>
  </div>
</template>

<script setup>
  
  import axios from 'axios'
  import { ref, onMounted } from 'vue'

  const user = ref();
  onMounted(async() => {

    const token = localStorage.getItem('token')

    const data = await axios.get('http://localhost:8000/api/profile', {
      headers: {'Authorization': `Bearer ${token}`},
    })
    // console.log(data)

    user.value = data.data;
  });


</script>

<style lang="scss" scoped>

</style>