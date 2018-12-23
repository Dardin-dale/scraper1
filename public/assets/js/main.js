$(document).on('ready', function () {

    //Scrapes NPR Science page and populates the database.
    $('#scrape').on('click', function() {
        $.ajax({
            type: 'GET',
            url: "/scrape"
        }).then(function(data){
            alert("Entries Added: "+ data.length);
        });
    })


})