<template>
  <footer>
    <div class="footerContainer web">
      <div class="footer-content">
        <div class="footer-content-contact">
          <div class="contact-block">
            <div class="contact-block-label">Address</div>
            <div class="contact-block-content block-address">
              RM06, 13A/F SOUTH TOWER WORLD,<br />
              FINANCE CTR HARBOUR CITY 17,<br />
              CANTON RD TST KLN,<br />
              HONG KONG
            </div>
          </div>
          <div class="contact-block">
            <div class="contact-block-label">Contact</div>
            <div class="contact-block-content block-contact">
              {{ contactNumber }}
            </div>
          </div>
        </div>
        <div class="copyright">
          Copyright © 2019 DAMINGPERA TRADING LIMITED. All Rights Reserved.
        </div>
      </div>
      <div class="footer-logo">
        <div class="logo-position">
          <img src="../assets/images/footer_logo.png" alt="footer logo" />
        </div>
      </div>
    </div>
    <div class="mobileFooterContainer mobile">
      <div class="footer-content-contact">
        <div class="contact-block">
          <div class="contact-block-label">Address</div>
          <div class="contact-block-content block-address">
            RM06, 13A/F SOUTH TOWER WORLD,<br />
            FINANCE CTR HARBOUR CITY 17,<br />
            CANTON RD TST KLN,<br />
            HONG KONG
          </div>
        </div>
        <div class="contact-block">
          <div class="contact-block-label">Contact</div>
          <div class="contact-block-content block-contact">
            {{ contactNumber }}
          </div>
        </div>
      </div>

      <div class="footer-logo">
        <img src="../assets/images/footer_logo.png" alt="footer logo" />
      </div>

      <div class="copyright">
        Copyright © 2019 DAMINGPERA TRADING LIMITED.<br />
        All Rights Reserved.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      contactAddress: "",
      contactNumber: "+852 2233-2888",
    };
  },
  methods: {},
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/footer.scss";
@import "/assets/scss/mobile/footer.scss";
</style>
