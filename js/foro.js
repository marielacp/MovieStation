$(document).ready(function() {
  $('#send').on('click', function() {
    var time = moment().format('LT');
    if ($('#coments').val().length > 0) {
      var comments = $('#coments').val();
      $('.container-coments').append('<div class="row message"><div class="col-xs-2 col-md-1 col-lg-1"><img class="img-responsive img-circle" src="http://lorempixel.com/50/50"></div><div class="col-xs-7 col-md-9 col-lg-9"><p><strong>Claudia dice:</strong><br>'+comments+'</p></div><div class="col-xs-3 col-md-2 col-lg-2"><span>'+time+'</span></div></div>');
    }
  });
});