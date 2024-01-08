<template>
  <footer>
    <div class="footerContainer">
      <div class="address">
        <div class="row">
          <div class="project">
            <div class="title">
              <span>Jobs</span>
            </div>
            <div class="content">
              <span>We are always looking for talent <br><a href="mailto:hr@poseidon-it.com">hr@poseidon-it.com</a></span>
            </div>
          </div>
          <div class="project">
            <div class="title">
              <span>Contact Us</span>
            </div>
            <div class="content">
              <span>Email: <a href="mailto:hr@poseidon-it.com">hr@poseidon-it.com</a><br>Tel: +60 7-2121318</span>
            </div>
          </div>
          <div class="project">
            <div class="title">
              <span>Our Location<a href="https://www.google.com/maps/place/Poseidon-IT-Solution/@1.5465797,103.7868803,18.5z/data=!4m5!3m4!1s0x31da6d523741e2c3:0xc001523a77af745f!8m2!3d1.5468951!4d103.7873611" target="_blank">
              <img src="../assets/icon/google-maps.png" style="width:1.5vw;margin-left:3%;display:inline-block;" title="Poseidon IT Solution - Google Map"/></a></span>
            </div>
            <div class="content">
              <span>Austin 18, Unit 17-18, Jalan Austin Perdana 3, <br>Taman Austin Perdana, <br>81100 Johor Bahru, Johor.
              </span>
            </div>
          </div>
        </div>
        <div class="copyright">
            Copyright © 2018-2021 Poseidon IT Solution. All Rights Reserved.
        </div>
      </div>
      <div class="logo">
          <img src="/static/assets/image/footer_logo.png" width="30%" title="Poseidon IT Solution">
      </div>
    </div>
    <div class="mobileFooterContainer">
      <span class="contentTitle">Jobs</span>
      <div class="mobileContent">We are always looking for talent <br><a href="mailto:hr@poseidon-it.com">hr@poseidon-it.com</a></div>
      <span class="contentTitle">Contact Us</span>
      <div class="mobileContent">Email: <a href="mailto:hr@poseidon-it.com">hr@poseidon-it.com</a><br>Tel: +60 7-2121318</div>
      <span class="contentTitle">Our Location<a href="https://www.google.com/maps/place/Elex+Wong+Apex+Sport+Marketing/@1.5465797,103.7868803,18.5z/data=!4m5!3m4!1s0x31da6d523741e2c3:0xc001523a77af745f!8m2!3d1.5468951!4d103.7873611" target="_blank">
      <img src="../assets/icon/google-maps.png" style="width:7vw;display:inline-block;margin-left:3%;" title="Poseidon IT Solution - Google Map"/></a></span>
      <div class="mobileContent">Austin 18, Unit 17-18, Jalan Austin Perdana 3, <br>Taman Austin Perdana, 81100 Johor Bahru, Johor.
      </div>
      <!--
      <div class="mobile_logo">
        <img src="/static/assets/image/logo_small-01.png" width="40%" title="Poseidon IT Solution">
      </div>
      -->
      <div class="mobile_copyright">
        Copyright © 2018 Poseidon IT Solution.<br>All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      collapseA : false,
      collapseB : false,
      collapseC : false,
    }
  },
  methods: {
    toggleDiv: function(num) {
      if (num == 'a') {
        this.collapseA = !this.collapseA;
      } else if (num == 'b') {
        this.collapseB = !this.collapseB;
      } else if (num == 'c') {
        this.collapseC = !this.collapseC;
      }
    }
  }
}
</script>
<style lang="scss" type="text/css">
  @import "../style/footer.scss";
</style>