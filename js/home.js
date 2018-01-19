$(document).ready(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      if (photoURL === null) {
        $('.perfil').attr('src', '../assets/img/user.png');
      } else {
        $('.perfil').attr('src', photoURL);
      }     


    } else {
      // sign out
    }
  });
});