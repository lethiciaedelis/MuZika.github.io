$(document).ready(function() {

  var key ='AIzaSyBjgItHdvN2VHUwfV74ehWLJ8NhkJL2lp4';
  var playlistId = 'PLnMylxVa1w7M7wPFfAz5XElhJDNNuKGAm';
  var URL = 'https://www.googleapis.com/youtube/v3/playlistItems'; 


  var options = {
    part: 'snippet',
    key: key, 
    maxResults: 20,
    playlistId: playlistId
  }
  loadVids();
  
  function loadVids() {
    $.getJSON(URL, options, function(data){;
      var id = data.items[0].snippet.resourceId.videoId;
      mainVid(id);
      resultsloop(data);
    })
  }


  function mainVid(id) {
    $('#video').html(`
     <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `);
  }

  function resultsloop(data){

    $.each(data.items, function(i, item){

      var thumb = item.snippet.thumbnails.medium.url;
      var title = item.snippet.title;
      var desc= item.snippet.description.substring(0,50);
      var vid = item.snippet.resourceId.videoId;


      $('main').append(`
   
        <article class="item" data-key="${vid}">
          <img src="${thumb}" alt="thumbnail" class="thumb">
          <div class="details">
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
        </article>   
   
   `) ;
    });
  }

  $('main').on('click', 'article', function(){
        
        var id = $(this).attr('data-key');
        mainVid(id);

      });


});