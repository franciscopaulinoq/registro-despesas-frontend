import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useDespesasStore = defineStore('despesas', () => {
    const despesas = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchDespesas = async (params = {}) => {
        loading.value = true
        try {
            const data = await api.getDespesas(params)
            despesas.value = data
        } catch (err) {
            error.value = err.response?.data || err.message
            console.error('Erro ao buscar despesas:', err)
        } finally {
            loading.value = false
        }
    }

    const createDespesa = async (despesaData) => {
        loading.value = true
        try {
            const newDespesa = await api.createDespesa({
                ...despesaData,
                valor: parseFloat(despesaData.valor)
            })
            despesas.value.push(newDespesa)
            return newDespesa
        } catch (err) {
            error.value = err.response?.data || err.message
            console.error('Erro ao criar despesa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const updateDespesa = async (id, despesaData) => {
        loading.value = true
        try {
            const updatedDespesa = await api.updateDespesa(id, {
                ...despesaData,
                valor: parseFloat(despesaData.valor)
            })
            const index = despesas.value.findIndex(d => d.id === id)
            if (index !== -1) {
                despesas.value[index] = updatedDespesa
            }
            return updatedDespesa
        } catch (err) {
            error.value = err.response?.data || err.message
            console.error('Erro ao atualizar despesa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deleteDespesa = async (id) => {
        loading.value = true
        try {
            await api.deleteDespesa(id)
            despesas.value = despesas.value.filter(d => d.id !== id)
        } catch (err) {
            error.value = err.response?.data || err.message
            console.error('Erro ao deletar despesa:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    const getDespesaById = (id) => {
        return despesas.value.find(d => d.id === id)
    }

    return {
        despesas,
        loading,
        error,
        fetchDespesas,
        createDespesa,
        updateDespesa,
        deleteDespesa,
        getDespesaById
    }
})