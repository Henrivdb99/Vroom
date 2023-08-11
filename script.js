document.addEventListener("DOMContentLoaded", function () {
  const randomizeBtn = document.getElementById("randomize-btn");
  const clearBtn = document.getElementById("clear-btn");
  const toggle = document.getElementById("drinking-mode-toggle");
  const discoLightsContainer = document.getElementById("disco-lights");
  const backgroundOverlay = document.querySelector(".background-overlay");


  // Driver seat positions
  const driverSeats = {
      Margot: { top: "46%", left: "20%" },
      Laora: { top: "52%", left: "59%" },
  };

  // Passenger seat positions
  const passengerSeats = [
      { top: "46%", left: "31%" },
      { top: "52%", left: "70%" },
      { top: "59%", left: "70%" },
      { top: "59%", left: "59%" },
      { top: "53%", left: "20%" },
      { top: "53%", left: "31%" },
  ];

  // Get references to passenger seats
  const passengerSeatElements = document.querySelectorAll(".seat:not(#Laora):not(#Margot)");

  randomizeBtn.addEventListener("click", function () {
      // Move Laora and Margot to their driver seats
      for (const personId in driverSeats) {
          const seat = document.getElementById(personId);
          seat.style.top = driverSeats[personId].top;
          seat.style.left = driverSeats[personId].left;
      }

      // Shuffle passenger seat positions
      shuffleArray(passengerSeats);

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


  let discoInterval;
  let lights = [];

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
});
