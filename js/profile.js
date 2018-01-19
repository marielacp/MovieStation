$(document).ready(function() {
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var showPersonalMovie = firebase.database().ref('personalMovie');
      showPersonalMovie.on('child_added', function(data) {
        if (user.uid === data.val().user) {
          $('.border-container').prepend('<div>' + data.val().title + '<div/>');
        }
      });
    } else {

    }
  });
});