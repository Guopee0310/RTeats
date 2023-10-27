<!-- <template>
  <div class="loading_animation">
    <div class="drop-container">
      <div class="drop"></div>
      <div class="logo_name">
        <p>DIDADIDA</p>
        <span></span>
        <p>AQUARIUM</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua&display=swap');

.loading_animation {
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  background-color: rgb(25, 35, 125);

  .drop-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 150px;
    width: 150px;

    .drop {
      position: absolute;
      top: -100%;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      transform: rotate(-45deg);
      border: 2px solid #fff;
      animation: drip 1.8s forwards;
    }
  }
}

.logo_name {
  position: relative;
  margin-top: 10rem;
  letter-spacing: 1.2px;
  font-size: map-get($fontSizes, "h4");
  color: #fff;

  p {
    position: absolute;
    inset: 0;
    margin: auto;
    text-align: center;
    opacity: 0;
    animation: appear 1.6s 2s forwards;
    font-family: 'Inknut Antiqua';

    &:nth-of-type(2) {
      top: 33px;
      left: 5px;
      opacity: 0;
      animation: appear 1.6s 2s forwards;
      letter-spacing: 4px;
      font-size: 15px;
    }
  }

  span {
    background-color: #fff;
    width: 145px;
    height: 1px;
    position: absolute;
    top: 30px;
    opacity: 0;
    left: 2px;
    animation: appear 1.6s 2.2s forwards;
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

div.drop-container:before,
div.drop-container:after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 55%;
  right: 50%;
  transform: translate(50%) rotateX(75deg);
  border-radius: 100%;
  opacity: 0;
  width: 75%;
  height: 75%;
  border: 5px solid skyblue;
  animation: dripple 1.8s ease-out 1.2s;
}

div.drop-container:after {
  animation: dripple 1.6s ease-out 1.7s;
}

@keyframes drip {
  85% {
    top: 0;
    border-radius: 90% 1% 90% 100%;
    transform: rotate(-45deg);
  }

  100% {
    top: 0;
    border-radius: 90% 1% 90% 100%;
  }
}

@keyframes dripple {
  0% {
    width: 150px;
    height: 150px;
  }

  25% {
    opacity: 1;
  }

  100% {
    width: 500px;
    height: 500px;
    top: -20%;
    opacity: 0;
  }
}
</style> -->

<template>
    <div class="loading-mask">
        <div class="bgc-mask"></div>
        <div class="loading">
            <div class="loading-icon-spinner"></div>
            <div class="loading loading-icon-txt">RTeat</div>
        </div>
        <div class="loading-txt">
            Loading
            <span v-for="item in dots">{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dots: ['.']
    }
  },
  mounted() {
    this.dotAnimation()
  },
  methods: {
    dotAnimation() {
      let that = this;
      setInterval(() => {
        that.dots.push('.');
        if (that.dots.length > 3) {
          that.dots = []
        }
      }, 800)
    }
  }
}
</script>

<style lang="scss" scoped >
.loading-mask {
  z-index: 1000;
  .bgc-mask {
    opacity: 0.7;
    background-color: rgb(42, 60, 46);
    position: absolute;
    width: 100vw;
    height: 100vh;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loading-icon-spinner {
    width: 55px;
    height: 55px;
    background: #19316c;
    animation: loader-spin 0.8s infinite ease-in;
  }

  .loading-icon-txt {
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: loader-txt 0.8s infinite ease-in;
    color: white;
    font-family: Righteous;
    font-size: 22px;
  }

  .loading-txt {
    font-family: Righteous;
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 20px;
    color: #19316c;
    transform: translateX(-50%);
    margin-top: 20px;
  }
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  17% {
    border-bottom-right-radius: 3px;
  }
  25% {
    transform: translateY(9px) rotate(22.5deg);
  }
  50% {
    transform: translateY(18px) rotate(45deg);
    border-bottom-right-radius: 40px;
  }
  75% {
    transform: translateY(9px) rotate(67.5deg);
  }
  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes loader-txt {
  25% {
    transform: translate(-50%, -20px);
  }
  50% {
    transform: translate(-50%, -20px);
  }
  75% {
    transform: translate(-50%, -20px);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

</style>