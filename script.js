// ==========================
// Planet Clicker
// Часть 1
// ==========================

// Монеты
let coins = 0;

// Монеты за клик
let clickPower = 1;

// Получаем элементы
const planet = document.getElementById("planet");
const coinCount = document.getElementById("coin-count");

const clickSound = document.getElementById("clickSound");
const bgMusic = document.getElementById("bgMusic");

// Чтобы музыка запускалась один раз
let musicStarted = false;

// ---------- Загрузка ----------

function loadGame(){

    const save = localStorage.getItem("planetClickerSave");

    if(save){

        const data = JSON.parse(save);

        coins = data.coins ?? 0;
        clickPower = data.clickPower ?? 1;

    }

    updateCoins();

}

loadGame();

// ---------- Сохранение ----------

function saveGame(){

    const data = {

        coins: coins,
        clickPower: clickPower

    };

    localStorage.setItem(
        "planetClickerSave",
        JSON.stringify(data)
    );

}

// ---------- Обновить текст ----------

function updateCoins(){

    coinCount.textContent = coins;

}

// ---------- Клик по планете ----------

planet.addEventListener("click", ()=>{

    // Первый клик запускает музыку
    if(!musicStarted){

        bgMusic.volume = 0.35;
        bgMusic.play();

        musicStarted = true;

    }

    // Монеты

    coins += clickPower;

    updateCoins();

    // Звук

    clickSound.currentTime = 0;
    clickSound.play();

    // Анимация

    planet.style.transform = "scale(0.93)";

    setTimeout(()=>{

        planet.style.transform = "scale(1)";

    },100);

    // Сохранить

    saveGame();

});

// ---------- Автосохранение ----------

setInterval(()=>{

    saveGame();

},5000);

// ======================
// Магазин
// ======================

const shopBtn = document.getElementById("shopBtn");
const shopWindow = document.getElementById("shopWindow");

const buyNoob = document.getElementById("buyNoob");
const buySonic = document.getElementById("buySonic");
const buySuper = document.getElementById("buySuper");
const buySpider = document.getElementById("buySpider");

let autoClick = 0;

// открыть/закрыть магазин

shopBtn.onclick = () => {

    if(shopWindow.style.display == "block"){

        shopWindow.style.display = "none";

    }else{

        shopWindow.style.display = "block";

    }

}

// ---------------------

buyNoob.onclick = ()=>{

    if(coins >= 10){

        coins -= 10;

        clickPower += 1;

        updateCoins();

        saveGame();

    }

}

// ---------------------

buySonic.onclick = ()=>{

    if(coins >= 50){

        coins -= 50;

        clickPower += 10;

        updateCoins();

        saveGame();

    }

}

// ---------------------

buySuper.onclick = ()=>{

    if(coins >= 100){

        coins -= 100;

        autoClick += 10;

        updateCoins();

        saveGame();

    }

}

// ---------------------

buySpider.onclick = ()=>{

    if(coins >= 150){

        coins -= 150;

        autoClick += 30;

        updateCoins();

        saveGame();

    }

}

// ---------------------

setInterval(()=>{

    if(autoClick > 0){

        coins += autoClick;

        updateCoins();

        saveGame();

    }

},1000);

// =====================
// Планеты
// =====================

const planetBtn = document.getElementById("planetBtn");
const planetWindow = document.getElementById("planetWindow");

const earthPlanet = document.getElementById("earthPlanet");
const moonPlanet = document.getElementById("moonPlanet");
const lavaPlanet = document.getElementById("lavaPlanet");
const icePlanet = document.getElementById("icePlanet");
const saturnPlanet = document.getElementById("saturnPlanet");
const darkPlanet = document.getElementById("darkPlanet");

let clicks = 0;

// открыть окно планет

planetBtn.onclick = ()=>{

    if(planetWindow.style.display=="block"){

        planetWindow.style.display="none";

    }else{

        planetWindow.style.display="block";

        updatePlanets();

    }

};

// считаем клики

planet.addEventListener("click",()=>{

    clicks++;

    updatePlanets();

});

// обновить доступность

function updatePlanets(){

    moonPlanet.disabled = clicks < 500;
    lavaPlanet.disabled = clicks < 1500;
    icePlanet.disabled = clicks < 2000;
    saturnPlanet.disabled = clicks < 2500;
    darkPlanet.disabled = clicks < 3000;

}

// смена планет

earthPlanet.onclick=()=>{

planet.src="images/planet_earth.png";

saveGame();

}

moonPlanet.onclick=()=>{

if(clicks>=500){

planet.src="images/planet_moon.png";

saveGame();

}

}

lavaPlanet.onclick=()=>{

if(clicks>=1500){

planet.src="images/planet_lava.png";

saveGame();

}

}

icePlanet.onclick=()=>{

if(clicks>=2000){

planet.src="images/planet_ice.png";

saveGame();

}

}

saturnPlanet.onclick=()=>{

if(clicks>=2500){

planet.src="images/planet_saturn.png";

saveGame();

}

}

darkPlanet.onclick=()=>{

if(clicks>=3000){

planet.src="images/planet_dark.png";

saveGame();

}

}
