<template>
    <div>
        <h1>Editar Despesa</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="descricao">Descrição:</label>
                <input type="text" id="descricao" v-model="form.descricao" required>
            </div>

            <div class="form-group">
                <label for="valor">Valor:</label>
                <input type="number" id="valor" v-model="form.valor" step="0.01" required>
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

            <button type="submit" class="btn btn-primary">Atualizar</button>
            <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDespesasStore } from '../stores/despesas'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
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
    descricao: '',
    valor: 0,
    data: '',
    categoria: ''
})

onMounted(async () => {
    const despesa = await store.getDespesaById(Number(props.id))

    if (despesa) {
        console.log(despesa.categoria);
        form.value = {
            descricao: despesa.descricao,
            valor: despesa.valor,
            data: despesa.data.split('T')[0],
            categoria: despesa.categoria
        }
    }
})

const submitForm = async () => {
    try {
        await store.updateDespesa(props.id, form.value)
        router.push('/')
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error)
    }
}
</script>