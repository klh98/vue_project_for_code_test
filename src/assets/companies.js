import ref from 'vue'
import axios from 'axios'

export default function useCompanies() {
    const companies = ref({})

    const getCompanies = async() => {
        axios.get('http://localhost:8000/api/company')
            .then(res => {
                companies.value =response.data.data
            })
    }
    return { companies, getCompanies }
}