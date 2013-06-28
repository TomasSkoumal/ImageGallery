var currentImage;
var currentIndex = -1;
var interval = 3000;

function showImage(index) {
    if (index < $('#ig-images div.ig-image').length) {
        var indexImage = $('#ig-images div.ig-image')[index]
        if (currentImage) {
            if (currentImage != indexImage) {
                $(currentImage).css('z-index', 2);
                clearTimeout(myTimer);
                $(currentImage).fadeOut(250, function () {
                    myTimer = setTimeout('showNext()', 3000);
                    $(this).css({ 'display':'none','z-index':1 })
                });
            }
        }
        $(indexImage).css({ 'display':'block', 'opacity':1 });
        currentImage = indexImage;
        currentIndex = index;
        $('#thumbs li').removeClass('active');
        $($('#thumbs li')[index]).addClass('active');

    }
}

function showNext() {
    var len = $('#ig-images div.ig-image').length;
    var next = currentIndex < (len - 1) ? currentIndex + 1 : 0;
    showImage(next);
}

var myTimer;

$(document).ready(function () {
    var thumbnailsWidth = $('#thumbs li').length * 12;

    $('#thumbs li').each(function (index) {
        thumbnailsWidth += $(this).width(); // In some browsers, it wont work. Value 100 will work.
    });

    $('#ig-thumbs').width(thumbnailsWidth);

    myTimer = setTimeout('showNext()', interval); // Enable auto swap.

    showNext(); // Loads first image
    $('#ig-thumbs li').bind('click', function (e) {
        var count = $(this).attr('rel');
        showImage(parseInt(count) - 1);
    });
});