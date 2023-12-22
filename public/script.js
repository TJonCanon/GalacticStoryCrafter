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

// Event listener for user registration
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Alert the response (e.g., 'User registered')
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Event listener for user login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.accessToken) {
            localStorage.setItem('token', data.accessToken);
            alert('Login successful');
            // Redirect or change UI after successful login
        } else {
            alert('Login failed');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});