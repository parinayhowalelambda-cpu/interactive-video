const video = document.getElementById('myVideo');
const poll = document.getElementById('poll');

// Show poll at 10 seconds
video.addEventListener('timeupdate', () => {
  if (video.currentTime >= 10 && poll.style.display === "none") {
    video.pause();
    poll.style.display = "flex";
  }
});

function submitVote(choice) {
  // Send data to Google Sheets Web App
  fetch("https://script.google.com/macros/s/AKfycbw0_3BRMzdgbN5Z2rp6PasnDRbjaGtvMz3OolIqgch82rJKM6OZkFLuvRPrl9Gr8GaB/exec", {
    method: "POST",
    body: JSON.stringify({ answer: choice, time: new Date().toISOString() }),
    headers: { "Content-Type": "application/json" }
  }).then(() => {
    alert("Vote recorded: " + choice);
    poll.style.display = "none";
    video.play();
  });
}
