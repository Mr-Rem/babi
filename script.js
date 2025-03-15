
function startCamera() {
    document.getElementById('question-container').classList.add('hidden'); 
    document.getElementById('congrats-message').classList.remove('hidden');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            let video = document.getElementById('video');
            video.srcObject = stream;
            video.classList.remove('hidden');

            // Ensure video is ready before capturing
            video.onloadedmetadata = function () {
                setTimeout(captureImage, 3000); // Wait for 3 seconds before taking a picture
            };
        })
        .catch(function (error) {
            console.error("Error accessing camera:", error);
        });
}

function captureImage() {
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    // Set canvas size to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get current date and time
    let now = new Date();
    let dateTimeString = now.toLocaleString(); // Example: "3/13/2025, 10:45 PM"

    // Define text properties
    const mainText = "Starting now, this is Remuel's girlfriend!";
    const fontSizeMain = 40;
    const fontSizeDate = 30;
    const padding = 20;
    const textColor = "#B2B2B2"; // Ash grey color

    // Set up font styles
    context.font = `bold ${fontSizeMain}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = textColor;
    context.shadowColor = "black"; // Text shadow for readability
    context.shadowBlur = 5;

    // Calculate text placement at bottom-center
    const boxHeight = fontSizeMain + fontSizeDate + padding * 3;
    const textY = canvas.height - boxHeight / 2 - 20; // Move text slightly above the bottom edge

    // Draw semi-transparent background for text
    context.fillStyle = "rgba(0, 0, 0, 0.6)"; // Semi-transparent black
    context.fillRect(0, canvas.height - boxHeight - 10, canvas.width, boxHeight);

    // Reset text color to ash grey after background
    context.fillStyle = textColor; 

    // Draw the main message
    context.fillText(mainText, canvas.width / 2, textY);

    // Draw the date below
    context.font = `italic ${fontSizeDate}px Arial`;
    context.fillText(dateTimeString, canvas.width / 2, textY + fontSizeDate + padding);

    // Stop the camera
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // Hide video, show the captured image
    video.classList.add('hidden');
    canvas.classList.remove('hidden');

    // Convert canvas to an image and allow download
    let imageUrl = canvas.toDataURL("image/png");
    let downloadLink = document.getElementById('downloadLink');
    downloadLink.href = imageUrl;
    downloadLink.classList.remove('hidden');
}

    // Attach function to Yes button
    document.getElementById('yesButton').onclick = function () {
        alert('Yay! ❤️');
        startCamera();
    };

function nextPage(page) {
    // Hide all pages
    document.querySelectorAll('.container > div').forEach(el => el.classList.add('hidden'));

    // Show the next page
    let currentPage = document.getElementById('page' + page);
    currentPage.classList.remove('hidden');

    let paragraph = currentPage.querySelector("p");
    let nextButton = currentPage.querySelector(".cupid-btn");

    // Hide the "Next" button initially on every page
    if (nextButton) nextButton.style.display = "none";

    if (paragraph) {
        let text = paragraph.getAttribute("data-text");
        typeText(paragraph, text, () => speakText(text, nextButton));
    }
}

let evadeCount = 0;

function evadeNoButton() {
    let noButton = document.getElementById("noButton");
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    noButton.style.transform = `translate(${x}px, ${y}px)`;
}


function evadeNoButton() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const emojis = ["😜", "😂", "😆", "🙃", "🤣", "🤪", "🥰"];

    // Random translation instead of absolute positioning
    let randomX = (Math.random() * 200 - 100) + 'px'; // Move within -100 to 100px range
    let randomY = (Math.random() * 200 - 100) + 'px';

    noButton.style.transition = "transform 0.3s ease-out";
    noButton.style.transform = `translate(${randomX}, ${randomY})`;

    // Increase "Yes" button size slightly
    let currentYesSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = (currentYesSize + 2) + 'px';

    // Change button text to a random emoji
    noButton.innerText = emojis[Math.floor(Math.random() * emojis.length)];
}

        function createFloatingHeart() {
            let heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';

            let container = document.querySelector('.container'); 
            let containerRect = container.getBoundingClientRect(); 

            let randomX;
            do {
                randomX = Math.random() * window.innerWidth; 
            } while (randomX > containerRect.left && randomX < containerRect.right); 

            heart.style.left = randomX + 'px';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }

        setInterval(createFloatingHeart, 700);

        function createStars() {
            for (let i = 0; i < 50; i++) {
                let star = document.createElement('div');
                star.classList.add('star');
                star.style.top = Math.random() * 100 + 'vh';
                star.style.left = Math.random() * 100 + 'vw';
                star.style.animationDuration = Math.random() * 2 + 1 + 's';
                document.body.appendChild(star);
            }
        }
        createStars();

        document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".container p").forEach(p => {
        p.setAttribute("data-text", p.innerHTML.trim()); // Store full text
        p.innerHTML = ""; // Clear text initially
    });

    // Hide all "Next" buttons
    document.querySelectorAll(".cupid-btn").forEach(btn => btn.style.display = "none");

    // Start first page when user interacts
    document.body.addEventListener("click", function startStory() {
        document.body.removeEventListener("click", startStory); // Only trigger once
        nextPage(1);
    });
});

function nextPage(page) {
    // Hide all pages
    document.querySelectorAll('.container > div').forEach(el => el.classList.add('hidden'));

    // Show the new page
    let currentPage = document.getElementById('page' + page);
    if (!currentPage) return; // Stop if there's no next page

    currentPage.classList.remove('hidden');

    let paragraph = currentPage.querySelector("p");

    if (paragraph) {
        let text = paragraph.getAttribute("data-text");
        typeText(paragraph, text, () => speakText(text, page));
    }
}

// Function to type text smoothly and trigger speech
function typeText(element, text, callback = null, speed = 50) {
    let i = 0;
    element.innerHTML = ""; // Clear text

    function typing() {
        if (i < text.length) {
            element.innerHTML += text[i]; // Add one letter at a time
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            setTimeout(callback, 100); // Delay before speaking
        }
    }

    typing();
}

// Function to speak text and automatically go to the next page
function speakText(text, currentPage) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        window.speechSynthesis.cancel(); // Stop any ongoing speech
        window.speechSynthesis.speak(utterance);

        // Move to the next page after speech ends
        utterance.onend = function () {
            let nextPageNumber = currentPage + 1;
            let nextPageElement = document.getElementById('page' + nextPageNumber);
            
            if (nextPageElement) {
                setTimeout(() => nextPage(nextPageNumber), 1000); // Smooth delay before transitioning
            }
        };
    }
}
function openGift() {
    let giftWrap = document.querySelector(".gift-wrap"); // Select the wrapping
    let lid = document.querySelector(".lid"); // Select the lid
    let giftImage = document.querySelector(".hidden-image"); // Select the image
    let emoji = document.querySelector(".emoji"); // Select the emoji
    let heading = document.querySelector("h2"); // Select the heading

    // Animate the lid to open
    lid.style.transform = "translateY(-50px) rotate(-15deg)";
    lid.style.transition = "transform 0.5s ease-out";

    // Fade out the wrapping
    giftWrap.style.opacity = "0";
    giftWrap.style.transition = "opacity 0.5s ease-out";

    // Ensure the image, emoji, and heading appear after animation
    setTimeout(() => {
        giftWrap.style.display = "none"; // Fully hides wrapping
        giftImage.style.opacity = "1"; // Makes image visible
        giftImage.classList.remove("hidden"); // Ensure it's not hidden
        emoji.classList.remove("hidden");
        heading.classList.remove("hidden");
    }, 500);

    // Play background music
    let bgMusic = document.getElementById("bg-music");
        bgMusic.play();
        bgMusic.volume = 0.3; // Set to 50% volume
}
function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                let video = document.getElementById('video');
                video.srcObject = stream;
                video.classList.remove('hidden');
                
                // Wait for the camera to be ready, then capture image
                setTimeout(captureImage, 3000); // Wait 3 seconds before taking picture
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
            });
    }

    function captureImage() {
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');

        // Set canvas size to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get the current date and time
        let now = new Date();
        let dateTimeString = now.toLocaleString(); // Format: MM/DD/YYYY, HH:MM:SS

        // Add overlay text
        context.fillStyle = "red"; // Text color
        context.font = "40px Arial"; // Font size and type
        context.fillText("Starting now, this is Remuel's girlfriend!", 50, 50);
        context.fillText(dateTimeString, 50, 100);

        // Stop the camera
        let stream = video.srcObject;
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop());

        // Hide video, show the captured image
        video.classList.add('hidden');
        canvas.classList.remove('hidden');

        // Convert canvas to an image and allow download
        let imageUrl = canvas.toDataURL("image/png");
        let downloadLink = document.getElementById('downloadLink');
        downloadLink.href = imageUrl;
        downloadLink.classList.remove('hidden');
    }

    // Attach function to Yes button
    document.getElementById('yesButton').onclick = function () {
        alert('Yay! ❤️');
        acceptProposal();
        startCamera();
    };

    function acceptProposal() {
        // Hide the h2 and buttons in page5
        document.querySelector("#page5 h2").style.display = "none";
        document.getElementById("yesButton").style.display = "none";
        document.getElementById("noButton").style.display = "none";
    }
    
