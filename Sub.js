const API_KEY = 'AIzaSyDAzjlLTXdk-x1Fjb4z91GCNo15whaXfiM'; 
const CHANNEL_ID = 'UCtLShIQUv-vRmiCunUZV-YA';

function updateSubCount() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subCount = data.items[0].statistics.subscriberCount;
        document.getElementById('sub-count').innerText = Number(subCount).toLocaleString();
      }
    })
    .catch(error => console.error('Error:', error));
}

// Run immediately on page load
updateSubCount();

// Then run every 5000 milliseconds (5 seconds)
setInterval(updateSubCount, 5000);