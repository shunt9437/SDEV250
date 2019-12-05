
$(document).ready(function(){
    $('#gallery a').click(function(){
        var galleryHref = $(this).attr('href');
        var gallerAlt = $(this).attr('title');
        $('figure img').attr({ src: galleryHref, alt: gallerAlt});
        $('figcaption').html(gallerAlt);
        return false;
    });
});


