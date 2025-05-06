import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default {
    async getDespesas(params = {}) {
        const response = await api.get('/despesas/', { params })
        return response.data
    },

    async getDespesa(id) {
        const response = await api.get(`/despesas/${id}/`)
        return response.data
    },

    async createDespesa(despesaData) {
        const response = await api.post('/despesas/', despesaData)
        return response.data
    },

    async updateDespesa(id, despesaData) {
        const response = await api.put(`/despesas/${id}/`, despesaData)
        return response.data
    },

    async deleteDespesa(id) {
        await api.delete(`/despesas/${id}/`)
    }
}