// PASTE YOUR API KEY INSIDE THE QUOTES BELOW
  const API_KEY = 'AIzaSyDAzjlLTXdk-x1Fjb4z91GCNo15whaXfiM';
  
  // Using your verified ID: UCtLShIQUv-vRmiCunUZV-YA
  const CHANNEL_ID = 'UCtLShIQUv-vRmiCunUZV-YA';

  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        const subCount = data.items[0].statistics.subscriberCount;
        document.getElementById('sub-count').innerText = Number(subCount).toLocaleString();
      } else {
         document.getElementById('sub-count').innerText = "???";
         console.error("API error or ID mismatch.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('sub-count').innerText = 'Error';
    });