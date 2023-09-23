
<template>
    <main>
      <div class="container mt-5">
        <div class="card">
          <div class="card-header">
            <h4>Companies</h4>
            <RouterLink to="/company/create" class="btn btn-primary btn-sm" style="float: right">Add Company</RouterLink>
          </div>
          <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Logo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody v-if="this.companies.length > 0">
                    <tr v-for="(company, index) in this.companies" :key="index">
                        <td>{{ company.id }}</td>
                        <td>{{ company.name }}</td>
                        <td>{{ company.email }}</td>
                        <td>{{ company.website }}</td>
                        <td><img :src="'/storage/app/media/'+company.logo" alt="company_logo"></td>
                        <td class="d-flex">
                            <RouterLink :to="{path: 'company/' +company.id+ '/edit'}" class="btn btn-info mr-2">Edit</RouterLink>
                            <button class="btn btn-danger" @click="deleteCompany(company.id)">Delete</button>
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
    name: "companies",
    data() {
        return {
            companies: [],

        }
    },

    mounted()
    {
        // console.log('hello')
        this.getCompanies();
    },

    methods: {
        getCompanies() {

            const token = localStorage.getItem('token')

            axios.get('http://localhost:8000/api/company', {
                headers: {'Authorization': `Bearer ${token}`}
            }).then(res => {
               
                this.companies = res.data.data
                console.log(this.companies)
            })
        },

        deleteCompany(companyId)
        {
            // console.log(companyId)
            const token = localStorage.getItem('token')

            if(confirm('Are you sure to delete this?'))
            {
                axios.get(`http://localhost:8000/api/company/${companyId}/delete`, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                .then(res => {
                        alert(res.data.message)
                        this.getCompanies()
                    })
            }
        }
    },

}

</script>
  