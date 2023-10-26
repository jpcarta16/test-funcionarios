<template>
    <div class="test-list">
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
.test-list {
    text-align: center;
    margin: 20px;
}

.test-list ul {
    list-style-type: none;
    /* Elimina los puntos de la lista */
    padding: 0;
    /* Elimina el espacio de relleno predeterminado */
}

.test-list li {
    margin: 10px 0;
    /* Agrega espacio entre elementos de la lista */
}
</style>
