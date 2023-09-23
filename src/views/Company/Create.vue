<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Company</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <form action="" method="post" enctype="multipart/form-data">
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
                    <div class="mb-3">
                        <label for="" class="mr-2">Company Logo</label>
                        <input type="file" @change="handleFileUpload" ref="logo" name="logo" id="">
                    </div>
                    <button type="button" @click="saveCompany()" class="btn btn-primary btn-sm">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "companyCreate",
        data() {
            return {
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
        methods: {
            saveCompany() {
                var mythis = this;

                const token = localStorage.getItem('token')

                axios.post('http://localhost:8000/api/company', this.model.company, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then(res => {
                        console.log(res.data)
                        alert(res.data.message)    
                        this.model.company = {
                            name: '',
                            email: '',
                            website: '',
                        }
                        this.errorList = ''

                        let formData = new FormData();
                        formData.append('name', this.model.name)
                        formData.append('email', this.model.email)
                        formData.append('website', this.model.website)
                        formData.append('logo', this.model.logo)
                })

                .catch(function(error){

                    if(error.response)
                    {
                        if(error.response.status == 422)
                        {
                            mythis.errorList = error.response.data;
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

                handleFileUpload()
                {
                    this.logo = this.$refs.logo.file.files[0]
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>