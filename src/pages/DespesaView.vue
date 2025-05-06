<template>
    <div class="page">
        <div v-if="despesa">
            <h1 class="title">Detalhes da Despesa</h1>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">{{ despesa.descricao }}</h2>
                    <p class="card-text"><strong>Valor:</strong> R$ {{ formatCurrency(despesa.valor) }}</p>
                    <p class="card-text"><strong>Data:</strong> {{ formatDate(despesa.data) }}</p>
                    <p class="card-text mb-2"><strong>Categoria:</strong> {{ categorias[despesa.categoria] }}</p>

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