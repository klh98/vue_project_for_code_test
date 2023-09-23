<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Employee</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <form action="" method="post" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="">Employee Name</label>
                        <input type="text" class="form-control" name="full_name" v-model="model.employee.full_name" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">CompanyId</label>
                        <input type="text" class="form-control" name="company_id" v-model="model.employee.company_id" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Email</label>
                        <input type="email" class="form-control" name="email" v-model="model.employee.email" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Phone</label>
                        <input type="text" class="form-control" name="phone" v-model="model.employee.phone" id="">
                    </div>
                    <button type="button" @click="saveEmployee()" class="btn btn-primary btn-sm">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { ref, onMounted } from 'vue'

    export default {
        name: "companyCreate",
        data() {
            return {
                errorList : '',
                model: {
                    employee:{
                        full_name: '',
                        email: '',
                        phone: '',
                        company_id: '',
                    }
                }
            }
        },

        methods: {
            saveEmployee() {

                var mythis = this;

                const token = localStorage.getItem('token')

                axios.post('http://localhost:8000/api/employee',   this.model.employee,  {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then(res => {
                        console.log(res.data)
                        alert(res.data.message)    
                        this.model.employee = {
                            full_name: '',
                            company_id: '',
                            email: '',
                            phone: '',
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


            }
        },

        // const { companies, getCompanies } = useCompanies()

        // onMounted(()=>{
        //     getCompanies()
        // })

        // return{companies}
}
</script>

<style lang="scss" scoped>

</style>