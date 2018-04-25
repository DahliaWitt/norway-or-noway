/**
 * ap csp is for the nords
 * AP Computer Science Principals Create Task
 * Artisinally Crafted by Drake Witt
 */
var audio; // audio object, assigned in toggleAudio() 
var audioPlaying = false; // boolean
// Array of Image URLS to randomly grab for popup
var imageUrls = ['cohn.png', 'jaiven.png', 'jesus.jpeg', 'leif.jpeg', 'sean.png', 'sponge.png'];
var prevImg = "";

// Button click event listner with callback function
document.getElementById('buttonTheBrave').addEventListener('click', function () {
    // Start the app
    startApp();
});

function startApp() {
    toggleAudio();
    // Open three new windows
    for (var i = 0; i < 3; i++) {
        openNewWindow();
    }
}

function toggleAudio() {
    console.log("Toggle audio");
    if (!audioPlaying) {
        // Theme of Scotland Forever (Scotland Remix) but its Norway Forever instead.
        audioPlaying = true;
        audio = new Audio("./norway.mp3");
        audio.play();
    } else if (audioPlaying) {
        audio.stop();
        audioPlaying = false;
    }
}

// Open a new popup and move it randomly across the screen
function openNewWindow() {
    // Get random X and Y coords to start out with
    var randomX = randomNumFromRange(0, screen.width);
    var randomY = randomNumFromRange(0, screen.height);
    // Set the window to random X and Y coords
    var specs = "height=400px, width=400px, left=" + randomX + ", top=" + randomY;
    // Create the new window with the target as blank pointing to no URL
    var newWindow = window.open("", "_blank", specs);
    // Since the window actually isn't opening a URL, we inject HTML into our blank page
    var windowImg = getRandomImage();
    // Works sorta like if, but keeps repeating until it gets a unique url
    while (windowImg == prevImg) {
        windowImg == getRandomImage();
    }
    prevImg = windowImg;
    newWindow.document.write("<html>" +
        "<head>" +
        "<title>NORWAY OR NO WAY</title>" +
        "<link rel='stylesheet' href='./style.css'>" +
        "</head>" +
        "<body>" +
        "<div class='norway-container' style='background-image: url(./popImg/" + windowImg + ")'></div>" +
        "</body>" +
        "</html>")
    // Randomly move the window every 300ms
    setInterval(function () {
        var randomX = randomNumFromRange(0, screen.width);
        var randomY = randomNumFromRange(0, screen.height);
        newWindow.moveTo(randomX, randomY);
    }, 300);
}

// Random number generator abstracted. This funciton provides a random number between two integers, using the Javascript Math library. 
function randomNumFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImage() {
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}