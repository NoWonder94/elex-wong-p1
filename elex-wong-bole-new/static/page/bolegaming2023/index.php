<?php
?>
<!DOCTYPE html>
<html>

<head>
  <!-- <meta name="base-token" content="'<?php echo $token; ?>'"> -->
  <link id="web_css" rel="stylesheet" href="assets/css/web.css">
  <link id="mobile_css" rel="stylesheet" href="assets/css/mobile.css">
  <script type="text/javascript" src="assets/js/jquery-3.6.0.min.js"></script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>BoleGaming</title>
</head>

<body>
  <div class="mobile_wrap">
    <div class="header">
      <div>
        <img src="assets/img/bolegaming_logo_cn.png" class="cn bole-logo">
        <img src="assets/img/bolegaming_logo_eng.png" class="en bole-logo-en">
      </div>
      <div class="flex">
        <!-- <select name="" id="language" class="select">
                <option class="option" value="chi" selected>中文</option>
                <option class="option" value="en">English</option>
            </select> -->
        <div class="dropdown">
          <div id="dropbtn" class="dropbtn" onclick="toggleDrop()">中文</div>
          <svg width="32" height="32" viewBox="0 0 16 16" class="dropdown-arrow">
            <path fill="currentColor" fill-rule="evenodd" d="m7.976 10.072l4.357-4.357l.62.618L8.284 11h-.618L3 6.333l.619-.618l4.357 4.357z"
              clip-rule="evenodd" />
          </svg>
          <div id="myDropdown" class="dropdown-content">
            <a onclick="changeLang('chi')">中文</a>
            <a href="#" onclick="changeLang('en')">English</a>
          </div>
        </div>
        <div class="flex header-contact">
          <a href="mailto:Info@bolegaming.com" target="_blank" class="header-contact-item web"><img src="assets/img/mail.svg"></a>
          <a href="https://t.me/bolegaming" target="_blank" class="header-contact-item web"><img src="assets/img/telegram.svg"></a>

          <a class="header-contact-item mobile" onclick="openContactPop()"><img src="assets/img/contact.svg"></a>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="item">
        <div class="bolegaming">
          <!-- <img src="assets/img//game_platfrom_cover-01.png" class="bole-background"> -->
          <iframe src="./assets/animation/bolegaming_animation/bolegaming_animation.html" allowtransparency="true" frameborder="0"
            class="bole-background"></iframe>
          <div class="bolegaming-content">
            <img src="assets/img/boleqipai_txt.png" class="cn boleqipai">
            <img src="assets/img/boleqipai_txt_en.png" class="en boleqipai_en">
            <div class="web bole-description" data-translate="bolegaming_desc">
              博乐游戏提供棋牌、麻将、捕鱼、<br> 老虎机等不同类型的优质丰富游戏
            </div>
            <div class="play-button web" onclick="openBoleGamingPop()">
              <span data-translate="try_demo">
                立即试玩
              </span>
            </div>
          </div>
        </div>
        <div class="mobile bole-description">
          <div data-translate="bolegaming_desc_mobile">
            博乐游戏提供棋牌、麻将、捕鱼、<br> 老虎机等不同类型的优质丰富游戏
          </div>
          <div class="play-button" onclick="openBoleGamingPop()">
            <span data-translate="try_demo">
              立即试玩a
            </span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="bolebit">
          <iframe src="./assets/animation/bolebit_animation/data.html" allowtransparency="true" frameborder="0" class="bole-background"></iframe>
          <div class="bolegaming-content">
            <div>
              <!-- <img src="assets/img/boleslot_logo_cn.png" class="cn boleslot-img"> -->
              <img src="assets/img/boleslot_logo_eng.png" class="en boleslot-img_en">
            </div>
            <img src="assets/img/bolebit_txt.png" class="cn bolebit-logo">
            <img src="assets/img/bolebit_txt_eng.png" class="en bolebit-logo_en">
            <div class="web bole-description" data-translate="bolebit_desc">
              多语言老虎机&捕鱼游戏<br>同时支持所有货币和加密货币
            </div>
            <div class="play-button web" onclick="openLink('https://www.bolegaming.com/boleBitNew/')">
              <span data-translate="try_demo">
                立即试玩
              </span>
            </div>
          </div>
        </div>
        <div class="mobile bole-description">
          <div data-translate="bolebit_desc_mobile">
            多语言老虎机&捕鱼游戏<br>同时支持所有货币和加密货币
          </div>
          <div class="play-button" onclick="openLink('https://www.bolegaming.com/boleBitNew/')">
            <span data-translate="try_demo">
              立即试玩
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-item">
        <div class="flex footer-header">
          <img src="assets/img/18+.png" class="footer-header-icon">
          <span data-translate="responsible">责任</span>
        </div>
        <div data-translate="responsible_desc">
          博乐游戏将会严格履行社会责任。如要游览本站，您必须达到所在国家规定的法定成年年龄。
        </div>
        <div class="web footer-divider"></div>
      </div>
      <hr class="mobile footer-divider">
      <div class="footer-item2">
        <div class="flex footer-header">
          <img src="assets/img/itechlab.png" class="footer-header-icon">
          <span data-translate="cert">认证</span>
        </div>
        <div data-translate="cert_desc">
          博乐游戏随机数生成(RNG)经过国际权威机构iTech Labs认证，保证游戏内发牌的随机性。 认证编号: ITL1802045
        </div>
        <div class="web footer-divider"></div>
      </div>
      <hr class="mobile footer-divider">
      <div class="footer-item2">
        <div class="flex footer-header">
          <!-- <img src="assets/img/ice.png" class="ice"> -->
          <span data-translate="exhibit">展会</span>
        </div>
        <div data-translate="exhibit_desc">
          博乐游戏受邀参与ICE，G2E Asia，亚博会等全球范围内的标志性游戏展会，参展的产品广受业界好评。
        </div>
        <div class="web footer-divider"></div>
      </div>
      <hr class="mobile footer-divider">
      <div class="footer-item3">
        <div class="footer-header" data-translate="follow_us">
          关注博乐
        </div>
        <div class="footer-follow-us">
          <div class="flex" onclick="openLink('https://www.youtube.com/@bolegaming45')">
            <img src="assets/img/Youtube.svg" alt="">
            <span>Youtube</span>
          </div>
          <div class="flex" onclick="openLink('https://t.me/Bole_channel')">
            <img src="assets/img/telegram.svg" alt="">
            <span>Telegram</span>
          </div>
        </div>
      </div>

    </div>
    <div class="bolegaming-popup">
      <div class="bolegaming-pop-container">
        <div class="bolegaming-pop-wrap">
          <img src="assets/img/web_popout_bg.png" class="web bolegaming-pop-background">
          <img src="assets/img/mobile_popout_bg1.png" class="mobile bolegaming-pop-background">
          <img src="assets/img/close.svg" class="close" onclick="closeBoleGamingPop()">
          <div class="bolegaming-pop-content">
            <img src="assets/img/bolegaming_logo_cn.png" class="cn bole-logo">
            <img src="assets/img/bolegaming_logo_eng.png" class="en bole-logo">
            <div class="button-group">
              <div class="classic_button flex" onclick="openLink('https://demo.v5sm.com/main/game.html')">
                <img src="assets/img//like.svg" class="like-icon" />
                <span data-translate="simplified_cn">经典棋牌</span>
              </div>
              <div class="other_button" data-translate="traditional_cn" onclick="openLink('https://demo.v5sm.com/main/game.html?lan=zh_TW')">繁体棋牌</div>
              <div class="other_button" data-translate="vietnamese" onclick="openLink('https://demo.v5sm.com/main/game.html?lan=vi_VN')">越南棋牌游戏</div>
              <div class="other_button" data-translate="badugi" onclick="openLink('https://demo.v5sm.com/main/game.html?lan=ko_KR&gid=bdz')">韩国百得之</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="contact-popup mobile">
      <div class="contact-container">
        <div class="contact-pop-wrap">
          <img src="assets/img/mobile_popout_bg2.png" class="contact-pop-background" />
          <img src="assets/img/close.svg" class="close" onclick="closeContactPop()">
          <div class="contact-pop-content">
            <div class="contact-header">联系我们</div>
            <a href="mailto:Info@bolegaming.com" target="_blank">
              <div class="flex contact-item">
                <img src="assets/img/mail.svg" class="contact-icon">
                <span>电子邮件</span>
              </div>
            </a>
            <hr class="contact-divider">
            <a href="https://t.me/bolegaming" target="_blank">
              <div class="flex contact-item">
                <img src="assets/img/telegram.svg" class="contact-icon">
                <span>Telegram</span>
              </div>
            </a>
            <hr class="contact-divider">
            <a href="skype:live:bolegaming?chat" target="_blank">
              <div class="flex contact-item">
                <img src="assets/img/skype.svg" class="contact-icon">
                <span>Skype</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script>

  var curlang = 'chi';
  var dictionary = {
    "chi": {
      "bolegaming_desc": "博乐游戏提供棋牌、麻将、捕鱼、<br>老虎机等不同类型的优质丰富游戏",
      "bolegaming_desc_mobile": "博乐游戏提供棋牌、麻将、捕鱼、老虎机等不同类型的优质丰富游戏",
      "bolebit_desc": `多语言老虎机&捕鱼游戏<br>同时支持所有货币和加密货币`,
      "bolebit_desc_mobile": `多语言老虎机&捕鱼游戏同时支持所有货币和加密货币`,
      "try_demo": "立即试玩",
      "responsible": "责任",
      "responsible_desc": "博乐游戏将会严格履行社会责任。如要游览本站，您必须达到所在国家规定的法定成年年龄",
      "cert": "认证",
      "cert_desc": "博乐游戏随机数生成(RNG)经过国际权威机构iTech Labs认证，保证游戏内发牌的随机性。 认证编号: ITL1802045",
      "exhibit": "展会",
      "exhibit_desc": "博乐游戏受邀参与ICE，G2E Asia，亚博会等全球范围内的标志性游戏展会，参展的产品广受业界好评。",
      "follow_us": "关注博乐",
      "simplified_cn": "经典棋牌",
      "traditional_cn": "繁体棋牌",
      "vietnamese": "越南棋牌游戏",
      "badugi": "韩国百得之",
    },
    "en": {
      "bolegaming_desc": "BoleGaming provides different types of high-quality <br> and rich games such as Poker, mahjong, fishing, and slot machines.",
      "bolegaming_desc_mobile": "BoleGaming provides different types of high-quality and rich games such as Poker, mahjong, fishing, and slot machines.",
      "bolebit_desc": "Multi-language Slot Games, Fishing <br> Supporting All Currencies and Cryptocurrencies",
      "bolebit_desc_mobile": "Multi-language Slot Games, Fishing Supporting All Currencies and Cryptocurrencies",
      "try_demo": "Try Demo Now",
      "responsible": "Responsibility",
      "responsible_desc": "BoleGaming will strictly fulfill social responsibilities. To visit this site, you must reach the age of majority legal age in your country。",
      "cert": "Certification",
      "cert_desc": "BoleGaming Random Number Generation (RNG) has been certified by iTech Labs an international authoritative organization, to ensure the randomness of in-game licensing. Certification number: ITL1802045",
      "exhibit": "Exhibition",
      "exhibit_desc": "BoleGaming was invited to participate in iconic game exhibitions such as ICE, G2E Asia, China World Expo, etc. The products exhibited were widely praised by the industry。",
      "follow_us": "Follow Us",
      "simplified_cn": "Simplified CN",
      "traditional_cn": "Traditional CN",
      "vietnamese": "Vietnamese",
      "badugi": "Badugi",
    },
  };

  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function toggleDrop() {
    document.getElementById("myDropdown").classList.toggle("show");
    $('.dropdown-arrow').addClass('rotate');
  }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
      $('.dropdown-arrow').removeClass('rotate');
    }
  }

  function changeLang(lang) {
    switch (lang) {
      case 'chi':
        $('#dropbtn').html('中文');
        $('.cn').show();
        $('.en').hide();
        break;
      case 'en':
        $('#dropbtn').html('English');
        $('.cn').hide();
        $('.en').show();
        break;
      default:
        $('#dropbtn').html('中文');
        $('.cn').show();
        $('.en').hide();
        break;
    }

    localStorage.setItem('bole-lang2', lang);
    curlang = lang;
    console.log(lang)
    setLanguage();
  }

  // 切换语言功能
  var setLang = function (dictionary) {
    $("[data-translate]").html(function () {
      var key = $(this).data("translate");
      $(this).html(dictionary[$(this).data("translate")]);
      if (dictionary.hasOwnProperty(key)) {
        return dictionary[key];
      }
    });
  };

  function setLanguage() {

    switch (curlang) {
      case 'chi':
        setLang(dictionary.chi);
        break;
      case 'en':
        setLang(dictionary.en);
        break;
      default:
        setLang(dictionary.chi);
        break;
    }
  }

  var web = true;
  function changeLayout() {
    web = !web;
    localStorage.setItem('web_layout', web ? 'web' : 'mobile');
    showLayout(web);
  }

  function showLayout(web_type) {
    if (web_type) {
      $('#web_css').attr('disabled', false);
      $('#mobile_css').attr('disabled', true);
    } else {
      $('#web_css').attr('disabled', true);
      $('#mobile_css').attr('disabled', false);
    }
  }

  function openBoleGamingPop() {
    $('body').css('overflow', 'hidden');
    $('.bolegaming-popup').show();
  }

  function closeBoleGamingPop() {
    $('body').css('overflow', '');
    $('.bolegaming-popup').hide();
  }

  function openContactPop() {
    $('body').css('overflow', 'hidden');
    $('.contact-popup').show();
  }

  function closeContactPop() {
    $('body').css('overflow', '');
    $('.contact-popup').hide();
  }

  function openLink(link) {
    if (link && link != '') {
      window.open(link);
    }
  }
  $(document).ready(function () {

    //登入表单提交
    var tempLang = localStorage.getItem('bole-lang2');
    changeLang(tempLang);
    // web = localStorage.getItem('web_layout') == 'web' || localStorage.getItem('web_layout') == '' || localStorage.getItem('web_layout') == null;
    // setTimeout(() => {
    //   showLayout(web);
    // }, 100);
  });


</script>

</html>
