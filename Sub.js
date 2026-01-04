const API_KEY = 'AIzaSyDAzjlLTXdk-x1Fjb4z91GCNo15whaXfiM'; 
const CHANNEL_ID = 'UCtLShIQUv-vRmiCunUZV-YA';
const GOAL_NUMBER = 100;

function updateSubCount() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subCount = parseInt(data.items[0].statistics.subscriberCount);
        
        // Update the number text
        document.getElementById('sub-count').innerText = subCount.toLocaleString();

        // Update the progress bar and labels
        updateProgress(subCount);
      }
    })
    .catch(error => console.error('Error fetching YouTube data:', error));
}

function updateProgress(subCount) {
    const fill = document.getElementById('progress-bar-fill');
    const percentText = document.getElementById('goal-percent');
    const caption = document.getElementById('goal-caption');

    const cleanPercent = Math.min(Math.max((subCount / GOAL_NUMBER) * 100, 0), 100);
    const remaining = Math.max(GOAL_NUMBER - subCount, 0);

    // This triggers the seamless transition in your CSS
    fill.style.width = `${cleanPercent}%`;
    percentText.innerText = `${Math.floor(cleanPercent)}%`;
    
    if (remaining > 0) {
        caption.innerText = `Only ${remaining} more to go until the big 100!`;
    } else {
        caption.innerText = "100 Subscribers Reached! New goal coming soon.";
    }
}

// Initial Run
updateSubCount();

// 30 seconds is a safe interval to stay within your quota
setInterval(updateSubCount, 30000);