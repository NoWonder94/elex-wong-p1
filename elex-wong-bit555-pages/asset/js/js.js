var chineseChars = /((?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0\u2FFB\u3000-\u303F\u3105-\u312D\u3190-\u31B7\u31C0-\u31E3\u3220-\u3243\u3280-\u32B0\u32C0-\u32CB\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d])+\s?)+/g;

const redirectSide = 'http://bit555.io';

const domainName = ["bit555.info", 'bit555.cn', 'bit555.me'];

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

var dictionary = {
    "en": {
        "title": 'bit555.io - Provably Fair Crypto Game',
        "description": 'BIT555.IO is built by gamblers for gamblers. With our unique community and a huge selection of games like Crash, HashDice, Plinko, Slots, and many more.',
        "home": "Home",
        "contact": "Contact",
        "welcome": "Welcome to Bit555.com",
        "paragraph1": "Here you can always find safe domain available in your area.",
        "paragraph2": "Please visit one of these domains so that you can browse the site with a better experience.",
        'date': 'Bit555 since 2022',
        'terms': 'Terms of Service',
        'faq': 'FAQ',
        'privacy': 'Privacy Policy',
        'count': 'After',
        'seconds': 'seconds',
        'autotransfer': 'You will be automatically redirected to the most suitable domain',
        'comingsoon': 'Bit555 Crypto Casino Coming Soon',
        'staytuned': 'Stay Tuned',
    },
    "chi": {
        "title": 'bit555.io - 公正且公平的加密游戏',
        "description": 'BIT555.IO是支持加密货币的线上娱乐网站。 拥有独特的玩家社区并提供大量的游戏选择，例如 Crash、HashDice、Plinko、Slots 等等。',
        "home": "主页",
        "contact": "联系",
        "welcome": "欢迎来到 Bit555.com",
        "paragraph1": "在这里，您始终可以找到您所在地区可用的安全域。",
        "paragraph2": "请访问这些域之一，以便您能够以更好的体验浏览该站点。",
        'date': 'Bit555 始于 2022',
        'terms': '服务条款',
        'faq': 'FAQ',
        'privacy': '隐私',
        'count': '倒数',
        'seconds': '秒',
        'autotransfer': '您将被自动重定向到最合适的域名',
        'comingsoon': 'Bit555 加密赌场即将推出',
        'staytuned': '敬请期待',
    }
};

$(window).resize(
    function () {
        var Winwidth = $(window).width();
        var Winheight = $(window).height();

        if (Winwidth < 1284) {
            $("body").removeClass("hide_scrollbar");
        }
        else {
            $("body").addClass("hide_scrollbar");

        }
        if (Winheight > 975) {
            $(".background").addClass("absolutePost");
        }
        else {
            $(".background").removeClass("absolutePost");
        }

        if (Winwidth < 1450 && Winheight > 750) {
            $(".background").addClass("absolutePost");
        }

    }
);

$(function () {


    // var content3='';
    // for(var i=0;i<domainName.length;i++){
    //     var temp='<div class="box">'+
    //     '<img src="asset/img/bit555-webdesign-tick.png" alt="" class="tick"><a target="_blank" href="http://'+
    //     domainName[i].toString()+'">'+
    //     domainName[i].toString()+'</a></div>';
    //     content3+=temp;
    // }
    // $('#content3').html(content3);

    //list all icon
    var media_list = '';
    for (var i = 0; i < mediaList.length; i++) {

        if (mediaList[i].show) {
            var temp = '<a class="mediacon"';
            if (mediaList[i].link != '')
                temp += 'href="https://' + mediaList[i].link + '" ';
            temp += 'target="_blank">' +
                '<div class="' + mediaList[i].name.toLowerCase() + ' logo"></div></a>';
            media_list += temp;
        }
    }
    $('#media-list').html(media_list);

    if ($(window).width() > 1284) {
        $("body").addClass("hide_scrollbar");
        $("#popup").addClass("hide_scrollbar");
    }
    if ($(window).height() > 975) {
        $(".background").addClass("absolutePost");
    }

    if ($(window).width() < 1450 && $(window).height() > 750) {
        $(".background").addClass("absolutePost");
    }
    var set_lang = function (dictionary) {
        $("[data-translate]").each(function () {
            if ($(this).is("input")) {
                $(this).attr('placeholder', dictionary[$(this).data("translate")])
            } else {
                $(this).text(dictionary[$(this).data("translate")])
            }
        })
    };

    // Swap languages when menu changes
    $("#language").on("change", function () {
        var language = $(this).val().toLowerCase();

        if (dictionary.hasOwnProperty(language)) {
            localStorage.setItem('language', language);
            set_lang(dictionary[language]);
        }
    });

    // Set initial language to English
    if (localStorage.getItem("language") != "" && localStorage.getItem("language") != null) {
        console.log(localStorage.getItem("language"));

        $('#language').val(localStorage.getItem("language"));
        set_lang(dictionary[localStorage.getItem("language")]);
    } else {
        set_lang(dictionary.en);
    }


    animated();

});

function fadein(part, type) {
    part.addClass("fade-in" + type);
    var listener1 = part.one('animationend', function () {
        part.removeClass("fade-in" + type);
    })
}

function animated() {

    fadein($(".content1"), "1");
    fadein($(".paragraph1"), "2");
    fadein($(".para2"), "3");
    fadein($(".content3"), "4");
    countDown();
}

var iscountdown = false;
function countDown() {
    var num = 5;
    iscountdown = true;
    var x = setInterval(function () {

        if (num < 1) {
            clearInterval(x);
            $('#count-num').html(0);
            window.location.href = redirectSide;
        }
        else {
            $('#count-num').html(num);
            num--;
        }

    }, 1000);
}