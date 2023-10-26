<template>
    <div class="home-test">
        <h1>Lista de Pruebas</h1>
        <ul>
            <li v-for="test in tests" :key="test.id">
                <router-link :to="'/test/' + test.id">{{ test.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            tests: []
        };
    },
    mounted() {
        axios
            .get('/data/tests.json')
            .then(response => {
                this.tests = response.data;
            })
            .catch(error => {
                console.error('Error al cargar las pruebas:', error);
            });
    }
};
</script>

<style scoped>
/* Agregar estilos CSS si es necesario */
.home-test {
    text-align: center;
    margin: 20px;
}
</style>
