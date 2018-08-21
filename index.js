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
    //title= topNews.articles[i].title,
    //source= topNews.articles[i].source.name,
    //image= topNews.articles[i].urlToImage,
    //snippet= topNews.articles[i].description,
    //link= topNews.articles[i].url,
  let template = "<div class='newsBox'>";
  for (let i =0;i<=9;i++) {    
    template += `<h2 class="newsTitle">${topNews.articles[i].title}</h2>
  <h3 class="newsSource">${topNews.articles[i].source.name}</h3><img src="${topNews.articles[i].urlToImage}" alt="Article image" class="med" />
  <p class="newsContent">${topNews.articles[i].description}</p></br><a class="newsURL col-12" href="${topNews.articles[i].url}" target="_blank">Click here to read more</a></br><p class="breaker"></p>`
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
  } if(month<10) {
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
            $(".searchNewsInput").val('');
            $('.start').prop('hidden', true);
            $(".foot").prop('hidden', false);
            $(".head").prop('hidden', false);
            $(".news").append(SnewsTemplate(searchNews));
      },
      error: function(errorMsg) {
        alert('Oops! Something went wrong(searchNews)');
      }
 })};

    $('.searchNewsInput').keypress(function(e){
      if(e.which==13){
        e.preventDefault();
        $('#snBtn').click();
      }
    })

  function SnewsTemplate(searchNews) {
    //title = searchNews.articles[i].title
    //source = searchNews.articles[i].source.name
    //image = searchNews.articles[i].urlToImage
    //snippet = searchNews.articles[i].description
    //link = searchNews.articles[i].url
    if(searchNews.totalResults == 0) {
      $('.start').prop('hidden', false);
            $(".foot").prop('hidden', true);
            $(".head").prop('hidden', true);
     $('.eBox').html('<p>I guess no news is good news. Try another topic.</p>');
    }else{
  let template = "<div class='newsBox'>";
  for (let i =0;i<=9;i++) {
    template += `<h2 class="newsTitle">${searchNews.articles[i].title}</h2>
  <h3 class="newsSource">${searchNews.articles[i].source.name}</h3><img src="${searchNews.articles[i].urlToImage}" alt="Article Image" class="med" />
  <p class="newsContent">${searchNews.articles[i].description}</p></br><a class="newsURL col-6" href="${searchNews.articles[i].url}" target="_blank">Click here to read more</a></br><p class="breaker"></p>`
  }
  
  template += `</div>`;
    return template;
  }};

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
          $('.defineInput').val('');
          $(".lbContainer").prop('hidden', false);
          $(".lbContainer").html(defMU(word));
      },
      error: function(errorMsg) {
        alert('Oops! Something went wrong(define)');
      }
 })};

    $('.defineInput').keypress(function(e){
      if(e.which==13){
        e.preventDefault();
        $('#define').click();
      }
    })

function defMU(word) {
  //markup for definition 
    //headword = word.results[1].headword;
    //partofspeech = word.results[1].part_of_speech;
    //definition = word.results[1].senses[0].definition;
    //example = word.results[0].senses[0].examples[0].text;
    //pronunciation = word.results[9].pronunciations[0].ipa;
    if(word.count == 0){
        return `
  <div class="lightbox defBox"><p>Uh oh! Looks like something went wrong. Try another word.</p></div>`
    }else{
      return `
  <div class="lightbox defBox">
  <button type="button" id="close"> x </button>
  <h2 class="headword">${word.results[0].headword} | <i>${word.results[0].part_of_speech}</i></h2>
  <p class="definition">${word.results[0].senses[0].definition}</p><p>"${word.results[0].senses[0].examples[0].text}"</p>
  </div>`
    }
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
          $('.wikiInput').val('');
          $(".lbContainer").prop('hidden', false);
          $(".lbContainer").html(wikiMU(wiki));
      },
      error: function(errorMsg) {  
        alert('Oops! Something went wrong(wiki)');
      }
 })};

 $('.wikiInput').keypress(function(e){
      if(e.which==13){
        e.preventDefault();
        $('#wiki').click();
      }
    })

function wikiMU(wiki) {
  //html for wikipedia search
  //title = wiki[1]
  //snippet = wiki[2]
  //link = wiki[3] 
  if(wiki[1].length == 0) {
    return `
  <div class="lightbox wikiBox"><p>Uh oh! Looks like something went wrong. Try another topic.</p></div>`
  }else{
  return `
  <div class="lightbox wikiBox">
  <h2 class="wikiTitle">${wiki[1][0]}</h2>
  <p class="wikiContent">${wiki[2][0]}</p>
  <p class="wikiLink"><a href="${wiki[3][0]}" target="_blank">Click here for more info</a></p>
  </div>`
  }
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
