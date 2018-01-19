$(document).ready(function() {
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      $('#send').on('click', function() {
        var time = moment().format('LT');
        var coments = $('#coments').val();
        if ($('#coments').val().length > 0) {
          var coments = {
            name: displayName,
            photo: photoURL,
            coments: coments,
            time: time
          };
          database.ref('coments').push(coments);
          $('#coments').val('');
        }
      });
      var showComents = firebase.database().ref('coments');
      showComents.on('child_added', function(data) {
        $('.container-coments').append('<div class="row message"><div class="col-xs-2 col-md-1 col-lg-1"><img class="img-responsive img-circle" src="' + data.val().photo + '"></div><div class="col-xs-7 col-md-9 col-lg-9"><p><strong>' + data.val().name + ' dice:</strong><br>' + data.val().coments + '</p></div><div class="col-xs-3 col-md-2 col-lg-2"><span>' + data.val().time + '</span></div></div>');
      });
    } else {
      // sign out
    }
  });
  /* */
});