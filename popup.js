// var getCheckboxesValue = function(boxes) {
//   var result = [];
//   [].forEach.call(boxes, function(element) {
//     result.push(element.value);
//   });

//   return result;
// };

var PopupController = function () {
  this.button = document.getElementById('button');
  this.buffer = null;
  this.output = document.getElementById('output');
  this.addListeners();
};

var dump = function(input) {
  output = "";

  for (key in input) {
    value = input[key];

    if(value instanceof Array) {
      output += "    " + key + ":" + "\n      - " + value[0] + "\n";
    } else if (key == "title") {
      output += "  - " + key + ":" + " '" + value + "'\n";
    } else {
      output += "    " + key + ":" + " '" + value + "'\n";
    }
  }

  return output;
}


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
      // We currently only support one tag
      self.buffer.tags = [document.querySelectorAll('input[name="tags"]:checked')[0].value]
      self.output.textContent = dump(self.buffer);
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
