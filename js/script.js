function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $("#street");
    var $city = $("#city");
    var $bgimg = $(".bgimg");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = ($street.val() !== "") ? $street.val().replace(/\s/g, "-") + ',' : "";
    var cityStr = ($city.val() !== "") ? $city.val().replace(/\s/g, "-") : "";
    var apiKey = "&key=AIzaSyD9meXfYM0jaOy28AC87HT0p8SR5f8RTjg";
    var srcStr = (streetStr + cityStr) ? "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetStr + cityStr + apiKey : $bgimg.attr("src");
    console.log(srcStr);
    $bgimg.attr("src", srcStr);
    // Load NYT articles
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': "587c93bf09b14a70b069b5352a646e29",
        'q': cityStr,
        'sort': "newest",
        'page': 0
    });
    console.log(url);
    $.getJSON(url, function(data) {
        var articles = data.response.docs,
            articlesHTML = "",
            count = 1;
        if (articles.length === 0) articlesHTML += "<h3 id='nyt-none'>Oh no! There was no article related to your query.</h3>";
        else {
        $.each(articles, function(key, article) {
            if (article.lead_paragraph === null) article.lead_paragraph = "Click here to read the article";
            if (article.lead_paragraph.length > 500) article.lead_paragraph = article.lead_paragraph.substr(0, 500);
            articlesHTML += "<a href='" + article.web_url + "' target='_blank'><li class='nyt-article' id='article'" + count + ">" +
                "<h3 class='nyt-title'>" + article.headline.main + "<small> - " + article.pub_date.substr(0, 10) + "</small></h3>" +
                "<p class='nyt-lead-paragraph'>" + article.lead_paragraph + " [...]</p></li></a>";
            count++;
        });
        }
        $nytElem.html(articlesHTML);
        
    })
    .error(function () {
        var defaultAnswer = "<h3 id='nyt-error'>New York Times Articles Could Not Be Loaded.</h3>";
        $nytElem.html(defaultAnswer);
    });
    
    //Getting Articles from wikipedia
    function logResults(data) {
        console.log(json);
    }

    $.ajax( {
        url: "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&titles="+cityStr.replace(/-/g,"%20"),
        dataType: 'jsonp',
        headers: { 'Api-User-Agent': 'Example/1.0' },
        success:"logResults" 
    } );


    return false;
}

$('#form-container').submit(loadData);
