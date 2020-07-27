import redditApi from "./redditApi";

// Search posts constants
const searchPostForm = document.getElementById('search-post-form');
const searchPostInput = document.getElementById('search-post-input');

// Search subreddits constants
const searchSubredditForm = document.getElementById('search-subreddit-form');
const searchSubredditInput = document.getElementById('search-subreddit-input');


// Search post form event listener
searchPostForm.addEventListener('submit', ev => {
    // Get search term string, sort-by condition and limit
    const searchTerm = searchPostInput.value;
    const searchSortBy = document.querySelector('input[name="post-sortby"]:checked').value;
    const searchLimit = document.getElementById("search-post-limit").value;

    // Validate input and clear it after error message pops up
    if(searchTerm === ''){
        showMessage('Please add a search term', 'alert-danger', 'post', 'search-post-container');
    }
    searchPostInput.value = "";

    // Search through reddit
    redditApi.searchPost(searchTerm, searchLimit, searchSortBy)
        .then(results => {
            let output = '<div class="card-columns">';

            const defaultImage = 'http://www.eggmarketingpr.com/wp-content/uploads/2016/08/Reddit.jpg';

            // Loop through posts
            results.forEach(post =>{
                // Check for image
                const postImage = post.preview
                    ? post.preview.images[0].source.url
                    : defaultImage;

                output += `
                    <div class="card">
                      <img src="${postImage}" class="card-img-top">
                      <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">
                            ${truncateText(post.selftext, 100)}
                        </p>
                        <a href="${post.url}" target="_blank" class="btn btn-primary">Read more</a>
                        <hr>
                        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                        <span class="badge badge-dark">Score: ${post.score}</span>
                      </div>
                    </div>
                `;
            });

            output += '</div>';
            document.getElementById('search-post-results').innerHTML = output;
        });


    ev.preventDefault();
});

// Search subreddit form event listener
searchSubredditForm.addEventListener('submit', ev =>{

    // get search term string, and permission to search 18+ subreddits
    const searchTerm = searchSubredditInput.value;
    const searchNsfw = document.querySelector('input[type="checkbox"]').checked;

    if(searchTerm === ''){
        showMessage('Please add a search term', 'alert-danger', 'subreddit', 'search-subreddit-container');
    }
    searchSubredditInput.value = "";

    //Search through reddit for subreddits
    redditApi.searchSubreddit(searchTerm, searchNsfw);


    ev.preventDefault();
});



// Show message function
function showMessage(message, className, parentDivId, insertBeforeDivId) {
    const messageDiv = document.createElement('div');

    // Add classes to created div and add text to the message div
    messageDiv.className = `alert ${className}`;
    messageDiv.appendChild(document.createTextNode(message));

    // Get parent container and search div
    const searchParentContainer = document.getElementById(parentDivId);
    const searchDiv = document.getElementById(insertBeforeDivId);

    // Insert the message
    searchParentContainer.insertBefore(messageDiv, searchDiv);

    // Hide alert after some time
    setTimeout(() => document.querySelector('.alert').remove(), 5000);
}

// Truncate text
function truncateText(text, limit){
    const shortenedText = text.indexOf(' ', limit);
    if(shortenedText == -1) return text;
    return text.substring(0, shortenedText);
}

