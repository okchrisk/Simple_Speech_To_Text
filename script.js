var forbiddenChar = 'e';
var counter = 0;

var phrase = document.querySelector('.phrase');
var result = document.querySelector('.result');
var output = document.querySelector('.output');
var btnStart = document.querySelector('.btnStart');
var btnStop = document.querySelector('.btnStop');
btnStop.disabled = true;

var VoiceToText = new webkitSpeechRecognition();
VoiceToText.continuous = true;
VoiceToText.interimResults = true;
VoiceToText.lang = "en-US";

function start() {
  output.innerHTML = "...";
  btnStart.textContent = "Listening..."
  phrase.textContent = "Letter not use: " + forbiddenChar;

  btnStart.disabled = true;
  btnStop.disabled = false;

  VoiceToText.start();

  VoiceToText.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        for (var i = 0; i < transcript.length; i++) {
          var c = transcript.charAt(i);
          if (c == forbiddenChar) {
            counter++;
          }
        }
        if (counter == 0) {
          result.innerHTML = '<img src="images/greenCircle.png" width="100px" height="auto">';
        } else {
          result.innerHTML = '<img src="images/redCircle.png" width="100px" height="auto">';
          counter = 0;
        }
      }
      output.innerHTML = transcript;
    }
  }
}

function stop() {
  VoiceToText.stop();

  btnStart.textContent = "Start listening";
  phrase.textContent = "What letter to avoid (click on start)";

  result.innerHTML = '<img src="images/greyCircle.png" width="100px" height="auto">';
  output.innerHTML = "...";

  btnStart.disabled = false;
  btnStop.disabled = true;
}
