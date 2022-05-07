/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
 const hidePage = `body > :not(.beastify-image) {
    display: none;
  }`;

/**
* Listen for clicks on the buttons, and send the appropriate message to
* the content script in the page.
*/
function listenForClicks() {
  document.addEventListener("click", (e) => {
    var red = document.querySelector('.themeRed');
    var blue = document.querySelector('.themeBlue');
    var green = document.querySelector('.themeGreen');
    var purple = document.querySelector('.themePurple');

    /**
    * send a "themify" message to the content script in the
    * active tab with the relevent color.
    */
    function redify(tabs) {
      blue.classList.remove('border');
      red.classList.add('border');
      purple.classList.remove('border');
      green.classList.remove("border");


      browser.tabs.sendMessage(tabs[0].id, {
        command: "themify",
        color: 'red',
        border: 'solid 100px red'
      });
    }

    function greenify(tabs) {
      blue.classList.remove('border');
      red.classList.remove('border');
      purple.classList.remove('border');
      green.classList.add("border");

      browser.tabs.sendMessage(tabs[0].id, {
        command: "themify",
        color: 'green'
      });
    }

    function blueify(tabs) {
      blue.classList.add('border');
      red.classList.remove('border');
      purple.classList.remove('border');
      green.classList.remove("border");

      browser.tabs.sendMessage(tabs[0].id, {
        command: "themify",
        color: 'blue'
      });
    }

    function purpleify(tabs) {
      blue.classList.remove('border');
      red.classList.remove('border');
      purple.classList.add('border');
      green.classList.remove("border");

      browser.tabs.sendMessage(tabs[0].id, {
        command: "themify",
        color: 'purple'
      });
    }

    /**
    * send a "reset" message to the content script in the active tab.
    */
    function reset(tabs) {
      blue.classList.remove('border');
      red.classList.remove('border');
      purple.classList.remove('border');
      green.classList.remove("border");

      browser.tabs.sendMessage(tabs[0].id, {
        command: "reset",
      });
    }

    /**
    * Just log the error to the console.
    */
    function reportError(error) {
      console.error(`Could not themify: ${error}`);
    }

    /**
    * Get the active tab,
    * then call relevent "[color]ify()" or "reset()" as appropriate.
    */
    if (e.target.classList.contains("themeRed")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(redify)
      .catch(reportError);
    }
    else if (e.target.classList.contains("themeGreen")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(greenify)
      .catch(reportError);
    }
    else if (e.target.classList.contains("themeBlue")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(blueify)
      .catch(reportError);
    }
    else if (e.target.classList.contains("themePurple")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(purpleify)
      .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(reset)
      .catch(reportError);
    }
  });
}

/**
* There was an error executing the script.
* Display the popup's error message, and hide the normal UI.
*/
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute themify content script: ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add a click handler.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_scripts/themify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
