var strip = function(text) {
  var stripped = String(text).replace(/(\r\n|\n|\r)/g, '').replace(/^\s+|\s+$/g, '');

  return stripped
}

var Meat = function(){
  var url,
      comment = "",
      title = document.getElementsByTagName('head')[0].getElementsByTagName('title')[0].innerHTML || "";

  [].forEach.call(document.getElementsByTagName('meta'), function(element) {
    if(element.getAttribute('property') == 'og:url') {
      url = element.getAttribute('content');
    } else if(element.getAttribute('property') == 'og:description') {
      comment = element.getAttribute('content');
    }
  });

  if(!url) { url = location.href; }

  return { title: strip(title), url: strip(url), comment: strip(comment) }
}

chrome.extension.sendMessage({
  action: "getDOM",
  source: Meat()
});


