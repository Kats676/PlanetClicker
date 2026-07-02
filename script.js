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

// ===========================
// Planet Clicker
// Часть 4
// ===========================

// ---------- Настройки ----------

let musicEnabled = true;
let soundEnabled = true;

const settingsBtn = document.getElementById("settingsBtn");
const settingsWindow = document.getElementById("settingsWindow");

const toggleMusic = document.getElementById("toggleMusic");
const toggleSound = document.getElementById("toggleSound");
const resetGame = document.getElementById("resetGame");

settingsBtn.onclick = () => {

    if (settingsWindow.style.display == "block") {

        settingsWindow.style.display = "none";

    } else {

        settingsWindow.style.display = "block";

    }

};

// Музыка

toggleMusic.onclick = () => {

    musicEnabled = !musicEnabled;

    if (musicEnabled) {

        bgMusic.play();

    } else {

        bgMusic.pause();

    }

};

// Звуки

toggleSound.onclick = () => {

    soundEnabled = !soundEnabled;

};

// ---------- Первый подарок ----------

const welcomeWindow = document.getElementById("welcomeWindow");
const claimGift = document.getElementById("claimGift");

if (!localStorage.getItem("firstGift")) {

    welcomeWindow.style.display = "block";

}

claimGift.onclick = () => {

    coins += 50;

    updateCoins();

    welcomeWindow.style.display = "none";

    localStorage.setItem("firstGift", "yes");

    saveGame();

};

// ---------- Ежедневная награда ----------

const dailyBtn = document.getElementById("dailyBtn");
const dailyWindow = document.getElementById("dailyWindow");

dailyBtn.onclick = () => {

    let last = localStorage.getItem("dailyDate");

    let today = new Date().toDateString();

    if (last == today) {

        alert("Сегодня награда уже получена!");

        return;

    }

    let day = Number(localStorage.getItem("dailyDay") || 1);

    let reward = 25;

    switch (day) {

        case 1:
            reward = 25;
            break;

        case 2:
            reward = 300;
            break;

        case 3:
            reward = 1000;
            break;

        case 4:
            reward = 1700;
            break;

        case 5:
            reward = 2400;
            break;

        default:
            reward = 3000;
            break;

    }

    coins += reward;

    updateCoins();

    alert("Вы получили " + reward + " монет!");

    localStorage.setItem("dailyDate", today);

    day++;

    if (day > 6)
        day = 1;

    localStorage.setItem("dailyDay", day);

    saveGame();

};

// ---------- Сброс ----------

resetGame.onclick = () => {

    if (confirm("Удалить всё сохранение?")) {

        localStorage.clear();

        location.reload();

    }

};

// ==========================
// Часть 5
// Статистика + Инвентарь
// ==========================

// Статистика

const statsBtn = document.getElementById("statsBtn");
const statsWindow = document.getElementById("statsWindow");

let totalClicks = 0;
let playTime = 0;

// Инвентарь

const inventoryBtn = document.getElementById("inventoryBtn");
const inventoryWindow = document.getElementById("inventoryWindow");


// ---------- Открыть статистику ----------

statsBtn.onclick = () => {

    if (statsWindow.style.display == "block") {

        statsWindow.style.display = "none";

    } else {

        statsWindow.style.display = "block";

        statsWindow.innerHTML = `

        <h2>📊 Статистика</h2>

        <br>

        <p>Всего кликов: ${totalClicks}</p>

        <p>Монет: ${coins}</p>

        <p>Монет за клик: ${clickPower}</p>

        <p>Автоклик: ${autoClick}/сек</p>

        <p>Время игры: ${playTime} сек</p>

        `;

    }

};


// ---------- Открыть инвентарь ----------

inventoryBtn.onclick = () => {

    if (inventoryWindow.style.display == "block") {

        inventoryWindow.style.display = "none";

    } else {

        inventoryWindow.style.display = "block";

        inventoryWindow.innerHTML = `

        <h2>🎒 Инвентарь</h2>

        <br>

        <p>Монет: ${coins}</p>

        <p>Клик: +${clickPower}</p>

        <p>Автоклик: +${autoClick}/сек</p>

        `;

    }

};


// ---------- Считаем клики ----------

planet.addEventListener("click", () => {

    totalClicks++;

});


// ---------- Время игры ----------

setInterval(() => {

    playTime++;

}, 1000);

// ===========================
// Planet Clicker
// Часть 6
// ===========================

// Выбранная планета
let currentPlanet = "earth";

// ---------- Сохранение ----------

function saveGame(){

    const data = {

        coins,
        clickPower,
        autoClick,
        totalClicks,
        playTime,
        clicks,
        currentPlanet,
        musicEnabled,
        soundEnabled

    };

    localStorage.setItem(
        "planetClickerSave",
        JSON.stringify(data)
    );

}

// ---------- Загрузка ----------

function loadGame(){

    const save = localStorage.getItem("planetClickerSave");

    if(!save) return;

    const data = JSON.parse(save);

    coins = data.coins ?? 0;
    clickPower = data.clickPower ?? 1;
    autoClick = data.autoClick ?? 0;
    totalClicks = data.totalClicks ?? 0;
    playTime = data.playTime ?? 0;
    clicks = data.clicks ?? 0;

    currentPlanet = data.currentPlanet ?? "earth";

    musicEnabled = data.musicEnabled ?? true;
    soundEnabled = data.soundEnabled ?? true;

    planet.src = "images/planet_" + currentPlanet + ".png";

    updateCoins();

}

// ---------- Выбор планет ----------

earthPlanet.onclick = () => {

    currentPlanet = "earth";
    planet.src = "images/planet_earth.png";
    saveGame();

};

moonPlanet.onclick = () => {

    if(clicks >= 500){

        currentPlanet = "moon";
        planet.src = "images/planet_moon.png";
        saveGame();

    }

};

lavaPlanet.onclick = () => {

    if(clicks >= 1500){

        currentPlanet = "lava";
        planet.src = "images/planet_lava.png";
        saveGame();

    }

};

icePlanet.onclick = () => {

    if(clicks >= 2000){

        currentPlanet = "ice";
        planet.src = "images/planet_ice.png";
        saveGame();

    }

};

saturnPlanet.onclick = () => {

    if(clicks >= 2500){

        currentPlanet = "saturn";
        planet.src = "images/planet_saturn.png";
        saveGame();

    }

};

darkPlanet.onclick = () => {

    if(clicks >= 3000){

        currentPlanet = "dark";
        planet.src = "images/planet_dark.png";
        saveGame();

    }

};

// ---------- +Монеты ----------

planet.addEventListener("click", () => {

    const plus = document.createElement("div");

    plus.innerText = "+" + clickPower;

    plus.style.position = "absolute";
    plus.style.left = (window.innerWidth / 2) + "px";
    plus.style.top = (window.innerHeight / 2) + "px";

    plus.style.color = "gold";
    plus.style.fontSize = "35px";
    plus.style.fontWeight = "bold";
    plus.style.pointerEvents = "none";

    document.body.appendChild(plus);

    let y = window.innerHeight / 2;

    const anim = setInterval(() => {

        y -= 2;

        plus.style.top = y + "px";

    }, 16);

    setTimeout(() => {

        clearInterval(anim);

        plus.remove();

    }, 700);

});

loadGame();
