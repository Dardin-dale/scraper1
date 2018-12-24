$(function() {

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
        console.log('sane');
        $.ajax({
            type: 'DELETE',
            url: "/articles/"+ $(this).attr('data-id')
        }).then(function(data){
            alert("Entry Deleted");
            location.reload();
        });
    })

    //opens Note modal
    $('.note').on('click',  function() {
        $("#modal"+$(this).attr('data-id')).modal('toggle');
    });

    //adds comment to article
    $('form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: "/comment/" + $(this).attr('data-id'),
            data: {
                   user:$('input').val(),
                   body:$('textarea').val()
                  }
        }).then(function(data) {
            location.reload();
        });
    });

    //deletes comment from article
    $(".delcomment").on('click', function() {
        var id = $(this).attr('data-id');
        var index = $(this).attr('data-index');
        console.log('Delete', id, index);
        $.ajax({
            type: 'DELETE',
            url:'/comments/'+ id +'/'+ index
        }).then(function(data){
            location.reload();
        })
    })

})