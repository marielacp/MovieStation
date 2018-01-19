$(document).ready(function() {
  var database = firebase.database();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('existe usuario activo');
      var displayName = user.displayName;
      var photoURL = user.photoURL;
      var uid = user.uid;
      function getMovie() {
        var movieId = localStorage.getItem('codeNum');
        console.log(movieId);
      
        axios.get('http://www.omdbapi.com?i=' + movieId + '&apikey=69504f73')
          .then((response) => {
            console.log(response);
            let movie = response.data;
      
            let output = `
              <div class="row">
                <div class="col-md-4">
                  <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                  <h2>${movie.Title}</h2>
                  <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="well">
                  <h3>Plot</h3>
                  ${movie.Plot}
                  <hr>
                  <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                  <a href="home.html" class="btn btn-default">Go Back To Search</a>
                </div>
              </div>
            `;
      
            $('#movie').html(output);
            $('#save-movie').on('click', function() {
              var poster = movie.Poster;
              var title = movie.Title;
              var genre = movie.Genre;
              var year = movie.Year;
              var personalMovie =  
                {
                  user: uid,
                  poster: poster,
                  title: title,
                  genre: genre,
                  year: year,
                }
              ;
              database.ref('personalMovie/' + user.uid).push(personalMovie);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      getMovie();
    } else {

    }
  });
});