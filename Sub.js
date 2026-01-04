const API_KEY = 'AIzaSyDAzjlLTXdk-x1Fjb4z91GCNo15whaXfiM'; 
const CHANNEL_ID = 'UCtLShIQUv-vRmiCunUZV-YA';
const GOAL_NUMBER = 100;

function updateSubCount() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subCount = parseInt(data.items[0].statistics.subscriberCount);
        
        // 1. Update the Main Counter Text
        document.getElementById('sub-count').innerText = subCount.toLocaleString();

        // 2. Calculate Progress
        const progressPercent = Math.min((subCount / GOAL_NUMBER) * 100, 100);
        const remaining = Math.max(GOAL_NUMBER - subCount, 0);

        // 3. Update Progress Bar and Labels
        document.getElementById('progress-bar-fill').style.width = progressPercent + "%";
        document.getElementById('goal-percent').innerText = Math.floor(progressPercent) + "%";
        
        if (remaining > 0) {
            document.getElementById('goal-caption').innerText = `Only ${remaining} more to go until the big 100!`;
        } else {
            document.getElementById('goal-caption').innerText = "Goal Reached! New goal coming soon!";
        }
      }
    })
    .catch(error => console.error('Error fetching YouTube data:', error));
}

// Initial Run
updateSubCount();

// Update every 30 seconds (to save API quota)
setInterval(updateSubCount, 30000);