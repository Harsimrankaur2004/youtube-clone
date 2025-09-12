import { videoData } from "./data/youtubeVideosData.js";

const url = new URL(window.location.href);
let search = url.searchParams.get('search');

let filterVideoData = videoData;

if (search) {
  search = search.toLowerCase();
  

  filterVideoData = videoData.filter((videoInfo) => {
    let matchingKeywords = false;

    videoInfo.keywords.forEach(keyword => {
      if (keyword.toLowerCase().includes(search.toLowerCase())) {
        matchingKeywords = true;
      }
    });

    return videoInfo.videoTitle.toLowerCase().includes(search.toLowerCase()) ||
    videoInfo.videoAuthor.toLowerCase().includes(search.toLowerCase()) || matchingKeywords;
  });
}

let videoPreviewHTML = "";


filterVideoData.forEach(videoInfo => {
   
  videoPreviewHTML += `
    <div class="video-preview">
        <div class="thumbnail-row">
            <a href="${videoInfo.videoLink}" target="blank">
                <img class="thumbnail" src="${videoInfo.thumbnail}">
            </a>
            <div class="video-time">
              ${videoInfo.time}
            </div>
        </div>
        <div class="video-info-grid">
            <div class="channel-picture">
                <img class="profile-picture" src="${videoInfo.channerPicture}">
            </div>
            <div class="video-info">
                <p class="video-title">
                    ${videoInfo.videoTitle}
                </p>
                <p class="video-author">
                    ${videoInfo.videoAuthor} <span class="tick">&#10004;</span>
                </p>
                <p class="video-stats">
                    ${videoInfo.videoStats.views} &#183; ${videoInfo.videoStats.timeDuration} ago
                </p>
            </div>
        </div>
    </div>
  `;
});

document.querySelector('.js-video-grid')
  .innerHTML = videoPreviewHTML;

document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value

    window.location.href = `youtube.html?search=${search}`;
  });

  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value
        window.location.href = `index.html?search=${searchTerm}`;
      }
    })