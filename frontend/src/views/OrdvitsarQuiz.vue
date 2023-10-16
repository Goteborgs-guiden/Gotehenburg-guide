<script setup>
</script>
<template>
    <div id="question-image">
        <img src="#">
    </div>

    <div id="abc-qiz">
        <form action="#" method="#">
            <p>Generated question</p>
            <input type="radio" id="answerOne" name="abcQuiz" value="altOne">
            <label for="answerOne">generated choice</label>
            <input type="radio" id="answerTwo" name="abcQuiz" value="altTwo">
            <label for="answerTwo">generated choice</label><br>
            <input type="radio" id="answerThree" name="abcQuiz" value="altThree">
            <label for="answerThree">generated choice</label>
            <input type="radio" id="answerFour" name="abcQuiz" value="altFour">
            <label for="answerFour">generated choice</label>
        </form>
    </div>

    <button id="visible-from-second-question">Tillbaka</button>
    <button id="visible-from-first-to-second-to-last-question">Nästa</button>
    <button id="visible-on-last-question">Submit</button>

</template>
<style scoped>
</style>
