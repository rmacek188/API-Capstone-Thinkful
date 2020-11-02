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
        .then(responseJson => displaySearchData(responseJson))

    
    .catch(err => {
        console.log(err);
    });

    return fetch(`https://lyricfind.com/index.php`)

    .then(response => {
        if (response.ok) {
            return response.json();
        } 
        throw new Error (response.statusText);
        
        })
        .then(responseJson => displaySearchData(responseJson))

        .catch(err => {
            console.log(err);
     });
};


function displaySearchData(responseJson) {
  console.log(responseJson);

  
    if (responseJson.lyrics == "") {
      alert("No results");
    } else {
      let htmlOutput = "<pre><code>" + responseJson.lyrics + "</code></pre>";$('.js-search-results').html(htmlOutput);
    }
}





$(watchSubmit);
