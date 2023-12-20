document.getElementById('storyForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const spaceTraveler = document.getElementById('spaceTraveler').value;
  const shipName = document.getElementById('shipName').value;
  const destinationPlanet = document.getElementById('destinationPlanet').value;

  fetch('/generateStory', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spaceTraveler, shipName, destinationPlanet }),
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('storyOutput').innerText = data.story;
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
