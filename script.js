// Array of all people
const people = ['Annelies', 'Margot', 'Henri', 'Jasper', 'Vital', 'Justine', 'Laora', 'Saffi'];

// Fixed seats for drivers
const driverCar1 = 'Margot';
const driverCar2 = 'Annelies';

// Function to shuffle an array in place using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to clear the seat names
function clearSeats() {
    document.getElementById('car1-driver').textContent = '';
    document.getElementById('car1-copilot').textContent = '';
    document.getElementById('car1-rear-left').textContent = '';
    document.getElementById('car1-rear-right').textContent = '';
    document.getElementById('car2-driver').textContent = '';
    document.getElementById('car2-copilot').textContent = '';
    document.getElementById('car2-rear-left').textContent = '';
    document.getElementById('car2-rear-right').textContent = '';
}

// Function to fill seats with random names
function randomizeSeating() {
    // Clone the people array and shuffle it (excluding drivers)
    const passengers = [...people].filter(person => person !== driverCar1 && person !== driverCar2);
    shuffleArray(passengers);

    // Assign the shuffled passengers to the car seats
    document.getElementById('car1-copilot').textContent = passengers[0];
    document.getElementById('car1-rear-left').textContent = passengers[1];
    document.getElementById('car1-rear-right').textContent = passengers[2];
    document.getElementById('car2-copilot').textContent = passengers[3];
    document.getElementById('car2-rear-left').textContent = passengers[4];
    document.getElementById('car2-rear-right').textContent = passengers[5];

    // Set the driver names
    document.getElementById('car1-driver').textContent = driverCar1;
    document.getElementById('car2-driver').textContent = driverCar2;
}

// Event listener for the randomize button
document.getElementById('randomize-btn').addEventListener('click', () => {
    // Clear existing seat names
    clearSeats();

    // Randomize and fill the seats
    randomizeSeating();
});

// Event listener for the clear button
document.getElementById('clear-btn').addEventListener('click', () => {
    // Clear the seat names
    clearSeats();
});

// Event listener for window onload
window.onload = () => {
    // Clear the seat names when the page finishes loading
    clearSeats();

};
