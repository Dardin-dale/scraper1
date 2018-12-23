$(document).on('ready', function () {

    //Scrapes NPR Science page and populates the database.
    $('#scrape').on('click', function() {
        $.ajax({
            type: 'GET',
            url: "/scrape"
        }).then(function(data){
            alert("Entries Added");
            location.reload();
        });
    });

    //removes entry from database
    $('.delete').on('click', function() {
        $.ajax({
            type: 'DELETE',
            url: "/articles/"+ $(this).attr('data-id')
        }).then(function(data){
            alert("Entry Deleted");
            location.reload();
        });
    })

    //opens Note modal
    $('.note').on('click', function() {
        
    })


})