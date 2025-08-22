const video = document.getElementById('myVideo');
const poll = document.getElementById('poll');
const results = document.getElementById('results');

let votes = { "No Clue": 0, "Its Clobbering time": 0 };
let totalVotes = 0;
let pollShown = false; // prevent poll from showing multiple times

// Show poll at 0.21s
video.addEventListener('timeupdate', () => {
  if (video.currentTime >= 0.21 && !pollShown) {
    video.pause();
    poll.style.display = "flex";
    pollShown = true; // only show once
  }
});

function submitVote(choice) {
  // Track votes
  votes[choice]++;
  totalVotes++;

  // Calculate percentages
  let percentA = Math.round((votes["No Clue"] / totalVotes) * 100);
  let percentB = Math.round((votes["Its Clobbering time"] / totalVotes) * 100);

  // Update bars
  document.getElementById("barA").style.width = percentA + "%";
  document.getElementById("barA").textContent = `No Clue - ${percentA}%`;

  document.getElementById("barB").style.width = percentB + "%";
  document.getElementById("barB").textContent = `Its Clobbering time - ${percentB}%`;

  // Switch poll → results
  poll.style.display = "none";
  results.style.display = "flex";

  // Resume video after 3s
  setTimeout(() => {
    results.style.display = "none";
    video.play();
  }, 3000);
}
