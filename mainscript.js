window.onload = gallery;
function gallery() {
    // Fetch the image list from the API
    fetch("https://comp125-a4-api.onrender.com/imagelist")
        //make the response into a json object
        .then(response => response.json())
        .then((data) => {
            //setting all variables and html elements
            let imageList = data.ImageList;
            let image1 = document.getElementById("image1");
            let image2 = document.getElementById("image2");
            let image3 = document.getElementById("image3");
            let arrowL = document.getElementById("arrowL");
            let arrowR = document.getElementById("arrowR");
            let timeDisplay = document.getElementById("timer");
            let restartButton = document.getElementById("restart");

            // Set up click event handlers for the arrows
            arrowL.onclick = () => backwards();
            arrowR.onclick = () => forwards();
            restartButton.onclick = () => restart();

            // Set arrow symbols
            arrowL.innerHTML = "&#9664;";
            arrowR.innerHTML = "&#9654;";
            restartButton.innerHTML = "Restart";

            //variables for controlling the images
            let currentIndex = 0;
            let interval = 0;
            let intervalId;

            function updateImages(index) {
                // Update the image sources based on the current index
                image1.src = imageList[index % imageList.length].name;
                // modulus makes sure i don't get an index out of bounds error
                image2.src = imageList[(index + 1) % imageList.length].name;
                image3.src = imageList[(index + 2) % imageList.length].name;

                // Update the current index and interval
                currentIndex = index % imageList.length;
                interval = imageList[currentIndex].time;

                // Clear the previous interval and set a new one
                clearInterval(intervalId);
                intervalId = setInterval(() => updateImages(currentIndex + 1), interval);

                // Update the time display
                timeDisplay.innerHTML = "The current image will be displayed for: " + interval / 1000 + " seconds";
            }

            // Set an initial timeout to start the image rotation
            intervalId = setTimeout(() => {
                updateImages(currentIndex);
                intervalId = setInterval(() => updateImages(currentIndex + 1), interval);
            }, interval);

            function forwards() {
                // Move to the next image in the list
                currentIndex = (currentIndex + 1) % imageList.length;
                updateImages(currentIndex);
            }

            function backwards() {
                // Move to the previous image in the list
                // Add the length of the list to prevent negative indices
                currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
                updateImages(currentIndex);
            }

            function restart(){
                gallery();
            }

            // Set the initial image sizes so that the code looks good by default
            image1.style.width = "50%";
            image1.style.height = "50%";
            image2.style.width = "50%";
            image2.style.height = "50%";
            image3.style.width = "50%";
            image3.style.height = "50%";
        })
        //error handling because i'm a professional hahahahahaha i wish
        .catch(error => console.error('Error:', error));
};