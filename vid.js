// CONFIGURATION
const API_KEY = 'AIzaSyDAzjlLTXdk-x1Fjb4z91GCNo15whaXfiM';
const CHANNEL_ID = 'UCtLShIQUv-vRmiCunUZV-YA';
const VIDEO_ID = 'TnTB0d6jOPA';
const GOAL_NUMBER = 100;

/**
 * Main function to fetch both Channel and Video stats.
 * We use 'async' to ensure the UI updates only when data is ready.
 */
async function updateLiveStats() {
  try {
    // 1. Fetch Video Stats (Views)
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_ID}&key=${API_KEY}`;
    const videoResponse = await fetch(videoUrl);
    const videoData = await videoResponse.json();

    if (videoData.items && videoData.items.length > 0) {
      const views = videoData.items[0].statistics.viewCount;
      const viewElement = document.getElementById("view-count");
      
      // Update text with a subtle "fade" effect if it changed
      if (viewElement.innerText !== `${Number(views).toLocaleString()} Views`) {
        viewElement.style.opacity = 0.5;
        setTimeout(() => {
          viewElement.innerText = `${Number(views).toLocaleString()} Views`;
          viewElement.style.opacity = 1;
        }, 300);
      }
    }

    // 2. Fetch Channel Stats (Subscribers)
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    const channelResponse = await fetch(channelUrl);
    const channelData = await channelResponse.json();

    if (channelData.items && channelData.items.length > 0) {
      const subCount = parseInt(channelData.items[0].statistics.subscriberCount);
      
      // Update the number text
      document.getElementById('sub-count').innerText = subCount.toLocaleString();

      // Update the progress bar logic
      updateProgressUI(subCount);
    }

  } catch (error) {
    console.error('YouTube Live Update Error:', error);
  }
}

function updateProgressUI(subCount) {
  const fill = document.getElementById('progress-bar-fill');
  const percentText = document.getElementById('goal-percent');
  const caption = document.getElementById('goal-caption');

  if (!fill || !percentText) return;

  const cleanPercent = Math.min(Math.max((subCount / GOAL_NUMBER) * 100, 0), 100);
  const remaining = Math.max(GOAL_NUMBER - subCount, 0);

  fill.style.width = `${cleanPercent}%`;
  percentText.innerText = `${Math.floor(cleanPercent)}%`;
  
  if (remaining > 0) {
    caption.innerText = `Only ${remaining} more to go until the big 100!`;
  } else {
    caption.innerText = "Goal Reached! 100 Subs! 🎉";
  }
}

// RUN IMMEDIATELY ON LOAD
updateLiveStats();

// REFRESH EVERY 60 SECONDS
// This keeps your site fresh without hitting YouTube's API limit (Quota).
setInterval(updateLiveStats, 60000);