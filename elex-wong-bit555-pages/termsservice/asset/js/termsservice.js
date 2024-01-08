const mediaList = [
    { "name": 'Medium', "link": '', "show": true },
    { "name": 'Bitcoin', "link": 'bitcointalk.org/index.php?topic=5391939.0', "show": true },
    { "name": 'Instagram', "link": 'www.instagram.com/bit555.io/', "show": true },
    { "name": 'Discord', "link": 'discord.gg/VbkqV3M7zN', "show": true },
    { "name": 'Facebook', "link": 'www.facebook.com/Bit555-106614435328018', "show": true },
    { "name": 'Twitter', "link": 'twitter.com/Bit555_Official', "show": true },
    { "name": 'Telegram', "link": 't.me/Bit555_English', "show": true },
    { "name": 'Github', "link": 'github.com/Bit555game', "show": true },
];

function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 100) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);


$(document).ready(function () {
    
    //list all icon
    var media_list = '';
    for (var i = 0; i < mediaList.length; i++) {

        if (mediaList[i].show) {
            var temp = '<a class="mediacon"';
            if (mediaList[i].link != '')
                temp += 'href="https://' + mediaList[i].link + '" ';
            temp += 'target="_blank">' +
                '<div class="' + mediaList[i].name.toLowerCase() + '"></div></a>';
            media_list += temp;
        }
    }
    $('#media-list').html(media_list);
});

