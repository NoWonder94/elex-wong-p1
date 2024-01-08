<template>
  <div class="page-container">
      <div class="firstBG">
        <div class="firstBG-row">
          <div class="logo" style="position: absolute; left: 15vw;">
            <img src="../boleapp/ITEM_11.png" style="width: 100%;">
          </div>
          <div class="gamephoto">
            <div class="swing1">
              <img src="boleapp/ITEM_01.png" style="position: absolute; top: 21vw; left: 12vw; width: 32vw;">
              <img src="boleapp/ITEM_02.png" style="position:absolute; top: 20vw; left: 15vw; width: 19vw;">
            </div>
            <div class="arrow" style="position:absolute; bottom:0vw;width:100%; height:5vw;background: url(boleapp/ITEM_03.png) no-repeat center;">
              <img class="swing2" src="boleapp/ITEM_04.png" style="padding:2vw 1.7vw 1.7vw 1.7vw;">
            </div>
          </div>
        </div>
      </div>
      <div class="secondBG">
        <div class="secondBG-row">
          <div class="banner" style="width: 100%; position: absolute; top: 0;">
            <div class="service1" style="background: url(boleapp/ITEM_05.png) 100%/100% no-repeat; float: left;width: 33.33%">
              <div class="hover1" style="height: 23vw; background: url(boleapp/ITEM_06.png) no-repeat center; background-size: 50%;">
              </div>
            </div>
            <div class="service2" style="background: url(boleapp/ITEM_07.png) 100%/100% no-repeat; float: left;width: 33.33%">
              <div class="hover2 picture1" style="height: 23vw; background: url(boleapp/ITEM_08.png) no-repeat center; background-size: 50%;">
              </div>
            </div>
            <div class="service3" style="background: url(boleapp/ITEM_09.png) 100%/100% no-repeat; float: left;width: 33.33%">
              <div class="hover3" style="height: 23vw; background: url(boleapp/ITEM_10.png) no-repeat center; background-size: 50%;">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="thirdBG">
        <div class="thirdBG-row">
          <div class="button" style="width: 100%; height: 12vw; position: absolute; bottom: 0">
            <div style="width: 70%; margin: 0 auto;">
              <div class="button1">
              </div>
              <div class="button2">
              </div>
              <div class="button3">
              </div>
              <div class="button4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}

.firstBG {
  background: url(../boleapp/BG01.png) no-repeat center top;
  background-size: 56.65vw;
}

.firstBG .firstBG-row {
  background: url(../boleapp/BG04.png) no-repeat center top;
  height: 53vw;
  background-size: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.swing1 {
  position: relative;
  animation: motion 5s infinite;
   -webkit-animation: motion 5s infinite;
}

@keyframes motion{
  0% {
      top:0px;
  }
  50% {
      top:2vw;
  }
  100%{
      top:0px;
  }
}

.swing2 {
  position: relative;
  animation: arrow 3s infinite;
   -webkit-animation: arrow 3s infinite;
}

@keyframes arrow {
  0% {
      top:0px;
  }
  50% {
      top:0.5vw;
  }
  100%{
      top:0px;
  }
}

.secondBG {
  background: url(../boleapp/BG02.png) no-repeat center top;
  background-size: 56.8vw;
}

.secondBG .secondBG-row {
  background: url(../boleapp/BG05.png) no-repeat center top;
  height: 79vw;
  background-size: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.hover1:hover {
    transition: all 0.5s;
    transform: scale(1.5);
    height: 23vw;
    background: url(boleapp/ITEM_06_1.png) no-repeat center;
    background-size: 50%;
}

.hover2:hover {
    transition: all 0.5s;
    transform: scale(1.5);
    height: 23vw;
    background: url(boleapp/ITEM_08_1.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
}

.hover3:hover {
    transition: all 0.5s;
    transform: scale(1.5);
    height: 23vw;
    background: url(boleapp/ITEM_10_1.png) no-repeat center;
    background-size: 50%;
}

.thirdBG {
  background: url(../boleapp/BG03.png) no-repeat center top;
  background-size: 56.75vw;
}

.thirdBG .thirdBG-row {
  background: url(../boleapp/BG06.png) no-repeat center top;
  height: 66vw;
  background-size: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.button1 {
  width: 25%;
  height: 13vw;
  background-image:url(../boleapp/BT_01.png);
  background-size:100%;
  background-repeat:no-repeat;
  background-position:center;
  float: left;
  cursor: pointer;
}

.button2 {
  width: 25%;
  height: 13vw;
  background-image:url(../boleapp/BT_02.png);
  background-size:100%;
  background-repeat:no-repeat;
  background-position:center;
  float: left;
  cursor: pointer;
}

.button3 {
  width: 25%;
  height: 13vw;
  background-image:url(../boleapp/BT_03.png);
  background-size:100%;
  background-repeat:no-repeat;
  background-position:center;
  float: left;
  cursor: pointer;
}

.button4 {
  width: 25%;
  height: 13vw;
  background-image:url(../boleapp/BT_04.png);
  background-size:100%;
  background-repeat:no-repeat;
  background-position:center;
  float: left;
  cursor: pointer;
}
</style>
