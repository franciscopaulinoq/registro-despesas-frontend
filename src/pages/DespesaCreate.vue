<template>
    <div class="container">
        <h1>Criar Nova Despesa</h1>
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form-group">
                <label for="descricao">Descrição:</label>
                <input type="text" id="descricao" v-model="form.descricao" required>
            </div>

            <div class="form-group">
                <label for="valor">Valor (R$):</label>
                <input type="number" id="valor" v-model.number="form.valor" min="0.01" step="0.01" required>
            </div>

            <div class="form-group">
                <label for="data">Data:</label>
                <input type="date" id="data" v-model="form.data" required>
            </div>

            <div class="form-group">
                <label for="categoria">Categoria:</label>
                <select id="categoria" v-model="form.categoria" required>
                    <option v-for="(label, value) in categorias" :key="value" :value="value">
                        {{ label }}
                    </option>
                </select>
            </div>

            <button type="submit" :disabled="store.loading" class="btn btn-primary">
                {{ store.loading ? 'Salvando...' : 'Salvar' }}
            </button>
            <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDespesasStore } from '../stores/despesas'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useDespesasStore()

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

const form = ref({
    categoria: 'OUTROS',
    descricao: '',
    valor: 0,
    data: new Date().toISOString().split('T')[0]
})

const handleSubmit = async () => {
    try {
        await store.createDespesa(form.value)
        router.push('/')
    } catch (error) {
        console.error('Erro ao criar despesa:', error)
    }
}
</script>