const toast = document.getElementById("toast");
const systemStatus = document.getElementById("systemStatus");
const clock = document.getElementById("clock");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}


/* CLOCK */

function updateClock() {
    const now = new Date();

    clock.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

setInterval(updateClock, 1000);
updateClock();


/* MATCH ANALYSIS */

document.getElementById("analysisBtn").addEventListener("click", function () {

    this.textContent = "ANALYZING...";
    systemStatus.textContent = "ANALYSIS RUNNING";

    showToast("SCANNING MATCH DATA...");

    setTimeout(() => {
        showToast("DEFENSIVE DATA SYNCHRONIZED");
    }, 900);

    setTimeout(() => {
        showToast("MATCH ANALYSIS COMPLETE");

        this.textContent = "ANALYSIS COMPLETE";
        systemStatus.textContent = "SYSTEM ONLINE";
    }, 2000);

    setTimeout(() => {
        this.textContent = "RUN MATCH ANALYSIS";
    }, 4000);
});


/* MATCH MODE */

let matchMode = false;

document.getElementById("matchModeBtn").addEventListener("click", function () {

    matchMode = !matchMode;

    document.body.classList.toggle("match-mode", matchMode);

    if (matchMode) {
        this.textContent = "MATCH MODE ACTIVE";
        systemStatus.textContent = "MATCH MODE";
        showToast("MATCH MODE ACTIVATED");
    } else {
        this.textContent = "ACTIVATE MATCH MODE";
        systemStatus.textContent = "SYSTEM ONLINE";
        showToast("MATCH MODE DEACTIVATED");
    }
});


/* TACTICAL ADVISOR */

const tacticalData = {

    DEFENSIVE:
        "Hold your position, protect the left channel and prioritize defensive recovery.",

    BALANCED:
        "Stay compact, support the midfield and choose the right moment to overlap.",

    ATTACK:
        "Push higher, create width and look for progressive passes after winning possession."
};

document.querySelectorAll(".tactic").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".tactic").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const mode = button.dataset.mode;

        document.getElementById("tacticalOutput").textContent =
            tacticalData[mode];

        showToast(`${mode} MODE SELECTED`);
    });

});


/* LIVE MATCH SIMULATOR */

let simulationRunning = false;
let simulationTimer;

let sim = {
    minute: 0,
    premGoals: 0,
    opponentGoals: 0,
    tackles: 0,
    interceptions: 0,
    passes: 0,
    distance: 0,
    rating: 6.0
};

function updateSimulation() {

    sim.minute++;

    if (Math.random() > .72) sim.tackles++;
    if (Math.random() > .78) sim.interceptions++;

    sim.passes += Math.floor(Math.random() * 3) + 1;
    sim.distance += Math.random() * .18 + .05;

    if (Math.random() > .94) sim.premGoals++;
    if (Math.random() > .95) sim.opponentGoals++;

    sim.rating = Math.min(
        9.9,
        6 +
        sim.tackles * .08 +
        sim.interceptions * .12 +
        sim.passes * .015
    );

    document.getElementById("score").textContent =
        `${sim.premGoals} - ${sim.opponentGoals}`;

    document.getElementById("tackles").textContent =
        sim.tackles;

    document.getElementById("interceptions").textContent =
        sim.interceptions;

    document.getElementById("passes").textContent =
        sim.passes;

    document.getElementById("distance").textContent =
        sim.distance.toFixed(1) + " KM";

    document.getElementById("matchRating").textContent =
        sim.rating.toFixed(1);

    document.getElementById("possession").textContent =
        (50 + Math.floor(Math.random() * 8)) + "%";
}


document.getElementById("simulationBtn").addEventListener("click", function () {

    if (!simulationRunning) {

        simulationRunning = true;

        this.textContent = "STOP SIMULATION";
        document.getElementById("simStatus").textContent = "LIVE";

        systemStatus.textContent = "MATCH SIMULATION";

        showToast("LIVE MATCH SIMULATION STARTED");

        simulationTimer = setInterval(updateSimulation, 700);

    } else {

        simulationRunning = false;

        clearInterval(simulationTimer);

        this.textContent = "START SIMULATION";
        document.getElementById("simStatus").textContent = "PAUSED";

        systemStatus.textContent = "SYSTEM ONLINE";

        showToast("SIMULATION PAUSED");
    }

});


/* STAT INTERACTION */

document.querySelectorAll(".stat-card").forEach(card => {

    card.addEventListener("click", () => {

        const name = card.querySelector("p").textContent;
        const value = card.querySelector("strong").textContent;

        showToast(`${name}: ${value} RATING`);
    });

});


/* XP ANIMATION */

let xp = 2450;
const maxXP = 3000;

setInterval(() => {

    xp++;

    if (xp >= maxXP) {
        xp = 0;
    }

    document.getElementById("xpBar").style.width =
        ((xp / maxXP) * 100) + "%";

    document.getElementById("xpText").textContent =
        `${xp} / ${maxXP} XP`;

}, 2500);


/* TACTICAL PITCH PULSE */

setInterval(() => {

    document.querySelectorAll(".player-marker").forEach(marker => {

        marker.style.transform = "scale(1.18)";

        setTimeout(() => {
            marker.style.transform = "scale(1)";
        }, 250);

    });

}, 2200);


/* SECRET NEXUS MODE */

let secretInput = "";

document.addEventListener("keydown", event => {

    if (event.key.length === 1) {

        secretInput += event.key.toUpperCase();

        if (secretInput.length > 5) {
            secretInput = secretInput.slice(-5);
        }

        if (secretInput === "NEXUS") {

            document.getElementById("secretOverlay")
                .classList.add("show");

            showToast("SECRET PROTOCOL UNLOCKED");

            secretInput = "";
        }
    }

});


document.getElementById("closeSecret").addEventListener("click", () => {

    document.getElementById("secretOverlay")
        .classList.remove("show");

});


/* STARTUP */

window.addEventListener("load", () => {

    setTimeout(() => {
        showToast("FOOTBALL NEXUS v3.0 INITIALIZED");
    }, 700);

});