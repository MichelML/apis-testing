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
    var streetStr = ($street.val() !== "") ? $street.val().replace(/\s/g,"-") + ',' : "";
    var cityStr = ($city.val() !== "") ? $city.val().replace(/\s/g, "-") : "";
    var srcStr = (streetStr+cityStr) ? "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+streetStr+cityStr 
                                        : $bgimg.attr("src");
    console.log(srcStr);
    $bgimg.attr("src", srcStr);
    // Load NYT articles
    // 
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
