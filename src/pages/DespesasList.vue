<template>
    <div class="container">
        <div class="header">
            <h1>Lista de Despesas</h1>
            <router-link to="/create" class="btn primary">+ Nova Despesa</router-link>
        </div>

        <div v-if="loading" class="status-msg">Carregando...</div>
        <div v-else-if="error" class="status-msg error">{{ error }}</div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="despesa in despesas" :key="despesa.id">
                        <td>{{ despesa.descricao }}</td>
                        <td>{{ categorias[despesa.categoria] }}</td>
                        <td>R$ {{ formatCurrency(despesa.valor) }}</td>
                        <td>{{ formatDate(despesa.data) }}</td>
                        <td class="actions">
                            <router-link :to="{ name: 'despesa-view', params: { id: despesa.id } }"
                                class="btn small info">Ver</router-link>
                            <router-link :to="{ name: 'despesa-edit', params: { id: despesa.id } }"
                                class="btn small warning">Editar</router-link>
                            <button @click="confirmDelete(despesa.id)" class="btn small danger">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDespesasStore } from '../stores/despesas'
import { storeToRefs } from 'pinia'

const store = useDespesasStore()
const { despesas, loading, error } = storeToRefs(store)
const { fetchDespesas, deleteDespesa } = store

const categorias = {
    LAZER: 'Lazer',
    CONTAS: 'Contas',
    MERCADO: 'Mercado',
    SAUDE: 'Saúde',
    COMIDA: 'Comida',
    TRANSPORTE: 'Transporte',
    EDUCACAO: 'Educação',
    OUTROS: 'Outros'
}

onMounted(() => {
    fetchDespesas()
})

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
}

const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return num.toFixed(2)
}

const confirmDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        await deleteDespesa(id)
    }
}
</script>