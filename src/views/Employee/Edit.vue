<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Edit Employee</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-danger" v-if="Object.keys(this.errorList).length > 0">
                    <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
                        {{ error[0] }}
                    </li>
                </ul>
                <form action="" method="post">
                    <div class="mb-3">
                        <label for="">Full Name</label>
                        <input type="text" class="form-control" name="full_name" v-model="model.employee.full_name" id="">
                    </div>
                      <div class="mb-3">
                        <label for="">Company</label>
                        <input type="text" class="form-control" name="company_id" v-model="model.employee.company_id" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Email</label>
                        <input type="email" class="form-control" name="email" v-model="model.employee.email" id="">
                    </div>
                    <div class="mb-3">
                        <label for="">Phone</label>
                        <input type="text" class="form-control" name="website" v-model="model.employee.phone" id="">
                    </div>
                    <button type="button" @click="updateEmployee()" class="btn btn-primary btn-sm">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    
    export default {
        name: "employeeEdit",
        data() {
            return {
                employeeId: '',
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

        mounted()
        {
            // console.log(this.$route.params.id)
            this.employeeId = this.$route.params.id
            this.getEmployeeData(this.$route.params.id)
        },

        methods: {
            getEmployeeData(employeeId)
            {
                const token = localStorage.getItem('token')
                axios.get(`http://localhost:8000/api/employee/${employeeId}`, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                    .then(res => {
                        // console.log(res)

                        this.model.employee.full_name = res.data.data.full_name
                        this.model.employee.email = res.data.data.email
                        this.model.employee.phone = res.data.data.phone
                        this.model.employee.company_id = res.data.data.company_id
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

            updateEmployee() {
                var mythis = this;

                const token = localStorage.getItem('token')

                axios.put(`http://localhost:8000/api/employee/${this.employeeId}/update`, this.model.employee, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
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