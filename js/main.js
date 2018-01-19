$(document).ready(function() {
 
 // var data = document.getElementById('dato').value(); 
var ref = firebase.database().ref().child("titleslist");
ref.on("child_added", function(snapshot){
 // console.log("El juego actual es ", snapshot.val());
  //console.log("El id actual es ", snapshot.key());
});
ref.on('value',function(snapshot){
    var datos = snapshot.val();
 //   console.log(datos);
 });

ref.on('value',function(snapshot){
    var datos = snapshot.val();
    var keylist =  Object.keys(datos);
  // console.log(datos[keylist[0]]);
 }); 

// var data = $('#dato').val(); 

 $('#searchForm').on('submit', function(e){
  var searchText = $('#searchText').val();
  getMovies(searchText);
  e.preventDefault();

 });

function getMovies(searchText){
axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=731e2f42')
  .then((response) =>{
    var movies = response.data.Search;
    var output = '';
    $.each(movies,(index,movie)=>{
      output +=`
       <div class="col-md-3 ">       
        <div class="well text-center">
          <div class="contenedorImg">
          <img src="${movie.Poster}">
          <button class="contenedorDescripcion btn-primary modal-trigger" data-target="modal-sm" id="add-list">+</button>
          </div>
          <h5>${movie.Title}</h5>
          <a class="detail btn btn-primary">
          Movie Details</a>
        </div>
      </div> `;     

    }); 
    $('#movies').html(output);
   

    console.log(response);
   
  var $ancors = $('a.detail'); 
  var $arrancors = $.makeArray($ancors);  
      $.each($arrancors, function(i, val) {
         $ancors.eq(i).on('click', function() {
           movieSelected(movies[i].imdbID);
           
          });
        });

  var $divadds = $('div.contenedorImg'); 
   var $arrdivsadd = $.makeArray($divadds);  
     $.each($arrdivsadd , function(i, val) {
         $divadds.eq(i).hover(function() {
            $(this).children().eq(1).addClass("visible muestraDescripcion");            
              },
            function(){
            $(this).children().eq(1).removeClass("visible");
               setTimeout(
                 function(){ 
                $(this).children().eq(1).removeClass("visible muestraDescripcion"); 
                $(this).children().eq(1).addClass("hidden");
               }, 300);           
          });
      });
   
  var $inputs = $('button.contenedorDescripcion'); 
  var $arrinputs = $.makeArray($inputs);  
      $.each($arrinputs, function(i, val) {
         $inputs.eq(i).on('click', function() {
           movieSelected(movies[i].imdbID);
           $('#modal-sm').modal();   

          });
      });


        /*inicio crear lista*/
          var db = firebase.database();
            $('#createlist').on('click', function(){
              var titlelist = $('#list-input').val();
               db.ref('titleslist').push({
                  titlelist: titlelist
                });
              $('#list-input').val('');
              
            });
            $('#listmovies').text('');
           /* db.ref('titleslist').on('child_added', function(data){
               // console.log(data.val());            
             $('#listmovies').append('<input type="checkbox"><span class="datalist">'+data.val().titlelist+'</span><br>');
            });*/
       /*inicio de listado con keys*/  
        var reftitles = firebase.database().ref().child("titleslist");
            reftitles.on("value", function(snapshot){
                var datos = snapshot.val();
                var listkeys = Object.keys(snapshot.val());
                var listmovies = $('#listmovies');
                var result="";
                for(var i in listkeys){
                result += '<button class="key-list" '+ 'value='+ listkeys[i] + '>add</button><span class="datalist">'+datos[listkeys[i]].titlelist+'</span><button class="list-moviesved modal-trigger btn btn-success" data-target="modal-save"'+ 'value='+ listkeys[i] + '>ver lista</button><br><br>';        
                          //  console.log(listkeys[i]);
                listmovies.html(result);            
             }  
         });
      /*fin de listado con keys*/  
       /*inicio de radio listas de usuario */
       
          var $radios = $('button.key-list'); 
          var $arradios = $.makeArray($radios);  
           $.each($arradios, function(i, val) {
             $radios.eq(i).on('click', function() {
                var imdb = localStorage.getItem("movieId");
                  console.log(imdb) ;         
                   var keylist = $(this).val();  
                   console.log(keylist) ; 
                   var ref = firebase.database().ref().child("titleslist").child(keylist);
                   var imdb = {imdbID:localStorage.getItem("movieId")             
                  }
                 ref.push(imdb); 
                 
                console.log(typeof keylist);
                   
              });
           });
      /*fin de radio */ 
                
       /*inicio modal para peliculas guardadas 0*/
        var $buttonsaves = $('button.list-moviesved'); 
        var $arrbuttonsaves = $.makeArray($buttonsaves);  
         $.each($arrbuttonsaves, function(i, val) {
            $buttonsaves.eq(i).on('click', function() {
            //movieSelected(movies[i].imdbID);
             $('#modal-save').modal();  
              var keyidlist= $(this).val();
              console.log(keyidlist);
            /*ver listas por id */
            $('#listmoviesaved').text('');
            var refidbms = firebase.database().ref().child("titleslist").child(keyidlist);
            refidbms.on("value", function(snapshot){
                var datos = snapshot.val();              
                console.log(datos); 
                var listkeyidbms = Object.keys(datos); 
                var listmoviesaved = $('#listmoviesaved');
                var result="";              
                for(var j in listkeyidbms){                         
                 //    console.log("keyidbm : " +listkeyidbms.length + ":total"+ listkeyidbms[j]);
                  
                   if(datos[listkeyidbms[j]].imdbID !== undefined)
                     {
                           
                  /* inicio con omdb api traer películas */
                     
                      axios.get('http://www.omdbapi.com?i='+datos[listkeyidbms[j]].imdbID+'&apikey=731e2f42')
                      .then((response) =>{
                        console.log(response); 
                      var movie = response.data;
                        console.log(movie);
                        var output = `
                          <div class="row">
                            <div class="col-md-4">
                             <img src="${movie.Poster}" class="thumbnail">
                            </div>
                            <div class = "col-md-8">
                            </div>   
                          </div>`;
                          var poster = movie.Poster;
                          console.log(typeof poster);
                          var $ancor = $('<a target="_blank"></a>');
                           $ancor.attr('href','http://www.imdb.com/title/'+movie.imdbID);
                          var $imgpost = $('<img class="thumbnail">');
                           listmoviesaved.append($ancor);
                            $ancor.append($imgpost);
                            $imgpost.attr('src',movie.Poster);
                          
                          
                        });                         
                        
                  /*fin con omdb api traer películas*/  

                 // result += '<h3 class="datalist-saved">'+datos[listkeyidbms[listkeyidbms.length-1]]+'</h3>'+'<span>'+datos[listkeyidbms[j]].imdbID+'</span>'+'<br><br>';                   
                 //  listmoviesaved.html(result);  
                      console.log(datos[listkeyidbms[j]].imdbID);  
                                  
                    } 
                }   

               

             });
            /*ver listas por key */


          });
      });
       

   })


  .catch((err) => {
     console.log(err);
      
    });
 }

  function  movieSelected(id){
    sessionStorage.setItem('movieId',id);
    localStorage.setItem('movieId',id);
   }


});
