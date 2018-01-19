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
      };
      $('#searchForm').on('submit', (e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
      });
      function getMovies(searchText) {
        axios.get('https://www.omdbapi.com/?s=' + searchText + '&apikey=69504f73')
          .then((response) => {
            console.log(response);
            var movies = response.data.Search;
            var output = '';
            $.each(movies, (index, movie) => {
              var pelis = ('<div class="col-md-3"><div class="well text-center"><img src=\'' + movies[index].Poster + '\' class="img-responsive"><h5>' + movies[index].Title + '</h5><a id=' + movies[index].imdbID + ' class="btn btn-primary" href="#">Movie Details</a></div></div>');
              $('#movies').prepend(pelis); 
             
              $('#' + movies[index].imdbID + '').on('click', function() {
                localStorage.codeNum = movies[index].imdbID;
                $(location).attr('href', 'movie.html');
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      // sign out
    }
  });
});