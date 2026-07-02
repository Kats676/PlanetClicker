let energy = 0;

const energyText = document.getElementById("energy");
const planet = document.getElementById("planet");

planet.addEventListener("click", () => {
    energy++;
    energyText.textContent = energy;
});
