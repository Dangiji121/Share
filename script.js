document.addEventListener("DOMContentLoaded", function() {
        const pageTitle = encodeURIComponent(document.title);
        const pageUrl = encodeURIComponent(window.location.href);

        // WhatsApp Share URL
        document.getElementById('whatsapp-share').href = `https://api.whatsapp.com/send?text=${pageTitle} - ${pageUrl}`;

        // Twitter Share URL
        document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`;

        // Telegram Share URL
        document.getElementById('telegram-share').href = `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`;

        // Facebook Share URL
        document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;

        // Pinterest Share URL
        document.getElementById('pinterest-share').href = `https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}`;
    });
let currentIndex = 0; // To keep track of the number of posts shown
  let posts = [];       // Will hold the RSS feed entries

  // Fetch posts labeled "Fortnite Quotes"
  fetch('https://fortnitequoteoftheday.blogspot.com/feeds/posts/default/-/Fortnite%20Quotes?alt=json')
    .then(response => response.json())
    .then(data => {
        posts = data.feed.entry;
        displayPosts(); // Show the initial set of posts (6 posts)

        // Show "Load More" button if more than 6 posts are available
        if (posts.length > 6) {
            document.getElementById('load-more').style.display = 'block';
        }
    })
    .catch(error => console.error('Error fetching RSS feed:', error));

  function displayPosts() {
      const postContainer = document.getElementById('post-container');
      const postsToDisplay = posts.slice(currentIndex, currentIndex + 6);
      currentIndex += 6;  // Update the index to load the next 6 posts on clicking "Load More"

      postsToDisplay.forEach(entry => {
          const postTitle = entry.title.$t;
          const postLink = entry.link.find(l => l.rel === 'alternate').href;
          const content = entry.content.$t;
          const imageUrl = content.match(/<img[^>]+src="?([^"\s]+)"?/);

          const postElement = document.createElement('div');
          postElement.classList.add('post-container'); // Add post container styling

          // Use the image URL if available, otherwise, show a placeholder image
          const imageTag = imageUrl ? `<a href="${postLink}" target="_blank"><img src="${imageUrl[1]}" alt="Post image"></a>` : `<a href="${postLink}" target="_blank"><img src="placeholder.jpg" alt="No image available"></a>`;

          postElement.innerHTML = `
              <div class="post">
                  ${imageTag}
                  <div class="post-content">
                      <h3><a href="${postLink}" target="_blank">${postTitle}</a></h3>
                  </div>
              </div>
          `;

          postContainer.appendChild(postElement);
      });

      // Hide "Load More" button if no more posts to load
      if (currentIndex >= posts.length) {
          document.getElementById('load-more').style.display = 'none';
      }
  }

  // Attach event listener to the "Load More" button
  document.getElementById('load-more').addEventListener('click', displayPosts);
