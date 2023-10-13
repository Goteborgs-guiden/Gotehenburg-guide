<script setup>
</script>
<template>
    <div id="profile-img">
        <img id="img-from-database" src="#">
        <h1>Användarnamn som överlappar bilden</h1>
    </div>

    <div id="profile-info">
        <table>
            <tr>
                <td>Namn:</td>
                <td>hämtas från databas</td>
            </tr>
            <tr>
                <td>Födelesdag:</td>
                <td>hämtas från databas</td>
            </tr>
            <tr>
                <td>Område:</td>
                <td>hämtas från databas</td>
            </tr>
        </table>
        <table>
            <tr>
                <td>Om mig:</td>
            </tr>
            <tr>
                <td>Hämtas från databas</td>
            </tr>
        </table>
        <a href="#editPage?">
            <button>redigera</button>
        </a>
    </div>

    <div id="quiz-scores">
        <ul>
            <li><a href="#">tram</a></li>
            <li><h2>Ordvitsknök</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
        <ul>
            <li><a href="#">tram</a></li>
            <li><h2>Tjöt</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
        <ul>
            <li><a href="#">tram</a></li>
            <li><h2>Geografi-käck</h2></li>
            <li><h3>Personliga Bästa</h3></li>
            <li><h2>X/X</h2></li>
        </ul>
    </div>

    <div id="friend-list">
        <h2>Vänner</h2>
        <ul>
            <li>vän</li>
            <li>vän</li>
            <li>vän</li>
            <li>vän</li>
            <li>vän</li>
            <li>vän</li>
        </ul>
    </div>
</template>
<style scoped>
</style>
