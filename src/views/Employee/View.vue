
<template>
    <main>
      <div class="container mt-5">
        <div class="card">
          <div class="card-header">
            <h4>Employees</h4>
            <RouterLink to="/employee/create" class="btn btn-primary btn-sm" style="float: right">Add Employee</RouterLink>
          </div>
          <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="this.employees.length > 0">
                    <tr v-for="(employee, index) in this.employees" :key="index">
                        <td>{{ employee.id }}</td>
                        <td>{{ employee.full_name }}</td>
                        <td>{{ employee.company_id}}</td>
                        <td>{{ employee.email }}</td>
                        <td>{{ employee.phone }}</td>
                        <td class="d-flex">
                            <RouterLink :to="{path: 'employee/' +employee.id+ '/edit'}" class="btn btn-info mr-2">Edit</RouterLink>
                            <button class="btn btn-danger" @click="deleteEmployee(employee.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6"><p class="text-center">Loading...</p></td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
</template>

<script>

import axios from 'axios'

export default{
    name: "employee",
    data() {
        return {
            employees: [],
        }
    },

    mounted()
    {
        // console.log('hello')
        this.getEmployee();
    },

    methods: {
        getEmployee() {

            const token = localStorage.getItem('token')

            axios.get('http://localhost:8000/api/employee', {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(res => {
                this.employees = res.data.data
                console.log(this.employees)
            })
        },

        deleteEmployee(employeeId)
        {
            // console.log(employeeId)

            const token = localStorage.getItem('token')

            if(confirm('Are you sure to delete this?'))
            {
                axios.get(`http://localhost:8000/api/employee/${employeeId}/delete`, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                .then(res => {
                        alert(res.data.message)
                        this.getEmployee()
                    })
            }
        }
    },

}

</script>

<style lang="scss" scoped>

</style>