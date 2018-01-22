$(document).ready(function() {
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      $('#signOut-profile').text('Sign Out')
      $('#signOut-profile').on('click', function(){
        firebase.auth().signOut()
        .then(function() {
          $(location).attr('href', 'home.html');
          $('#sign-out').text('Sign-In');
        });
      });
      $('#name-user').text(user.displayName)
      if (photoURL === null) {
        $('#img-user').attr('src', '../assets/img/user.png');
      } else {
        $('#img-user').attr('src', photoURL);
      };
      var showPersonalMovie = firebase.database().ref('personalMovie/' + user.uid);
      showPersonalMovie.on('child_added', function(data) {
        console.log(data.val().user);
        if (user.uid === data.val().user) {
          $('.movie-select').prepend('<div class="col-md-4 text-center"><img class="img-resposive img-movie" src="'+data.val().poster+'"><p>'+data.val().title + '</p><p>'+data.val().year+'</p></div>');
        }
      });
    } else {

    }
  });
});