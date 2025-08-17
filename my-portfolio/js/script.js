// The document.ready function ensures that the code inside it runs only after the DOM is fully loaded.
// This is a standard jQuery practice.
$(document).ready(function() {

    // --- Dynamic Greeting Message for the Home page only ---
    // Check if the current page is index.html
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        function setDynamicGreeting() {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            let greetingMessage = "";

            if (currentHour < 12) {
                greetingMessage = "Good morning!";
            } else if (currentHour < 18) {
                greetingMessage = "Good afternoon!";
            } else {
                greetingMessage = "Good evening!";
            }

            $('#greeting').text(greetingMessage);
        }
        setDynamicGreeting();
    }


    // --- Contact Form Validation for the Contact page only ---
    if (window.location.pathname.endsWith('contact.html')) {
        $('#contact-form').on('submit', function(event) {
            event.preventDefault();

            const name = $('#name').val().trim();
            const email = $('#email').val().trim();
            const message = $('#message').val().trim();

            if (name === "" || email === "" || message === "") {
                alert('Please fill in all fields.');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message! It has been submitted successfully.');
            $('#contact-form')[0].reset();
        });
    }


    // --- Interactive Projects Gallery for the Projects page only ---
    if (window.location.pathname.endsWith('projects.html')) {
        const projectsData = {
            1: { title: "Project: RETXSCAN", description: "It is a python based project that enables user to study about the retina of eye.It artificially creates synthesized retina images and provides analytical data to the users that enables them to understand it and make their inferences. This is mainly for users who are currently who is pursuing for opthalmologist.", image: "D:\my-portfolio\images\retx.png" },
            2: { title: "Project:RETLIVE ", description: "It is a project that enables the user to scan their eyes and get analytical results using user's device webcam", image: "D:\my-portfolio\images\retlive.png" },
            3: { title: "Project:YOLO VEHICLE DETECTION", description: "Real-time vehicle detection system using YOLO to detect and count cars and bikes with live visual feedback. Along with this the user is also provided the option to connect cctv to analyze footage.The model was trained using the help of Roboflow.", image: "D:\my-portfolio\images\Screenshot 2025-06-20 114335.png" }
        };

        $('#project-gallery').on('click', '.project-thumbnail', function() {
            const projectId = $(this).data('project-id');
            const project = projectsData[projectId];

            if (project) {
                $('#project-display-area h3').text(project.title);
                $('#project-display-area p').text(project.description);
                $('#project-display-area img').attr('src', project.image);
            }
        });
    }

    // --- API Integrations for the Features page only ---
    if (window.location.pathname.endsWith('features.html')) {
        // Dev.to API
        function fetchDevToArticles() {
            const apiUrl = 'https://dev.to/api/articles?per_page=5';

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(articles => {
                    const devtoFeed = $('#devto-feed');
                    devtoFeed.empty();

                    articles.forEach(article => {
                        const li = $('<li>');
                        const a = $('<a>').attr('href', article.url).attr('target', '_blank').text(article.title);
                        li.append(a);
                        devtoFeed.append(li);
                    });
                })
                .catch(error => {
                    console.error('Error fetching Dev.to articles:', error);
                    $('#devto-feed').html('<li>Failed to load articles.</li>');
                });
        }
        fetchDevToArticles();

        // OpenWeatherMap API
        $('#get-weather-btn').on('click', function() {
            const city = $('#city-input').val().trim();
            const apiKey = 'aa03f6d8c48742d0ca7f2336ed022620';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            if (city === "") {
                alert("Please enter a city name.");
                return;
            }


            fetch(weatherUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('City not found or an API error occurred.');
                    }
                    return response.json();
                })
                .then(data => {
                    const weatherDisplay = $('#weather-display');
                    const cityName = data.name;
                    const temp = data.main.temp;
                    const description = data.weather[0].description;
                    const iconCode = data.weather[0].icon;
                    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

                    weatherDisplay.html(`
                        <h3>Weather in ${cityName}</h3>
                        <p>Temperature: ${temp}°C</p>
                        <p>Description: ${description}</p>
                        <img src="${iconUrl}" alt="Weather Icon">
                    `);
                })
                .catch(error => {
                    alert(error.message);
                    console.error('Error fetching weather data:', error);
                    $('#weather-display').empty();
                });
        });
    }

});
