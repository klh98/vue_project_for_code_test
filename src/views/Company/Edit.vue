<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Company</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <form action="" method="post">
                    <div class="mb-3">
                        <label for="">Company Name</label>
                        <input type="text" class="form-control" name="name" v-model="model.company.name" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Email</label>
                        <input type="email" class="form-control" name="email" v-model="model.company.email" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Website</label>
                        <input type="text" class="form-control" name="website" v-model="model.company.website" id="">
                    </div>
                    <button type="button" @click="updateCompany()" class="btn btn-primary btn-sm">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: "companyEdit",
        data() {
            return {
                companyId: '',
                errorList : '',
                model: {
                    company:{
                        name: '',
                        email: '',
                        website: '',
                        logo: '',
                    }
                }
            }
        },

        mounted()
        {
            // console.log(this.$route.params.id)
            this.companyId = this.$route.params.id
            this.getCompanyData(this.$route.params.id)
        },

        methods: {
            getCompanyData(companyId)
            {   const token = localStorage.getItem('token')

                axios.get(`http://localhost:8000/api/company/${companyId}`, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then(res => {
                        // console.log(res)

                        this.model.company.name = res.data.data.name
                        this.model.company.email = res.data.data.email
                        this.model.company.website = res.data.data.website
                    })
                    .catch(function(error){
                    if(error.response)
                    {
                        if(error.response.status == 404)
                        {
                           alert('No Data Found')
                        }
                    }
                  
                    })
            },

            updateCompany() {
                var mythis = this;
                axios.put(`http://localhost:8000/api/company/${this.companyId}/update`, this.model.company)
                    .then(res => {
                        console.log(res.data)
                        alert(res.data.message)
                      
                        this.errorList = ''
                })
                .catch(function(error){

                    if(error.response)
                    {
                        if(error.response.status == 422)
                        {
                            mythis.errorList = error.response.data;
                        }

                        if(error.response.status == 404)
                        {
                           alert('No Data Found')
                        }

                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                    }
                    else if(error.request)
                    {
                        console.log(error.request);
                    }
                    else
                    {
                        console.log('Error', error.message);
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>