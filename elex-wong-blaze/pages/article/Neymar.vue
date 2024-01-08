<template>
  <div class="neymar-container">
    <div class="neymar_header" @click="$router.back(-1)">
      <svg
        class="arrow-back"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2H7.825l5.6 5.6L12 20Z"
        ></path>
      </svg>
      <div class="neymar_header_title">
        <h2>Article</h2>
      </div>
    </div>
    <div class="neymar-car-container">
      <img class="neymar-web" src="~/assets/img/article_banner.png" alt="" />
      <img
        class="neymar-mobile"
        src="~/assets/img/mobile/article_banner.png"
        alt=""
      />
    </div>
    <div class="neymar-car-container reverse">
      <div class="neymar-car-container-item">
        <div class="healine">NEYMAR JR.</div>
        <div class="title">Official Partner</div>
        <div class="subtitle">
          {{$config.display_url}} is delighted to announce that we have partnered up with the
          legendary Neymar Jr. in a multi year agreement. {{$config.site_name}} & Neymar Jr.
          will collaborate to bring an entirely new gaming experience to our
          players, which includes monthly livestreams on Neymar's Twitch channel
          where Neymar will be playing & doing giveaways to the viewers which
          means you have a chance to win along side of Neymar himself!
        </div>
      </div>
      <div class="neymar-car-container-item">
        <img src="~/assets/img/article1.png" alt="" />
      </div>
    </div>
    <div class="neymar-car-container">
      <div class="neymar-car-container-item">
        <div class="healine">HISTORY</div>
        <div class="title">Perfect Partnership</div>
        <div class="subtitle">
          Neymar Jr., known for joining in on all the latest hypes, was quick to
          join {{$config.site_name}} last year. Neymar and his friends quickly became impressed
          with the platform. It only made sense for Neymar Jr. and {{$config.site_name}} to work
          on a way to collaborate and we have done just that! Do you want to
          play like Neymar Jr.? Check out his favorite games below!
        </div>
      </div>
      <div class="neymar-car-container-item">
        <img src="~/assets/img/article2.png" alt="" />
      </div>
    </div>
    <!-- <div class="neymar-car-container article">
      <div class="article-end">
        <div class="Neymar-healine">Neymar Jr's favorites</div>
      </div>
      <button class="neymar-button">See Games</button>
    </div> -->
  </div>
</template>
<script>
export default {
  name: "Neymar",
};
</script>
<style lang="scss" type="text/css">
@import "/assets/scss/web/neymar.scss";
@import "/assets/scss/mobile/neymar.scss";
</style>
