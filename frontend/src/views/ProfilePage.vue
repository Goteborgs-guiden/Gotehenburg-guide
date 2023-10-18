<script setup>
</script>
<template>
     <div id="profile-img">
        <img id="img-from-database" src="#">
        <h1 id="username">Användarnamn som överlappar bilden</h1>
    </div>

    <div id="profile-info">
        <table id="shorts">
            <tr class="short">
                <td>Namn:</td>
                <td>hämtas från databas</td>
            </tr>
            <tr class="short">
                <td>Födelsedag:</td>
                <td>hämtas från databas</td>
            </tr>
            <tr class="short">
                <td>Område:</td>
                <td>hämtas från databas</td>
            </tr>
        </table>
        <table>
            <tr class="short">
                <td>Om mig:</td>
            </tr>
            <tr class="short">
                <td>Hämtas från databas</td>
            </tr>
        </table>
        <a href="#editPage?">
            <button id="edit-button">redigera</button>
        </a>
    </div>

    <div id="quiz-scores">
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/AbcView">
            <img src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
            </RouterLink></li>
            <li><h2>Ordvitsknök</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/OrdvitsarQuiz">
            <img src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
            </RouterLink></li>
            <li><h2>Tjöt</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/MapQuizView">
            <img src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
            </RouterLink></li>
            <li><h2>Geografi-käck</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
    </div>

    <div id="friend-list">
        <h2 id="friends">Vänner</h2>
        <ul>
            <li class="friend">vän</li>
            <li class="friend">vän</li>
            <li class="friend">vän</li>
            <li class="friend">vän</li>
            <li class="friend">vän</li>
            <li class="friend">vän</li>
        </ul>
    </div>
</template>
<style scoped>
#profile-img {
border-radius: 490px;
border: 5px solid #214F75;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

#username {
border-radius: 25px;
background: rgba(64, 108, 144, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 70px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

#profile-info {
border-radius: 25px;
border: 4px solid rgba(33, 79, 117, 0.61);
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

#shorts {
border-radius: 25px;
border: 3px solid #406C90;
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}
.short {
color: #000;
font-family: Newsreader;
font-size: 40px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

#edit-button {
border-radius: 17px;
border: 2px solid #214F75;
background: #6E91AD;
box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.40);
color: #FFF;
font-family: Permanent Marker;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
}

#quiz-scores {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.quiz {
border-radius: 24px;
border: 1px solid #214F75;
background: linear-gradient(180deg, #406C90 16.92%, rgba(64, 108, 144, 0.00) 100%);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #000;
font-family: Newsreader;
font-size: 45px;
font-style: normal;
font-weight: 500;
line-height: normal;
list-style: none;
}

#friend-list {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.friend {
border-radius: 17px;
background: rgba(64, 108, 144, 0.73);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 45px;
font-style: normal;
font-weight: 400;
line-height: normal;
list-style: none;
}

#friends {
color: #000;
font-family: Newsreader;
font-size: 59px;
font-style: normal;
font-weight: 500;
line-height: normal;
}

</style>
