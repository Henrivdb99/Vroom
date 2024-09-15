document.addEventListener("DOMContentLoaded", function () {
    const randomizeBtn = document.getElementById("randomize-btn");
    const clearBtn = document.getElementById("clear-btn");
    const toggle = document.getElementById("drinking-mode-toggle");
    const sToggle = document.getElementById("saffi-mode-toggle");
    const discoLightsContainer = document.getElementById("disco-lights");
    const backgroundOverlay = document.querySelector(".background-overlay");
    
    let discoInterval;
    let lights = [];
    let sparkleInterval;
    let sparkles = [];
    let sleepyInterval;
    let sleepies = [];

    // Driver seat positions
    const driverSeats = {
        Margot: { top: "46%", left: "20%" }, // Car 1
        Laora: { top: "52%", left: "59%" }, // Car 2
    };

    // Passenger seat positions
    const passengerSeats = [
        { top: "46%", left: "31%" }, // Car 1
        { top: "52%", left: "70%" }, // Car 2
        { top: "59%", left: "70%" }, // Car 2
        { top: "59%", left: "59%" }, // Car 2
        { top: "53%", left: "20%" }, // Car 1
        { top: "53%", left: "31%" }, // Car 1
    ];

    randomizeBtn.addEventListener("click", function () {
        // Move Laora and Margot to their driver seats
        for (const personId in driverSeats) {
            const seat = document.getElementById(personId);
            seat.style.top = driverSeats[personId].top;
            seat.style.left = driverSeats[personId].left;
        }

        // Shuffle passenger seat positions
        shuffleArray(passengerSeats);

        // Get references to passenger seats dynamically
        const passengerSeatElements = document.querySelectorAll(".seat:not(#Laora):not(#Margot)");

        // Assign shuffled positions to the passengers
        passengerSeatElements.forEach((seat, index) => {
            seat.style.top = passengerSeats[index].top;
            seat.style.left = passengerSeats[index].left;
        });

        // If Drinking Mode is active, swap Annelies and Laora
        if (toggle.checked) {
            const anneliesSeat = document.getElementById("Annelies");
            const laoraSeat = document.getElementById("Laora");

            const anneliesTop = anneliesSeat.style.top;
            const anneliesLeft = anneliesSeat.style.left;

            anneliesSeat.style.top = laoraSeat.style.top;
            anneliesSeat.style.left = laoraSeat.style.left;

            laoraSeat.style.top = anneliesTop;
            laoraSeat.style.left = anneliesLeft;
        }

        // If Saffi Mode is active, swap Margot and Saffi
        if (sToggle.checked) {
            const margotSeat = document.getElementById("Margot");
            const saffiSeat = document.getElementById("Vital");

            const margotTop = margotSeat.style.top;
            const margotLeft = margotSeat.style.left;

            margotSeat.style.top = saffiSeat.style.top;
            margotSeat.style.left = saffiSeat.style.left;

            saffiSeat.style.top = margotTop;
            saffiSeat.style.left = margotLeft;
        }

        const passengerSeatElements2 = Array.from(document.querySelectorAll(".seat")).filter(seat => {
            const seatStyle = window.getComputedStyle(seat);
            const seatTop = seatStyle.getPropertyValue("top");
            const seatLeft = seatStyle.getPropertyValue("left");

            // Vergelijk direct de specifieke waarden
            const isDriverSeat = 
                (seatTop === "46%" && seatLeft === "20%") ||  // Margot
                (seatTop === "52%" && seatLeft === "59%");    // Laora

            // Return true voor passenger seats (geen driver seats)
            return !isDriverSeat;
        });

        // Swap Justine with a random person in the same car as Laora (not Laora or a driver)
        const justineSeat = document.getElementById("Justine");
        const laoraSeat = document.getElementById("Laora");

        // Determine which car Laora is in
        const laoraCarSeats = Array.from(passengerSeatElements2).filter(seat => {
            const top = seat.style.top;
            const left = seat.style.left;
            return (top === laoraSeat.style.top && left !== laoraSeat.style.left) || 
                   (left === laoraSeat.style.left && top !== laoraSeat.style.top) || 
                   (!toggle.checked && top === "59%" && left === "70%"); // Include right back position only if drinking mode is not active
        });

        // Exclude driver seats from the swap
        const nonDriverSeats = laoraCarSeats.filter(seat => {
            return !Object.values(driverSeats).some(driverSeat => driverSeat.top === seat.style.top && driverSeat.left === seat.style.left);
        });

        if (nonDriverSeats.length > 0) {
            const randomSeat = nonDriverSeats[Math.floor(Math.random() * nonDriverSeats.length)];
            const justineTop = justineSeat.style.top;
            const justineLeft = justineSeat.style.left;

            justineSeat.style.top = randomSeat.style.top;
            justineSeat.style.left = randomSeat.style.left;

            randomSeat.style.top = justineTop;
            randomSeat.style.left = justineLeft;
        }
    });

    clearBtn.addEventListener("click", function () {
        // Move all persons back to their initial positions
        const seats = document.querySelectorAll(".seat");

        seats.forEach((seat) => {
            // Get the initial top and left positions from the data attributes
            const initialTop = seat.dataset.initialTop;
            const initialLeft = seat.dataset.initialLeft;

            // Set the seat's position to its initial position
            seat.style.top = initialTop;
            seat.style.left = initialLeft;
        });
    });

    // let discoInterval;
    // let lights = [];

    toggle.addEventListener("change", function () {
        if (toggle.checked) {
            startDiscoLights();
            backgroundOverlay.classList.add("active");

        } else {
            stopDiscoLights();
            backgroundOverlay.classList.remove("active");

        }
    });

    function startDiscoLights() {
        generateDiscoLights();
        discoInterval = setInterval(updateDiscoLights, 1500); // Change every 2 seconds
    }

    function stopDiscoLights() {
        clearInterval(discoInterval);
        lights.forEach(light => {
            light.remove();
        });
        lights = [];
    }

    function generateDiscoLights() {
        const numLights = 50; // Generate more lights
        for (let i = 0; i < numLights; i++) {
            const light = document.createElement("div");
            light.classList.add("disco-light");
            light.style.top = `${Math.random() * 100}%`;
            light.style.left = `${Math.random() * 100}%`;
            light.style.backgroundColor = getRandomColor();
            light.style.animationDuration = `${Math.random() * 2 + 1}s`;
            discoLightsContainer.appendChild(light);
            lights.push(light);
        }
    }

    function updateDiscoLights() {
        lights.forEach(light => {
            if (!toggle.checked) {
                light.style.top = `${Math.random() * 100}%`;
                light.style.left = `${Math.random() * 100}%`;
            }
            light.style.backgroundColor = getRandomColor();
        });
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }


/*
    // Sparkle - Sleepy update
    sToggle.addEventListener("change", function () {
        if (sToggle.checked) {
            startSleepyMode();
            stopSparkleMode();
        } else {
            startSparkleMode();
            stopSleepyMode();
        }
    });

    
    function startSparkleMode() {
        generateSparkleEffects();
        sparkleInterval = setInterval(updateSparkleEffects, 1000); // Change every second
    }
    
    function stopSparkleMode() {
        clearInterval(sparkleInterval);
        sparkles.forEach(sparkle => {
            sparkle.remove();
        });
        sparkles = [];
    }
    
    function generateSparkleEffects() {
        const numSparkles = 50; // Generate more sparkles
        for (let i = 0; i < numSparkles; i++) {
            const sparkle = document.createElement("div");
            sparkle.classList.add("sparkle");
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.backgroundColor = getRandomColor();
            sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
            discoLightsContainer.appendChild(sparkle);
            sparkles.push(sparkle);
        }
    }
    
    function updateSparkleEffects() {
        sparkles.forEach(sparkle => {
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.backgroundColor = getRandomColor();
        });
    }
    
    function startSleepyMode() {
        generateSleepyEffects();
        sleepyInterval = setInterval(updateSleepyEffects, 2000); // Change every 2 seconds
        backgroundOverlay.classList.add("sleepy");
    }
    
    function stopSleepyMode() {
        clearInterval(sleepyInterval);
        sleepies.forEach(sleepy => {
            sleepy.remove();
        });
        sleepies = [];
        backgroundOverlay.classList.remove("sleepy");
    }
    
    function generateSleepyEffects() {
        const numSleepies = 30; // Generate fewer sleepies
        for (let i = 0; i < numSleepies; i++) {
            const sleepy = document.createElement("div");
            sleepy.classList.add("sleepy-star");
            sleepy.style.top = `${Math.random() * 100}%`;
            sleepy.style.left = `${Math.random() * 100}%`;
            sleepy.style.backgroundColor = getSleepyColor();
            sleepy.style.animationDuration = `${Math.random() * 3 + 2}s`;
            discoLightsContainer.appendChild(sleepy);
            sleepies.push(sleepy);
        }
    }
    
    function updateSleepyEffects() {
        sleepies.forEach(sleepy => {
            sleepy.style.top = `${Math.random() * 100}%`;
            sleepy.style.left = `${Math.random() * 100}%`;
            sleepy.style.backgroundColor = getSleepyColor();
        });
    }
    
    function getSleepyColor() {
        const colors = ["#000080", "#4B0082", "#483D8B"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    */
});