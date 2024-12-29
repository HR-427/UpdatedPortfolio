/*particle animation*/
document.addEventListener("DOMContentLoaded", () => {
  const particleContainer = document.querySelector('.particle-container');

  if (particleContainer) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${4 + Math.random() * 4}s`; // 4 to 8 seconds
      particle.style.animationDelay = `${Math.random() * 2}s`; // 0 to 2 seconds

      particleContainer.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 8000);
    }

    setInterval(createParticle, 100);
  }
});



/*menu animation*/
document.addEventListener("DOMContentLoaded", () => {
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  const contentWrappers = document.querySelectorAll(".content-wrapper"); // Select all instances

  hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");

      contentWrappers.forEach((contentWrapper) => {
          if (offScreenMenu.classList.contains("active")) {
              contentWrapper.style.transition = "width 0.3s ease";
              contentWrapper.style.width = "67%"; // Shrink width
              offScreenMenu.style.width = "33%";
          } else {
              contentWrapper.style.transition = "width 0.3s ease";
              contentWrapper.style.width = "100%"; // Reset width
          }
      });
  });
});


/*image reveal*/
document.querySelectorAll('.image-container').forEach(function(container) {
  container.addEventListener('click', function handleClick() {
    const image = container.querySelector('.hidden-image'); // Select the image within this container
    if (image) {
      image.classList.add('revealed'); // Add the revealed class
    }
    container.removeEventListener('click', handleClick); // Remove the click event listener for this container
  });
});
/*end of image reveal*/ 


/*for the grey boxes*/
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed'); // Add the revealed class
      entry.target.classList.remove('hidden'); // Remove the hidden class
      observer.unobserve(entry.target); // Stop observing once revealed
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe each hidden element
hiddenElements.forEach(el => observer.observe(el));
/*end of grey boxes*/ 

/*youtube vid stuff*/
var ytplayerList;


function onPlayerReady(e) {
	var video_data = e.target.getVideoData(),
		label = video_data.video_id + ":" + video_data.title;
	e.target.ulabel = label;
	console.log(label + " is ready!");
}


function onPlayerError(e) {
	console.log("[onPlayerError]");
}


function onPlayerStateChange(e) {
	var label = e.target.ulabel;
	if (e["data"] == YT.PlayerState.PLAYING) {
		console.log({
			event: "youtube",
			action: "play:" + e.target.getPlaybackQuality(),
			label: label
		});
		//if one video is play then pause other
		pauseOthersYoutubes(e.target);
	}
	if (e["data"] == YT.PlayerState.PAUSED) {
		console.log({
			event: "youtube",
			action: "pause:" + e.target.getPlaybackQuality(),
			label: label
		});
	}
	if (e["data"] == YT.PlayerState.ENDED) {
		console.log({
			event: "youtube",
			action: "end",
			label: label
		});
	}
	//track number of buffering and quality of video
	if (e["data"] == YT.PlayerState.BUFFERING) {
		e.target.uBufferingCount
			? ++e.target.uBufferingCount
			: (e.target.uBufferingCount = 1);
		console.log({
			event: "youtube",
			action:
				"buffering[" +
				e.target.uBufferingCount +
				"]:" +
				e.target.getPlaybackQuality(),
			label: label
		});
		//if one video is play then pause other, this is needed because at start video is in buffered state and start playing without go to playing state
		if (YT.PlayerState.UNSTARTED == e.target.uLastPlayerState) {
			pauseOthersYoutubes(e.target);
		}
	}
	//last action keep stage in uLastPlayerState
	if (e.data != e.target.uLastPlayerState) {
		console.log(
			label + ":state change from " + e.target.uLastPlayerState + " to " + e.data
		);
		e.target.uLastPlayerState = e.data;
	}
}


function initYoutubePlayers() {
	ytplayerList = null; //reset
	ytplayerList = []; //create new array to hold youtube player
	for (var e = document.getElementsByTagName("iframe"), x = e.length; x--; ) {
		if (/youtube.com\/embed/.test(e[x].src)) {
			ytplayerList.push(initYoutubePlayer(e[x]));
			console.log("create a Youtube player successfully");
		}
	}
}


function pauseOthersYoutubes(currentPlayer) {
	if (!currentPlayer) return;
	for (var i = ytplayerList.length; i--; ) {
		if (ytplayerList[i] && ytplayerList[i] != currentPlayer) {
			ytplayerList[i].pauseVideo();
		}
	}
}


//init a youtube iframe
function initYoutubePlayer(ytiframe) {
	console.log("have youtube iframe");
	var ytp = new YT.Player(ytiframe, {
		events: {
			onStateChange: onPlayerStateChange,
			onError: onPlayerError,
			onReady: onPlayerReady
		}
	});
	ytiframe.ytp = ytp;
	return ytp;
}


function onYouTubeIframeAPIReady() {
	console.log("YouTubeIframeAPI is ready");
	initYoutubePlayers();
}


var tag = document.createElement("script");
//use https when loading script and youtube iframe src since if user is logging in youtube the youtube src will switch to https.
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/*end of vid stuff*/


// script.js
const backToTopButton = document.getElementById('backToTop');

// Show or hide the button when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Smooth scroll to top when the button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
