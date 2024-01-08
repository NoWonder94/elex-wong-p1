<template>
  <div class="index">
    <div class="first-index gradientBgColor">
      <Header class="web" />
      <div class="first-index-logo">
        <img src="../assets/images/home.png" alt="branding image" />
      </div>

      <div class="first-index-cursor">
        <div class="first-index-cursor-label">About Us</div>
        <img
          src="../assets/icon/mouse-01.svg"
          @click.prevent="scrollTo('about-us')"
          class="mouseAnimation"
        />
        <img
          src="../assets/icon/down_arrow-01.svg"
          @click.prevent="scrollTo('about-us')"
          class="arrowAnimation"
        />
      </div>

      <!-- backround effect -->
      <div class="light x1"></div>
      <div class="light x2"></div>
      <div class="light x3"></div>
      <div class="light x4"></div>
      <div class="light x5 web"></div>
      <div class="light x6"></div>
      <div class="light x7 web"></div>
      <div class="light x8"></div>
      <div class="light x9"></div>
      <!-- backround effect -->
    </div>

    <div class="about-us" id="about-us">
      <div class="about-us-content-block">
        <div class="about-us-brandLogo">
          <img src="../assets/images/logo.png" alt="" />
        </div>
        <div class="about-us-label">About Us</div>
        <div class="about-us-content">
          We continue to try innovative methods, look for market opportunities,
          and take an open company culture as the core to create rich
          opportunities for discussion and communication for the team, so that
          different talents can continue to stimulate each other, so they can
          always provide various types of products in the fastest time.
          High-quality services to meet market changes and needs.
        </div>
        <div class="about-us-button" @click.prevent="scrollTo('services')">
          Our Service
        </div>
      </div>
      <div class="about-us-image-block">
        <img src="../assets/images/image1.png" alt="about-us image" />
      </div>
    </div>

    <div class="services" id="services">
      <div class="service-info-grid">
        <div class="service-info-intro">
          <div class="service-info-intro-label">Our Service</div>
          <div class="service-info-intro-content">
            Provide tailor-made services for enterprises and brands, assist in
            brand building, network exposure, community operations, etc.,
          </div>
          <div
            class="service-info-intro-button"
            @click.prevent="scrollTo('contact')"
          >
            Join Us
          </div>
        </div>
        <div class="info-content-card">
          <div class="info-content-card-icon">
            <img src="../assets/images/data.png" alt="" />
          </div>
          <div class="info-content-card-label">Data Analysis</div>
          <div class="info-content-card-content">
            Data analysis is a process of evaluating data using analytical and
            logical reasoning to examine each component of the data provided. We
            inspect, cleanse, transform and model data with the goal of
            discovering useful information, informing conclusion and supporting
            decision-making.
          </div>
        </div>
        <div class="info-content-card">
          <div class="info-content-card-icon">
            <img src="../assets/images/security.png" alt="" />
          </div>
          <div class="info-content-card-label">Cyber Security</div>
          <div class="info-content-card-content">
            Companies use our Cybersecurity & Risk Service to address these
            threats. The service uses a portofolio of Cyber Defence Platforms,
            frameworks, data analytics to build defense systems against complex
            and sophisticated threats.
          </div>
        </div>
        <div class="info-content-card">
          <div class="info-content-card-icon">
            <img src="../assets/images/mobile.png" alt="" />
          </div>
          <div class="info-content-card-label">Mobile App Development</div>
          <div class="info-content-card-content">
            The company has now brought the expertise and efficiency in mobile
            application development and has built applications compatible with
            every major mobile platform including iOS, Android, BlackBerry OS,
            and Windows Mobile. We are also an expert at HTML5 development.
          </div>
        </div>
        <div class="info-content-card">
          <div class="info-content-card-icon">
            <img src="../assets/images/Machine_Learning.png" alt="" />
          </div>
          <div class="info-content-card-label">Machine Learning</div>
          <div class="info-content-card-content">
            Machine learning is an application of artificial intelligence (AI)
            that provides systems the ability to automatically learn and improve
            from experience without being explicitly programmed.
          </div>
        </div>
        <div class="info-content-card">
          <div class="info-content-card-icon">
            <img src="../assets/images/support.png" alt="" />
          </div>
          <div class="info-content-card-label">Software Support</div>
          <div class="info-content-card-content">
            Software support is a service that supports users with technology
            products or services. We offer a service to provide support to users
            that are in need of technical fix such as databases, spreadsheets,
            and multimedia.
          </div>
        </div>
      </div>
    </div>

    <div class="contact" id="contact">
      <div class="contact-image-block">
        <img src="../assets/images/image2.png" alt="contact image" />
      </div>
      <div class="contact-content-block">
        <div class="contact-label">Join us</div>
        <div class="contact-content">
          We value every employee and believe that employees are the company’s
          greatest assets, providing space for learning and growth, as well as a
          good working environment and an open company culture. <br />
          We welcome you who are interested in brand building, digital
          advertising, and community management to become our partners!
        </div>
      </div>
    </div>
    <!--
      <Loading :isLoading.sync="isLoading" />
    -->
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    scrollTo(id) {
      const element = document.getElementById(id);
      if (element) {
        window.scroll({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    },

    initialize() {
      /*
      let params = {};
      this.$api.requestByPost('', params).then(result => {
          if (result.status == true) {
              this.$notiflix.Notify.success(result.msg ? result.msg : this.$t('message.success'), {
                  showOnlyTheLastOne: true,
              });
          } else {
              this.$notiflix.Notify.failure(result.msg ? result.msg : this.$t('message.error'), {
                  showOnlyTheLastOne: true,
              });
          }

          this.isLoading = false;
      }).catch(error => {
          this.$notiflix.Notify.failure(this.$t('message.error'), {
              showOnlyTheLastOne: true,
          });
      });
      */
    },
  },
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/pc/index.scss";
@import "/assets/scss/mobile/index.scss";
</style>
