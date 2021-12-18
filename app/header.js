


// ---------------hamburger-------------//

$(function() {
    $('.hamburger').click(function() {
        $(this).toggleClass('active'); //.hamburgerにactivクラスがなければつける

        //.hamburgerにactiveがついてたら、.globalMenuSpにもactiveをつける。ついていなかったらactiveを削除する
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
        } else {
            $('.globalMenuSp').removeClass('active');
        }
    });

    //.globalMenuSpがクリックされたら削除する
    $('.globalMenuSp') .click(function() {
        $(this).toggleClass('active');
        $('.hamburger').toggleClass('active');
    });
}); 


