$(document).ready(function() {
  var name = $('#name');
  var email = $('#email');
  var password = $('#password');
  var inputPasswordAgain = $('#inputPasswordAgain');
  var checkbox = $('#checkbox');
  var register = $('#register');
   
  $('#register').on('click', function() {
    var email = $('#email').val();
    var password = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        alert('Registro realizado');
        $(location).attr('href', 'home.html');
      })
      .catch(function(error) {
        // Handle Errors here.
        alert('Ingrese correo y contraseña valido');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });
  $('#login').on('click', function() {
    var email2 = $('#email2').val();
    var password2 = $('#password2').val();
    firebase.auth().signInWithEmailAndPassword(email2, password2)
      .then(function() {
        $('.perfil').attr('src', '../assets/images/foto1.jpg');
      })
      .catch(function(error) {
        alert('Ingrese correo y contraseña valido o Regístrese');
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  });
  function watcher() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        appears();
        console.log('existe usuario activo');
        var usuarios = {      
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          uid: user.uid,
          providerData: user.providerData,
        };
        firebase.database().ref('movieUser/' + user.uid).set(usuarios);
        // ...
      } else {
        // User is signed out.
      }
    });
  }
  watcher();
  // Funcion para pasar a la siguiente vista una vez confirmado usuario activo
  function appears() {
    var content = $('#sign-out');
    content.text('Sign Out');
    $('#sign-out').on('click', function() {
      firebase.auth().signOut()
        .then(function() {
          $(location).attr('href', 'home.html');
          $('#sign-out').text('Sign-In');
          var email2 = $('#email2').val('');
          var password2 = $('#password2').val('');
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  $('#btnGoogle').on('click', function() {
    firebase.auth().signInWithPopup(provider)
      .then(function(result) {
        $(location).attr('href', 'home.html');
        $('#sign-out').text('Sign-out');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  });
});