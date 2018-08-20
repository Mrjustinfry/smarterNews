 'use strict';

//API functions
 function gatherTopNews() {
   //top headlines api info
   let newsEP = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=59523a0c775b43abbc7f5f59ae47aba9';
    $.ajax({
      type: 'GET',
      url: newsEP,
      async: false,
      datatype: 'json',
      success: function(topNews) {
        //title = topNews.articles[i].title
          $(".tnBtn").on('click', function(e){
            $('.start').prop('hidden', true);
            $(".foot").prop('hidden', false);
            $(".head").prop('hidden', false);
            $(".news").append(newsTemplate(topNews));
  }) 
      },
      error: function(errorMsg) {
        alert('Oops! Something went wrong (topNews)');
      }
 })};

  function newsTemplate(topNews) {
  let template = "<div class='newsBox'>";
  for (let i =0;i<=9;i++) {
    template += `<h2 class="newsTitle">${topNews.articles[i].title}</h2>
  <h3 class="newsSource">${topNews.articles[i].source.name}</h3><img src="${topNews.articles[i].urlToImage}" class="med" />
  <p class="newsContent">${topNews.articles[i].description}</p><p class="newsURL"><a href="${topNews.articles[i].url}" target="_blank">Click here to read more</a></p>`
  }
  
  template += `</div>`;
    return template;
  }


 function gatherSearchNews() {
   //search news api info
   let today = new Date();
   let month = today.getMonth()+1;
   let day = today.getDate();
   let year = today.getFullYear();
   if(day<10) {
    day = '0'+day
} 

if(month<10) {
    month = '0'+month
} 

today = year + '-' + month + '-' + day;
   
   let newsSearch = $(".searchNewsInput").val();
   let searchNewsEP = 'https://newsapi.org/v2/everything?' +
          `q=${newsSearch}` +
          '&from=' + today +
          '&sortBy=popularity&' +
          'apiKey=59523a0c775b43abbc7f5f59ae47aba9';
        $.ajax({
      type: 'GET',
      url: searchNewsEP,
      async: false,
      datatype: 'json',
      success: function(searchNews) {
        //title = (searchNews.articles[i].title)
        //description = (searchNews.articles[i].description)
            $(".searchNewsInput").val('');
            $('.start').prop('hidden', true);
            $(".foot").prop('hidden', false);
            $(".head").prop('hidden', false);
            $(".news").append(newsTemplate(searchNews));
      },
      error: function(errorMsg) {
        alert('Oops! Something went wrong(searchNews)');
      }
 })};

  function newsTemplate(searchNews) {
  let template = "<div class='newsBox'>";
  for (let i =0;i<=9;i++) {
    template += `<h2 class="newsTitle">${searchNews.articles[i].title}</h2>
  <h3 class="newsSource">${searchNews.articles[i].source.name}</h3><img src="${searchNews.articles[i].urlToImage}" class="med" />
  <p class="newsContent">${searchNews.articles[i].description}</p><p class="newsURL"><a href="${searchNews.articles[i].url}" target="_blank">Click here to read more</a></p>`
  }
  
  template += `</div>`;
    return template;
  }

 function gatherDef() {
   //dictionary api info
    let searchTerm = $('.defineInput').val();
    let dictEP = `https://api.pearson.com/v2/dictionaries/ldoce5/entries?` + `search=${searchTerm}`;
    $.ajax({
      type: 'GET',
      url: dictEP,
      async: false,
      datatype: 'json',
      success: function(word) {
        //word = (word.results[1].headword)
        //part of speech =(word.results[1].part_of_speech)
        //definition = (word.results[1].senses[0].definition);
        //example = word.results[0].senses[0].examples[0].text;
        //pronunciation = word.results[9].pronunciations[0].ipa
          $('.defineInput').val('');
          $(".lbContainer").prop('hidden', false);
          $(".lbContainer").html(defMU(word));
      },
      error: function(errorMsg) {
        alert('Oops! Something went wrong(define)');
      }
 })};


function defMU(word) {
  //html for definition
  return `
  <div class="lightbox defBox">
  <h2 class="headword">${word.results[0].headword} | <i>${word.results[0].part_of_speech}</i></h2>
  <p class="definition">${word.results[0].senses[0].definition}</p><p>"${word.results[0].senses[0].examples[0].text}"</p>
  </div>`
  };


 function gatherWiki() {
   //wikipedia api info
    let searchTerm = $('.wikiInput').val();
    let wikiEP = `https://en.wikipedia.org/w/api.php?action=opensearch&search=` + searchTerm + `&limit=1&format=json&callback=?`;
    $.ajax({
      type: 'GET',
      url: wikiEP,
      async: false,
      dataType: 'json',      
      success: function(wiki) {
        //wiki title(wiki[1][0])
        //wiki info = (wiki[2][0])
          $('.wikiInput').val('');
          $(".lbContainer").prop('hidden', false);
          $(".lbContainer").html(wikiMU(wiki));
      },
      error: function(errorMsg) {  
        alert('Oops! Something went wrong(wiki)');
      }
 })};

function wikiMU(wiki) {
  //html for wikipedia search 
  return `
  <div class="lightbox wikiBox">
  <h2 class="wikiTitle">${wiki[1]}</h2>
  <p class="wikiContent">${wiki[2]}</p>
  <p class="wikiLink"><a href="${wiki[3]}" target="_blank">Click here for more info</a></p>
  </div>`
};

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
 
function smarterNews() {
  $('#define').on('click', function(e) {
    e.preventDefault();
    gatherDef();
  })
  $("#snBtn").on('click', function(e){
    e.preventDefault();
    gatherSearchNews();
  })
  $('#wiki').on('click', function(e) {
    e.preventDefault();
    gatherWiki();
  })
  $('#top').on('click', function(e) {
    e.preventDefault();
    toTop();
  })
   gatherTopNews();
}

$(smarterNews);
