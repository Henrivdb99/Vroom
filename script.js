document.addEventListener("DOMContentLoaded", function () {
    const randomizeBtn = document.getElementById("randomize-btn");
    const clearBtn = document.getElementById("clear-btn");
  
    // Driver seat positions
    const driverSeats = {
      Margot: { top: "46%", left: "20%" },
      Annelies: { top: "52%", left: "59%" },
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
    const passengerSeatElements = document.querySelectorAll(".seat:not(#Annelies):not(#Margot)");
  
    randomizeBtn.addEventListener("click", function () {
      // Move Annelies and Margot to their driver seats
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
      
      
  
    // Helper function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  });
  