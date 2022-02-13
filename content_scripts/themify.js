(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    /**
     * Change the theme of the document to be colored with the
     * color passed by the message corresponding to the color
     * picked from the popup
     */
    function changeTheme(color) {
      document.body.style.border = "5px solid " + color;
      documnt.body.style.scrollbarBaseColor = "5px solid red"; 
      documnt.body.style.scrollbarArrowColor = "red"; 
      documnt.body.style.scrollbarTrackColor = "red"; 
    }
  
    /**
     * Reset the theme of the page to default
     */
    function resetTheme() {
      document.body.style.border = "0px solid red";
    }
  
    /**
     * Listen for messages from the background script.
     * Call "changeTheme()" or "resetTheme()".
     */
    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "themify") {
        changeTheme(message.color);
      } else if (message.command === "reset") {
        resetTheme();
      }
    });
  })();
  