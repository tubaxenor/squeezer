
var dump = function(input) {
  output = "";

  for (key in input) {
    value = input[key];

    if(value instanceof Array) {
      output += "    " + key + ":" + "\n      - " + value[0] + "\n";
    } else if (key == "title") {
      output += "  - " + key + ":" + " \"" + value + "\"\n";
    } else {
      output += "    " + key + ":" + " \"" + value + "\"\n";
    }
  }

  return output;
}

var strip = function(text) {
  var stripped = String(text).replace(/(\r\n|\n|\r)/g, '').replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g, '');

  return stripped
}

var toDate = function(date_str) {
  var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  var date = new Date(date_str)

  return months[date.getMonth()] + " " + date. getDate();
}

var Meat = function(tag){
  var url,
      date = '',
      comment = '',
      tag = tag !== undefined ? tag : "rb",
      title = document.getElementsByTagName('head')[0].getElementsByTagName('title')[0].innerHTML || "";

  [].forEach.call(document.getElementsByTagName('meta'), function(element) {
    if(element.getAttribute('property') == 'og:url') {
      url = element.getAttribute('content');
    } else if(element.getAttribute('property') == 'og:description') {
      comment = element.getAttribute('content');
    } else if(element.getAttribute('property') == 'article:published_time') {
      date = toDate(element.getAttribute('content'));
    }
  });


  if(!url) { url = location.href; }

  return { title: strip(title), url: strip(url), comment: strip(comment), pubdate: date, tags: [tag] }
}

dump(Meat());
