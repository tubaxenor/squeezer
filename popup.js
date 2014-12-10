var PopupController = function () {
  this.button_ = document.getElementById('button');
  this.buffer = null;
  this.addListeners_();
};

PopupController.prototype = {
  /**
   * A cached reference to the button element.
   *
   * @type {Element}
   * @private
   */
  button_: null,


  /**
   * Adds event listeners to the button in order to capture a user's click, and
   * perform some action in response.
   *
   * @private
   */
  addListeners_: function () {
    this.button_.addEventListener('click', this.handleClick_.bind(this));
  },

  /**
   * Handle a success/failure callback from the `browsingData` API methods,
   * updating the UI appropriately.
   *
   * @private
   */
  // handleCallback_: function () {
  //   var success = document.createElement('div');
  //   success.classList.add('overlay');
  //   success.setAttribute('role', 'alert');
  //   success.textContent = 'Data has been cleared.';
  //   document.body.appendChild(success);

  //   setTimeout(function() { success.classList.add('visible'); }, 10);
  //   setTimeout(function() {
  //     if (close === false)
  //       success.classList.remove('visible');
  //     else
  //       window.close();
  //   }, 4000);
  // },

  /**
   * When a user clicks the button, this method is called: it reads the current
   * state of `timeframe_` in order to pull a timeframe, then calls the clearing
   * method with appropriate arguments.
   *
   * @private
   */
  handleClick_: function () {
    self = this;
    chrome.tabs.executeScript(null, {file: "get_dom.js"}, function () {
      if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message)
      }
      console.log(self.buffer);
    })
  },
};

document.addEventListener('DOMContentLoaded', function () {
  window.PC = new PopupController();

  chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getDOM") {
      PC.buffer = request.source
    }
  });
});
