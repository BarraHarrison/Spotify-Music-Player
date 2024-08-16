const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const albumTitleSpan = document.querySelector(".album-title");
const albumNum = document.querySelector(".album-num");
const heroImg = document.querySelector(".hero-img");
const h1Element = document.querySelector("h1");
const emblemDiv = document.querySelector(".emblem");
const bodyElement = document.body; // To change the background color of the entire page
const iframes = document.querySelectorAll('.spotify-frames iframe'); // Select all iframes

let index = 0;

// Define the albums array with the correct track names, artists, and YouTube video IDs
const albums = [
    { name: 'On Air', artist: 'Jay Park', videoId: 'RXK6Ik3QULE', element: document.getElementById('album1'), bgColor: ['#1a1a1a', '#555'], accentColor: '#ff3b3b' },
    { name: 'Where Are You Now', artist: 'Calum Scott', videoId: 'PoP2Sa7wYNQ', element: document.getElementById('album2'), bgColor: ['#112233', '#446688'], accentColor: '#33ffcc' },
    { name: 'Habibi (Albanian Remix)', artist: 'DJ Gimi-O', videoId: 'qcVt9-LqpJI', element: document.getElementById('album3'), bgColor: ['#222', '#776655'], accentColor: '#cc8833' },
    { name: 'Bruk Off Ya Back', artist: 'Chris Brown', videoId: 'DHrj-Lr6a1U', element: document.getElementById('album4'), bgColor: ['#333', '#888'], accentColor: '#ffaa00' },
    { name: 'Lovin’ On Me', artist: 'Jack Harlow', videoId: 'Iq8h3GEe22o', element: document.getElementById('album5'), bgColor: ['#444', '#999'], accentColor: '#ff66ff' },
    { name: 'GATTI', artist: 'Pop Smoke', videoId: 'kx7P_ENnDPE', element: document.getElementById('album6'), bgColor: ['#000', '#333'], accentColor: '#0099ff' },
    { name: 'Can’t Slow Me Down', artist: 'Mirani', videoId: 'xU2U73Tk-DM', element: document.getElementById('album7'), bgColor: ['#666', '#111'], accentColor: '#33ff99' },
    { name: 'VVS', artist: 'Mirani', videoId: 'hq9hcJIzB6w', element: document.getElementById('album8'), bgColor: ['#777', '#444'], accentColor: '#ff9900' },
    { name: 'Butter', artist: 'BTS', videoId: 'WMweEpGlu_U', element: document.getElementById('album9'), bgColor: ['#ffdd99', '#ff9933'], accentColor: '#ffcc33' },
    { name: 'Broadway Girls', artist: 'Morgan Wallen', videoId: '2CNl_CCtE-I', element: document.getElementById('album10'), bgColor: ['#2c2c54', '#4b4b8c'], accentColor: '#ff33cc' }
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));

const handleClickScroll = (val) => {
    if (index + val >= 0 && index + val < albums.length) {
        index += val;
        updateDisplay(index);
    }
};

const updateDisplay = (index) => {
    // Hide all iframes
    iframes.forEach(iframe => iframe.classList.remove('active'));

    // Show the current iframe
    albums[index].element.classList.add('active');

    // Update album title and artist
    albumTitleSpan.textContent = `${albums[index].name} by ${albums[index].artist}`;

    // Update the album number display
    const number = index + 1;
    albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;

    // Update the hero background and text color
    const album = albums[index];
    heroImg.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${album.videoId}?autoplay=1&mute=1&loop=1&playlist=${album.videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    heroImg.style.backgroundImage = `linear-gradient(180deg, ${album.bgColor[0]} 0%, ${album.bgColor[1]} 100%)`;

    // Update the entire page's background color to match the album
    bodyElement.style.backgroundColor = album.bgColor[1];

    // Update h1 styles and trigger transition
    h1Element.style.color = album.accentColor;
    h1Element.classList.remove('album-transition');
    void h1Element.offsetWidth; // Trigger reflow to restart CSS animation
    h1Element.classList.add('album-transition');

    // Update emblem color
    emblemDiv.style.color = album.accentColor;

    // Trigger text visibility
    h1Element.classList.add("show-texts");
};

// Initialize display
updateDisplay(index);

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        handleClickScroll(-1);
    } else if (e.key === "ArrowRight") {
        handleClickScroll(1);
    }
});
