<script setup>
</script>
<template>
<div class="grid-container">

<div class="scoreboard">
    <h1>X/X</h1>
</div>
<div >
    <button class="redo">Försök igen</button>
</div>


<div class="quiz-link">
    <a href="#" class="quiz-link-indiv">svg-Spårvagn: länk till quiz 1, dialekt</a>
    <a href="#" class="quiz-link-indiv">svg-Spårvagn: länk till quiz 2, ordvitsar</a>
    <a href="#" class="quiz-link-indiv">svg-Spårvagn: länk till quiz 3, karta</a>
</div>

<div class="highscore">
      <table>
        <tr>
            <td class="position pos-1">1</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-2">2</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-3">3</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-4">4</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-5">5</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-6">6</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-7">7</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-8">8</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-9">9</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-10">10</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
        <tr>
            <td class="position pos-11">11</td>
            <td class="user">UserNameFromDatabase</td>
        </tr>
    </table>
</div>
</div>
</template>
<style scoped>
.grid-container {
	display: grid;
    grid-template-area:
    'scoreboard'
}

.scoreboard {
border-radius: 24px;
border: 3px solid #F1F2F1;
background: #214F75;
box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.30);

text-align: center;
color: #FFF;
font-family: Newsreader;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.redo {
border-radius: 24px;
border: 3px solid #F1F2F1;
background: #406C90;
box-shadow: 0px 4px 4px 5px rgba(64, 108, 144, 0.50);
color: #FFF;
font-family: Newsreader;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.quiz-link-indiv {
border-radius: 83px;
opacity: 0.78;
background: linear-gradient(180deg, #214F75 48.96%, rgba(33, 79, 117, 0.00) 100%);
}

.highscore {
border-radius: 24px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.90);
box-shadow: 0px 4px 4px 9px rgba(0, 0, 0, 0.30);
}

.position {
border-radius: 6px;
border: 1px solid #000;
background: #FFF;

text-align: center;
color: #000;
font-family: Nikukyu;
font-size: 57px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

.user {
width: 100%;
border-radius: 17px;
background: rgba(64, 108, 144, 0.73);
text-align: center;
}
</style>
