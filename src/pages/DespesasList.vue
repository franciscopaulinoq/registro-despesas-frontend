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

<style scoped>
.container {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 28px;
    font-weight: 600;
}

.table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
}

.table th,
.table td {
    padding: 14px 16px;
    text-align: left;
}

.table th {
    background-color: #f9fafb;
    font-weight: 600;
    color: #555;
    border-bottom: 2px solid #eee;
}

.table tr:nth-child(even) {
    background-color: #fafafa;
}

.table tr:hover {
    background-color: #f1f5f9;
}

.btn {
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    transition: background-color 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.btn:hover {
    opacity: 0.9;
}

.btn.primary {
    background-color: #2563eb;
    color: #fff;
}

.btn.info {
    background-color: #3b82f6;
    color: #fff;
}

.btn.warning {
    background-color: #facc15;
    color: #000;
}

.btn.danger {
    background-color: #ef4444;
    color: #fff;
}

.btn.small {
    padding: 6px 10px;
    font-size: 12px;
}

.actions {
    display: flex;
    gap: 8px;
}

.status-msg {
    padding: 12px;
    border-radius: 6px;
    background-color: #f0f4f8;
    color: #333;
    font-size: 14px;
    margin-bottom: 16px;
}

.status-msg.error {
    background-color: #fee2e2;
    color: #b91c1c;
}
</style>