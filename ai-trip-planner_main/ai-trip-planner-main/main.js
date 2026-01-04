document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const dateInput = document.getElementById('dates');
    const datepicker = new Datepicker(dateInput, {
        format: 'dd/mm/yyyy',
        autohide: true,
        todayHighlight: true,
        maxNumberOfDates: 2,
        orientation: 'bottom'
    });

    const destinationInput = document.getElementById('destination');
    const tripDescriptionInput = document.getElementById('tripDescription');
    const savedTripsContainer = document.getElementById('savedTrips');
    const saveTripButton = document.getElementById('saveTrip');

    // Initialize trips array
    let trips = JSON.parse(localStorage.getItem('trips') || '[]');
    displayTrips();

    // Save trip handler
    saveTripButton.addEventListener('click', saveTrip);

    function saveTrip() {
        const destination = destinationInput.value.trim();
        const description = tripDescriptionInput.value.trim();
        const selectedDates = dateInput.value;

        // Validation
        if (!destination || !selectedDates || !description) {
            alert('Please fill in all fields (destination, dates, and description)');
            return;
        }

        // Create new trip object
        const newTrip = {
            id: Date.now(),
            destination: destination,
            dates: selectedDates,
            description: description
        };

        // Add to trips array
        trips.unshift(newTrip);
        
        // Save to localStorage
        localStorage.setItem('trips', JSON.stringify(trips));

        // Clear inputs
        destinationInput.value = '';
        dateInput.value = '';
        tripDescriptionInput.value = '';

        // Refresh display
        displayTrips();
    }

    function displayTrips() {
        if (trips.length === 0) {
            savedTripsContainer.innerHTML = '<div class="no-trips">No trips saved yet. Plan your first adventure above!</div>';
            return;
        }

        savedTripsContainer.innerHTML = trips.map(trip => `
            <div class="trip-card">
                <h3>${trip.destination}</h3>
                <p class="text-gray-600 mb-2">${trip.dates}</p>
                <p class="text-gray-700">${trip.description}</p>
                <button class="btn-link delete-trip" data-id="${trip.id}">
                    <i data-lucide="trash-2"></i> Delete
                </button>
            </div>
        `).join('');

        lucide.createIcons();

        // Add delete functionality
        document.querySelectorAll('.delete-trip').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteTrip(id);
            });
        });
    }

    function deleteTrip(id) {
        trips = trips.filter(trip => trip.id != id);
        localStorage.setItem('trips', JSON.stringify(trips));
        displayTrips();
    }
});