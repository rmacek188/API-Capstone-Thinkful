function watchSubmit() {
  $(".js-search-form").submit(function(event) {
        event.preventDefault();
        let artist = $(".js-query-artist").val();
        let title = $(".js-query-title").val();
        
        console.log(artist, title);

        if (artist == '') {
            alert("Please select an artist");
        }
        
        else if (title == '') {
            alert("Please select a title");
        }
        
        else {
            getDataFromApi(artist, title);
        }
    });
}



function getDataFromApi(artist, title) {
    console.log(artist, title);

    
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
  
   .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
          displaySearchData(responseJson)
          displayFromSecondApi(artist, title)
        })

    
    .catch(err => {
        console.log(err);
    });

    
    
     
};

function displayFromSecondApi(artist, title) {
  fetch(`https://api.happi.dev/v1/music?q=${title}%20${artist}&limit=&apikey=a79e9aFs21t8SzH6f0NoB5ptt6skNIYeKDArMqb3t4ysqxQ4ErfCGxGz&type=`)

    .then(response => {
        if (response.ok) {
            return response.json();
        } 
        throw new Error (response.statusText);
        
        })
        .then(responseJson => displayMore(responseJson.result[0]))

        .catch(err => {
            console.log(err);
     });

}

function displayMore(responseJson) {
  console.log(responseJson);

  
    if (responseJson.artist == "") {
      alert("No results");
    } else {
      let htmlOutput = "<pre><code>" + responseJson.artist + "</code></pre>";$('#more').html(htmlOutput);
    }
}

function displaySearchData(responseJson) {
  console.log(responseJson);

  
    if (responseJson.lyrics == "") {
      alert("No results");
    } else {
      let htmlOutput = "<pre><code>" + responseJson.lyrics + "</code></pre>";$('.js-search-results').html(htmlOutput);
    }
}





$(watchSubmit);

