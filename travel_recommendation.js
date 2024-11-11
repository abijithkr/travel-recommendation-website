async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data.recommendations;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
function handleSearch() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const recommendationsSection = document.getElementById('recommendations');

    recommendationsSection.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = data.recommendations.filter(destination => 
                destination.name.toLowerCase().includes(searchTerm)
            );

            if (results.length) {
                results.forEach(dest => {
                    const destDiv = document.createElement('div');
                    destDiv.innerHTML = `<h3>${dest.name}</h3><p>${dest.description}</p>`;
                    recommendationsSection.appendChild(destDiv);
                });
            } else {
                recommendationsSection.innerHTML = '<p>No destinations found. Try a different search term.</p>';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function bookNow() {
    alert('Redirecting to booking page...');
}
function handleSearch() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    fetchRecommendations().then(recommendations => {
        const results = recommendations.filter(destination => 
            destination.category.includes(searchTerm)
        );
        displayResults(results);
    });
}

function displayResults(results) {
    const recommendationsSection = document.getElementById('recommendations');
    recommendationsSection.innerHTML = '';

    results.forEach(dest => {
        const destDiv = document.createElement('div');
        destDiv.innerHTML = `<h3>${dest.name}</h3><img src="${dest.imageUrl}" alt="${dest.name}"><p>${dest.description}</p>`;
        recommendationsSection.appendChild(destDiv);
    });
}
function clearResults() {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('searchBar').value = '';
}
function showCountryTime(timeZone) {
    const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const countryTime = new Date().toLocaleTimeString('en-US', options);
    console.log(`Current time in ${timeZone}: ${countryTime}`);
}
