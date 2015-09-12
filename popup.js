var getCheckboxesValue = function(boxes) {
  var result = [];
  [].forEach.call(boxes, function(element) {
    result.push(element.value);
  });

  return result;
};


var PopupController = function () {
  this.button = document.getElementById('button');
  this.buffer = null;
  this.output = document.getElementById('output');
  this.addListeners();
};

PopupController.prototype = {
  button: null,
  addListeners: function () {
    this.button.addEventListener('click', this.handleClick.bind(this));
  },
  handleClick: function () {
    self = this;
    chrome.tabs.executeScript(null, {file: "get_dom.js"}, function () {
      if (chrome.extension.lastError) {
        console.log(chrome.extension.lastError.message)
      }
      self.buffer.tags = getCheckboxesValue(document.querySelectorAll('input[name="tags[]"]:checked'))
      self.output.textContent = YAML.dump(self.buffer, 2, 2);
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
