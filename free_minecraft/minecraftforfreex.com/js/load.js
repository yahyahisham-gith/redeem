//const splash = document.getElementById('splash');

//setTimeout(() => {
//  splash.style.visibility = 'visible';

  // 👇️ if you used `display` to hide element
  // el.style.display = 'block';
//}, 2000); // 👈️ delay in milliseconds

//function afterSplash() {
	
	const afterSplash = document.getElementById('afterSplash');
   setTimeout(() => {
    afterSplash.style.visibility = 'visible';
    splash.style.visibility = 'hidden';
  // 👇️ if you used `display` to hide element
     //el.style.display = 'block';
  }, 3000); // 👈️ delay in milliseconds
//}

//$('img.splash').click(function(){
//    afterSplash();
//});

function loadGame() {
  var URL = document.getElementById("eaglerVersion").value;
  var baseHTML = '<p>Click the <img style="opacity:0.5;" src="/images/fullscreen.png" /> button at the top right of the game to toggle fullscreen on and off.</p>' +
	'<div class="embed-responsive embed-responsive-16by9">' +
	'<div class="fs" style="padding-top:10px;width:42px;float:right;">' +
	'<div id="fsButton" title="Toggle Fullscreen"></div></div>' +
	'<iframe allow="clipboard-read; clipboard-write" id="game" src="' + URL + '" scrolling="no"></iframe></div>' +
	'<p style="margin-top:12px;margin-bottom:-4px;">Press <kbd>Esc</kbd> to show your cursor.</p>';
  document.getElementById("eaglerGame").innerHTML = baseHTML;
}

function loadFS() {
	$.getScript("https://minecraftforfreex.com/js/fs.js", function() {
	});
}

document.addEventListener('DOMContentLoaded', function() {
    // Use event delegation to listen for clicks on the fsButton
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element is the fsButton
        if (event.target && event.target.id === 'fsButton') {
            // Wait for the fullscreen toggle to complete
            setTimeout(checkFullscreenState, 100); // Delay to allow class toggle
        }
    });
});

function checkFullscreenState() {
    // Check if the game container has the 'fullscreen' class
    var gameContainer = document.querySelector('#game');
    
    if (gameContainer && gameContainer.classList.contains('fullscreen')) {
        console.log("Fullscreen mode is active");
        disableAdScript();
    } else {
        console.log("Fullscreen mode is not active");
        enableAdScript();
		//disableAdScript2();
    }
}

function disableAdScript() {
    const adScript = document.querySelector('script[data-cfasync="false"]');
    if (adScript) {
        adScript.remove();
    }
}

function disableAdScript2() {
    console.log("Disabling ad script...");

    // Find and remove the dynamically created external script with the base URL
    const dynamicScript = document.querySelector('script[src^="https://gekeebsirs.com/tag.min.js"]');
    if (dynamicScript) {
        dynamicScript.remove();
        console.log("Dynamically created ad script removed.");
    } else {
        console.log("No ad script found to remove.");
    }
}

function enableAdScript() {
    if (!document.querySelector('script[data-cfasync="false"]')) {
        const script = document.createElement('script');
        script.setAttribute('data-cfasync', 'false');
        script.src = "//d3lliyjbt3afgo.cloudfront.net/?yilld=990913";
        document.body.appendChild(script);
    }
}

function enableAdScript2() {
    console.log("Enabling ad script...");

    // Check if the dynamically created script is not present and add it
    if (!document.querySelector('script[src^="https://gekeebsirs.com/tag.min.js"]')) {
        const script = document.createElement('script');
        script.src = `https://gekeebsirs.com/tag.min.js?t=${new Date().getTime()}`; // Adding timestamp to avoid caching
        script.setAttribute('data-zone', '8267008');
        document.body.appendChild(script);
        console.log("Ad script re-added.");
    } else {
        console.log("Ad script already present, no need to add.");
    }
}