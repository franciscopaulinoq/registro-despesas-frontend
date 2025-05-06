<template>
    <div class="page">
        <div v-if="despesa">
            <h1 class="title">Detalhes da Despesa</h1>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">{{ despesa.descricao }}</h2>
                    <p class="card-text"><strong>Valor:</strong> R$ {{ formatCurrency(despesa.valor) }}</p>
                    <p class="card-text"><strong>Data:</strong> {{ formatDate(despesa.data) }}</p>
                    <p class="card-text"><strong>Categoria:</strong> {{ categorias[despesa.categoria] }}</p>

                    <div class="actions">
                        <router-link :to="{ name: 'despesa-edit', params: { id: despesa.id } }"
                            class="btn warning">Editar</router-link>
                        <button @click="handleDeleteDespesa" class="btn danger">Excluir</button>
                        <router-link to="/" class="btn secondary">Voltar</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="loading">
            <p class="loading">Carregando...</p>
        </div>
        <div v-else>
            <p class="not-found">Despesa não encontrada</p>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useDespesasStore } from '../stores/despesas'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()
const store = useDespesasStore()
const { loading, error } = storeToRefs(store)
const { getDespesaById, deleteDespesa, fetchDespesas } = store

const despesa = ref(null)

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

onMounted(async () => {
    try {
        await fetchDespesas()
        const foundDespesa = getDespesaById(Number(props.id))
        despesa.value = foundDespesa || null
    } catch (err) {
        console.error('Erro ao carregar despesa:', err)
        router.push('/')
    }
})

const formatDate = (dateString) => {
    if (!dateString) return ''
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
}

const formatCurrency = (value) => {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return num.toFixed(2)
}

const handleDeleteDespesa = async () => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
        try {
            await deleteDespesa(Number(props.id))
            router.push('/')
        } catch (error) {
            console.error('Erro ao excluir despesa:', error)
        }
    }
}
</script>

<style scoped>
.page {
    max-width: 700px;
    margin: 0 auto;
    padding: 30px 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

.title {
    font-size: 2rem;
    margin-bottom: 25px;
    text-align: center;
    color: #2c3e50;
}

.card {
    background-color: #fff;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    transition: box-shadow 0.3s ease;
}

.card:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.card-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 20px;
}

.card-text {
    font-size: 1rem;
    margin-bottom: 12px;
    line-height: 1.6;
}

.actions {
    margin-top: 25px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 18px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: none;
}

.btn.warning {
    background-color: #ffc107;
    color: #212529;
}

.btn.warning:hover {
    background-color: #e0a800;
}

.btn.danger {
    background-color: #dc3545;
    color: white;
}

.btn.danger:hover {
    background-color: #c82333;
}

.btn.secondary {
    background-color: #6c757d;
    color: white;
}

.btn.secondary:hover {
    background-color: #5a6268;
}

.loading,
.not-found {
    text-align: center;
    margin-top: 50px;
    font-size: 1.1rem;
    color: #888;
}
</style>