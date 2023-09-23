<template>
    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">Login Form</div>
        
                    <div class="card-body">
                        <form @submit.prevent="handleLogin">
                           
        
                            <div class="row mb-3">
                                <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>
        
                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" v-model="form.email">
        
                                </div>
                            </div>
        
                            <div class="row mb-3">
                                <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
        
                                <div class="col-md-6">
                                    <input id="password" type="password" v-model="form.password" class="form-control">
        
                                </div>
                            </div>
        
                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
   
    import axios from 'axios'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter();

    const form = ref({
        email : '',
        password : ''
    })
    
    const handleLogin = async() => {
      const res =  await axios.post('http://localhost:8000/api/login', {
            email : form.value.email, 
            password : form.value.password
        });
        localStorage.setItem('token', res.data.data.access_token)
        console.log(res)
        router.push('/');
    }


</script>

<style lang="scss" scoped>

</style>