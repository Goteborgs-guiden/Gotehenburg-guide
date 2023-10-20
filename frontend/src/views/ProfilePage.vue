<script setup>
</script>
<template>
    <div id="profile-page">
        <div id="top-section">
     <div id="profile-img">
    
        <h1 id="username">Användarnamn</h1>
    </div>

    <div id="profile-info">
        <table id="shorts">
            <tr>
                <td class="short">Namn:</td>
                <td class="short">hämtas från databas</td>
            </tr>
            <tr>
                <td class="short">Födelsedag:</td>
                <td class="short">hämtas från databas</td>
            </tr>
            <tr>
                <td class="short">Område:</td>
                <td class="short">hämtas från databas</td>
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
</div>
<div id="quiz-friends">
    <div id="quiz-scores">
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/AbcView">
            <img class="tram" src="../assets/img/old tramquiz 1.svg" alt="tramquiz1">
            </RouterLink></li>
            <li><h4>Ordvitsknök</h4></li>
            <li><h5>Personliga Bästa</h5></li>
            <li><h4>X/X</h4></li>
        </ul>
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/OrdvitsarQuiz">
            <img class="tram" src="../assets/img/new tramquiz 2.svg" alt="tramquiz2">
            </RouterLink></li>
            <li><h4>Tjöt</h4></li>
            <li><h5>Personliga Bästa</h5></li>
            <li><h4>X/X</h4></li>
        </ul>
        <ul class="quiz">
            <li><RouterLink class="RouterL" to="/MapQuizView">
            <img class="tram" src="../assets/img/middle old tramquiz 3.svg" alt="tramquiz3">
            </RouterLink></li>
            <li><h4>Geografi-käck</h4></li>
            <li><h5>Personliga Bästa</h5></li>
            <li><h4>X/X</h4></li>
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
</div>
</div>
</template>
<style scoped>
#profile-page {
    display:flex;
    flex-direction: column;
}

#top-section {
    display: flex;
flex-direction: row;
margin: 20px;
width: 100%;
height: 10rem;
}

#profile-img {
border-radius: 490px;
border: 5px solid #214F75;
background: url(<path-to-image>), lightgray 50%;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
height: 200px;
width: 200px;
margin: 15px;
display: flex;
align-items: end;
justify-content: center;
}

#username {
border-radius: 25px;
background: rgba(64, 108, 144, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding: 5px;
}

#profile-info {
border-radius: 25px;
border: 4px solid rgba(33, 79, 117, 0.61);
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
display: flex;
flex-direction: row;
margin: 15px;
width: 80%;
}

#shorts {
border-radius: 25px;
border: 3px solid #406C90;
background: #E8F3FD;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
margin: 15px;
width: 25rem;
height: 2rem;

}



.short {
color: #000;
font-family: Newsreader;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: normal;
display: flex;
flex-direction: row;

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
#quiz-friends {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
   
}
.tram {
  height: 10rem;
}

#quiz-scores {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
display: flex;
justify-content: space-around;
width: 50%;
}

.quiz {
border-radius: 24px;
border: 1px solid #214F75;
background: linear-gradient(180deg, #406C90 16.92%, rgba(64, 108, 144, 0.00) 100%);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #000;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
list-style: none;
display: flex;
flex-direction: column;
justify-content: space-around;
width: 30%;

}

#friend-list {
border-radius: 25px;
border: 4px solid #214F75;
background: rgba(232, 243, 253, 0.91);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
width: 50%;
}

.friend {
border-radius: 17px;
background: rgba(64, 108, 144, 0.73);
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
color: #FFF;
font-family: Newsreader;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
list-style: none;
margin: 1rem;
padding: 0.5rem;

}

#friends {
color: #000;
font-family: Newsreader;
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
display: flex;
justify-content: center;
}

</style>
