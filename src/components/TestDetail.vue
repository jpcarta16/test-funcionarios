<template>
    <div class="test-container">
        <div class="test-detail">
            <h1>{{ test ? test.title : 'Cargando...' }}</h1>

            <h2 v-if="selectedTopic">{{ selectedTopic.title }}</h2>

            <ul v-if="test && test.topics && test.topics.length > 0" class="topic-list">
                <li v-for="(topic, topicIndex) in test.topics" :key="topicIndex">
                    <button @click="selectTopic(topic)"
                        :class="{ active: selectedTopic === topic }">{{ topic.title }}</button>
                </li>
            </ul>

            <div v-if="selectedTopic && selectedTopic.questions.length > 0" class="question-list">
                <div class="questions-scroll">
                    <div v-for="(question, index) in selectedTopic.questions" :key="index" class="question-container">
                        <h2>{{ question.question }}</h2>
                        <div class="options">
                            <div v-for="(option, optionIndex) in question.options" :key="optionIndex">
                                <label>
                                    <input type="radio" :name="'question_' + index" :value="optionIndex"
                                        v-model="userAnswers[index]" />
                                    {{ option }}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botones de navegación entre temas -->
            <div class="navigation-buttons">
                <button @click="prevTopic" :disabled="selectedTopicIndex === 0" class="button">Tema Anterior</button>
                <button @click="nextTopic"
                    :disabled="selectedTopicIndex === (test && test.topics ? test.topics.length - 1 : 0)"
                    class="button">Siguiente
                    Tema</button>
            </div>

            <!-- Mostrar el puntaje acumulado del tema actual -->
            <div v-if="selectedTopic" class="topic-score">
                <p>Puntaje Acumulado: {{ topicScores[selectedTopicIndex] }}</p>
            </div>

            <button @click="submitTest" class="button">Enviar</button>
            <button @click="goToHome" class="button">Volver al Inicio</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            test: null,
            userAnswers: [],
            selectedTopic: null,
            selectedTopicIndex: 0,
            topicScores: [] // Almacena el puntaje acumulado de cada tema
        };
    },
    mounted() {
        const testId = this.id;
        axios
            .get('/data/tests.json')
            .then((response) => {
                this.test = response.data.find((test) => test.id == testId);
                if (!this.test) {
                    console.error('Test no encontrado');
                }
                // Inicializa los puntajes para cada tema
                this.topicScores = new Array(this.test.topics.length).fill(0);
            })
            .catch((error) => {
                console.error('Error al cargar la prueba:', error);
            });
    },
    methods: {
        selectTopic(topic) {
            this.selectedTopic = topic;
            this.selectedTopicIndex = this.test.topics.indexOf(topic);
        },
        prevTopic() {
            if (this.selectedTopicIndex > 0) {
                this.selectedTopicIndex--;
                this.selectedTopic = this.test.topics[this.selectedTopicIndex];
            }
        },
        nextTopic() {
            if (this.selectedTopicIndex < this.test.topics.length - 1) {
                this.selectedTopicIndex++;
                this.selectedTopic = this.test.topics[this.selectedTopicIndex];
            }
        },
        submitTest() {
            if (this.test) {
                // Calcular el puntaje acumulado del tema actual
                const topicScore = this.calculateTopicScore(this.selectedTopic);
                // Agregar el puntaje del tema actual al arreglo de puntajes
                this.topicScores[this.selectedTopicIndex] = topicScore;
                alert(`Tu puntaje es: ${topicScore} de ${this.selectedTopic.questions.length}`);
            }
        },
        goToHome() {
            this.$router.push('/');
        },
        calculateTopicScore() {
            // Realiza la lógica de calificación del tema aquí
            let topicScore = 0;
            // ...
            return topicScore;
        }
    }
};
</script>

<style scoped>
/* Agregar estilos CSS si es necesario */
.test-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    /* Cambia la altura a "auto" para permitir que crezca según el contenido */
    max-height: 100vh;
    /* Limita la altura máxima al tamaño de la ventana gráfica */
    padding: 20px;
    /* Agrega espacio en la parte superior */
    box-sizing: border-box;
    /* Incluye el relleno en la altura total */
}

.test-detail {
    text-align: center;
}

.topic-list {
    list-style-type: none;
    padding: 10px 0;
    /* Agregar margen en la parte superior de la lista */
    display: flex;
    flex-direction: column;
}

.topic-list li {
    margin: 5px 0;
    /* Agregar margen entre los botones de temas */
}

.button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.question-list {
    max-height: 70vh;
    overflow-y: auto;
}

.questions-scroll {
    padding: 20px;
}

.question-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.options {
    list-style-type: lower-alpha;
    padding: 0;
}

.active {
    background-color: #007BFF;
    color: #fff;
}</style>
