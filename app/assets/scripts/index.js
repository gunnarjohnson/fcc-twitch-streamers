var twitchUsers = [
  "freecodecamp",
  "esl_csgo",
  "rocketleague"
];

twitchUsers.forEach(function twitchStreamersInfo(username) {
    $.ajax({
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + username,
      dataType: "jsonp",
      success:function useStreamersInfo(data) {
        (function makeDiv() {
          // Creates url div
          var urlDiv = document.createElement("div");
          // Appends url div
          document.getElementById("twitch-user--" + username).appendChild(urlDiv);
          urlDiv.id = "twitch-channel--" + username;
          // Creates onclick function for url div
          urlDiv.style.cursor = 'pointer';
          document.getElementById(urlDiv.id).onclick = function openChannel() {
              window.open("https://www.twitch.tv/" + username, "_blank","resizable=yes");
          };
          (function displayData() {
            // If channel is streaming
            if (data.stream != null) {
              // Assigns div class names
              document.getElementById("twitch-user--" + username).className = "twitch-user--online";
              urlDiv.className = "twitch-channel--online";
              // Adds username and game name to divs
              var game = data.stream.game;
              urlDiv.innerHTML = "<h4>" + game + "</h4>";
            }
            // If channel isn't streaming
            else {
              // Assigns div class name
              document.getElementById("twitch-user--" + username).className = "twitch-user--offline";
              urlDiv.className = "twitch-channel--offline";
              // Adds username and offline text to div
              urlDiv.innerHTML = "<h4>OFFLINE</h4>";
            }
          }());
        }());
      }
    });
});