<template>
  <div v-if="loading && this.$store.state.showLoadingOnce">
    <LoadingBox />
  </div>
  <div v-else>
    <div class="index">
       <!-- banner + open time ------------------------------------------ -->
       <div class="banner">
          <Carousel
            autoplay
            autoplay-speed="4800"
            dots="none"
            v-model="value"
            loop
          >
          <CarouselItem v-for="(item, index) in bannerAll" :key="index">
        <div class="demo-carousel">
          <img :src="item.imageUrl" alt="Banner Image" />
        </div>
         </CarouselItem>
          </Carousel>
          <p>
            <blingText></blingText>
          </p>
        <lightCircle>
          <template v-slot:circle>
            <div class="open">
              <span>{{ $t("營業時間") }}</span>
              <span>09:00-17:00</span>
              <svg x="0px" y="0px" width="200px" height="15px" viewBox="0 0 399.6 15.9">
                <polyline class="op_line" points="0.1,5.5 58,15.4 118.4,5.5 189.2,5.5 258.7,10.4 368.3,0.5 399.5,7.9 " />
              </svg>
              <span>{{ $t("最後入場") }}</span>
              <span>16:00</span>
            </div>
          </template>
        </lightCircle>
      </div>

      <!-- 今日入園人數 ------------------------------------------ -->
      <div class="entrance">
        <h3Title>
          <template v-slot:h3>
            <h3>{{ $t("今日入園人數") }}</h3>
          </template>
        </h3Title>
        <div class="drop">
          <div class="wave water"></div>
          <div class="wave water"></div>
        </div>
        <p>{{ this.$store.state.visitCount }}人</p>
        <div class="deco turtle">
          <img src="../../public/all_images/deco/deco_turtle.png" alt="" />
        </div>
        <div class="deco fishes">
          <img src="../../public/all_images/deco/deco_fishes.png" alt="" />
        </div>
        <div class="paopao"></div>
        <!-- <paoPao></paoPao> -->
      </div>

      <!-- 營業資訊 ------------------------------------------ -->

      <h3Title>
        <template v-slot:h3>
          <h3>{{ $t("票價資訊") }}</h3>
        </template>
      </h3Title>
      <ticketPrice></ticketPrice>
      <router-link to="/ticket"><button>立即購票</button></router-link>

      <!-- 交通指南 ------------------------------------------ -->
      <h3Title>
        <template v-slot:h3>
          <h3>{{ $t("交通指南") }}</h3>
        </template>
      </h3Title>
      <div class="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14468.996712784081!2d121.2250227!3d24.9576355!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346823ea50c732a5%3A0x1b5e6ee66e9fec49!2z57ev6IKyVGliYU1l6ZmE6Kit5Lit5aOi6IG36KiT5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1690272123794!5m2!1szh-TW!2stw"
          style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div class="text">
          <div class="address">
            <span>地址</span>
            <p>海洋市深海區珊瑚一街404號</p>
          </div>
          <div class="car">
            <span>交通</span>
            <div class="way" v-for="car in car" :key="car">
              <p>{{ car.name }}</p>
              <p>{{ car.content }}</p>
            </div>
          </div>
        </div>
        <div class="deco">
          <img src="../../public/all_images/deco/deco_fishes.png" alt="" />
        </div>
      </div>

      <!-- 熱賣商品 ------------------------------------------ -->
      <h3Title>
        <template v-slot:h3>
          <h3>強棒美食</h3>
        </template>
      </h3Title>
      <div class="product">
        <div class="item" v-for="product in products" :key="product">
          <div class="image">
            <a href="#"><img :src="product.src" alt="product.alt" /></a>
          </div>
          <div class="content">
            <div class="nub">{{ product.nub }}</div>
            <a href="#">
              <h4>{{ product.name }}</h4>
              <div class="text">{{ product.text }}</div>
            </a>
            <span>{{ product.price }}</span>
          </div>
        </div>
        <router-link to="/product"><button>更多商品</button></router-link>
        <div class="deco star">
          <img src="../../public/all_images/index/deco_index_star.png" alt="" />
        </div>
        <div class="deco shark">
          <img src="../../public/all_images/index/deco_index_shark.png" alt="" />
        </div>
        <div class="deco whale">
          <img src="../../public/all_images/index/deco_index_whale.png" alt="" />
        </div>
      </div>

      <!-- 活動倒數 ------------------------------------------ -->
      <h3Title>
        <template v-slot:h3>
          <h3>{{ $t("活動倒數") }}</h3>
        </template>
      </h3Title>
      <div class="active">
        <div class="card">
          <div class="item">
            <div class="image">
              <img src="../assets/images/openActive.jpg" alt="" />
            </div>
            <div class="text">
              <span class="date">活動時間 : 9月1日至9月28日</span>
              <p class="title">DIDADIDA水族館開幕慶</p>
              <p class="self">票價限時優惠<span> 10% </span>off</p>
            </div>
          </div>
          <div class="day">
            <span>倒數</span>
            <span>5</span>
            <span>天</span>
          </div>
        </div>
        <div class="card">
          <div class="item">
            <div class="image">
              <img src="../assets/images/blueCloth.jpg" alt="" />
            </div>
            <div class="text">
              <span class="date">活動時間 : 9月1日至9月28日</span>
              <p class="title">海洋藍慶典</p>
              <p class="self">入場穿藍色系服裝可享半價優惠</p>
            </div>
          </div>
          <div class="day">
            <span>倒數</span>
            <span>5</span>
            <span>天</span>
          </div>
        </div>
      </div>

      <!-- 視覺互動 ------------------------------------------ -->
      <div class="game">
        <visual></visual>
      </div>
    </div>
  </div>
</template>

<script>
import visual from "../components/visualGame.vue";
import LoadingBox from "../components/loading.vue";
import h3Title from "../components/h3TitleComponent.vue";
import lightCircle from "../components/lightCircle.vue";
import blingText from "../components/blingText.vue";
import ticketPrice from "../components/ticketPrice.vue";
import paoPao from "../components/paoPao.vue";
export default {
  name: "HomeView",
  data() {
    return {
      resetVisual: false,
      loading: true,
      animationDuration: 4200,
      priceTitle: [{ name: "票種" }, { name: "價格" }, { name: "適用對象" }],
      ticket: [
        { name: "一般票", price: "NT 500", object: "限18歲(含)以上成人使用" },
        {
          name: "學生票",
          price: "NT 300",
          object: "限12歲(含)以上持學生證之學生適用",
        },
        {
          name: "孩童票",
          price: "NT 200",
          object: "限4歲(含)以上及未滿12歲兒童適用",
        },
        {
          name: "愛心票",
          price: "NT 200",
          object:
            "限持有身心障礙證明者、身心障礙者的1位陪同者、孕婦、滿65歲以上長者適用",
        },
        { name: "團體票", price: "NT 350", object: "15人以上適用" },
      ],
      products: [
        {
          src: require("../assets/images/index_p1.png"),
          alt: "index_image1",
          nub: "01",
          name: "海豚娃娃",
          text: "由DIDADIDA深海區最有名的傑尼海龜為造型。",
          price: "NT 500",
        },
        {
          src: require("../assets/images/index_p2.png"),
          alt: "index_image2",
          nub: "02",
          name: "海豚抱枕",
          text: "由DIDADIDA深海區最有名的傑尼海龜為造型。",
          price: "NT 300",
        },
        {
          src: require("../assets/images/index_p3.png"),
          alt: "index_image3",
          nub: "03",
          name: "人魚吊飾",
          text: "由DIDADIDA深海區最有名的傑尼海龜為造型。",
          price: "NT 200",
        },
      ],
      car: [
        {
          name: "自行開車",
          content: "請於國道10號，海洋交流道下，左轉直行珊瑚一街",
        },
        { name: "搭乘公車", content: "請於海洋市區，搭乘海洋路線777公車" },
        {
          name: "搭乘捷運",
          content: "請搭乘海洋線，於滴答滴答站下車，2號出口",
        },
      ],
      bannerAll:[
        {imageUrl: `${this.$store.state.chooseImgSrc}all_images/banner/banner_home.jpg}`,},
        {imageUrl: `${this.$store.state.chooseImgSrc}all_images/banner/banner_home.jpg}`,},
        {imageUrl: `${this.$store.state.chooseImgSrc}all_images/banner/banner_home.jpg}`,}

      ]
    };
  },
  methods: {},
  components: {
    visual,
    LoadingBox: LoadingBox,
    h3Title,
    lightCircle,
    blingText,
    ticketPrice,
    paoPao,
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      this.$store.state.showLoadingOnce = false;
    }, this.animationDuration);

    setTimeout(() => {
      this.resetVisual = true;
    }, this.animationDuration + 300);
  },
};
</script>

<style lang="scss" scoped>
.index {
  background-color: map-get($colors, "bgc");
  width: 100%;

  h3 {
    @include h3Title();
  }

  button {
    display: block;
    margin: 30px auto 80px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: none;
    color: map-get($colors, "maincolor");
    font-size: 18px;
    background-color: map-get($colors, "h2Green");
    cursor: pointer;

    box-shadow: 0 0 0 0 rgba(map-get($colors, "h2Green"), 0.5);
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.9);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 30px rgba(map-get($colors, "h2Green"), 0);
    }

    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(map-get($colors, "h2Green"), 0);
    }
  }

  button:hover {
    animation: none;
    box-shadow: inset 0 0 20px map-get($colors, "h2Green");
  }

  // banner ---------------------------------------------
  .banner {
    background-image: url(../../public/all_images/banner/banner_home.jpg);
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;

    p {
      font-size: 50px;
      color: map-get($colors, "light");
      text-align: center;
      line-height: 80vh;
    }

    // 營業時間 ---------------------------------------------
    .open {
      // background-color: rgba(19, 67, 35, 1);
      width: 250px;
      height: 250px;
      border-radius: 50%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 3;

      svg polyline {
        fill: none;
      }

      .op_line {
        stroke: #9fbdce;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 10, 15;
        stroke-dashoffset: 3;
      }

      span {
        display: block;
        color: map-get($colors, "light");
        font-size: 27px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
    }
  }

  // 今日入園人數 ---------------------------------------------
  .entrance {
    max-width: 1200px;
    width: 100%;
    margin: 50px auto;
    position: relative;

    // h3 {
    //   width: 150px;
    //   margin: -30px auto 0;
    // }

    .drop {
      margin: 80px auto;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 10px solid #68769a;
      border-top-right-radius: 0;
      transform: rotate(-45deg);

      position: relative;
      overflow: hidden;

      .wave {
        transform: rotate(45deg);
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        width: 100%;
        height: 100px;
        background: url(../../public/all_images/wave.png);
        background-size: 500px 100px;
      }

      .wave.water {
        animation: wave 9s linear infinite;
        animation-delay: 0s;
        margin: 0 -55px;
        opacity: 1;
      }

      .wave.water:nth-child(2) {
        animation: wave 9s linear infinite;
        opacity: 0.6;
        animation-delay: -3s;
        bottom: 12px;
      }

      @keyframes wave {
        0% {
          background-position-x: 0;
        }

        100% {
          background-position-x: 1000px;
        }
      }
    }

    p {
      position: absolute;
      text-align: center;
      font-size: 75px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      top: 50%;
      left: 0;
      right: 0;
    }

    .deco {
      position: absolute;
      opacity: 0.5;
    }

    .deco.turtle {
      bottom: -140px;
      left: 10px;

      img {
        width: 150%;
      }
    }

    .deco.fishes {
      bottom: -100px;
      right: 30px;

      img {
        width: 120%;
      }
    }
  }

  // 交通指南 ---------------------------------------------
  .map {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto 100px;
    display: flex;
    position: relative;

    iframe {
      width: 60%;
      height: 350px;
      margin-right: 30px;
    }

    .text {
      width: 40%;

      span {
        font-weight: 800;
        display: block;
        background-color: map-get($colors, "secondary");
        color: #eee;
        border-radius: 3px;
        padding: 5px 10px;
        margin: 10px 0;
      }

      .way {
        margin: 20px 0;
      }

      .way p:first-child {
        font-weight: 800;
        border-bottom: 3px solid map-get($colors, "h2Green");
        width: 60px;
        margin-bottom: 5px;
      }

      .way p:last-child {
        margin-bottom: 20px;
      }
    }

    .deco {
      position: absolute;
      top: -200px;
      left: -100px;

      img {
        width: 90%;
        vertical-align: top;
        transform: scaleX(-1);
      }
    }
  }

  // 熱銷商品 ---------------------------------------------
  .product {
    max-width: 960px;
    width: 100%;
    margin: 0 auto 100px;
    position: relative;

    .item:nth-child(2) {
      flex-direction: row-reverse;
      text-align: right;
    }

    .item:nth-child(2) .nub {
      margin-left: auto;
    }

    .item {
      margin: auto;
      display: flex;
      color: map-get($colors, "mainColor");

      .image {
        margin: 0 50px;
      }

      .image img {
        vertical-align: top;
        width: 100%;
      }

      .content {
        margin: auto 0;

        .nub {
          border-bottom: 1px solid map-get($colors, "mainColor");
          font-size: 50px;
          line-height: 1.2;
          width: 50px;
        }

        a {
          color: map-get($colors, "mainColor");
          transition: 0.3s;

          h4 {
            font-size: 20px;
            padding-top: 15px;
          }
        }

        a:hover {
          color: map-get($colors, "hoverColor");
          transition: 0.3s;
        }

        span {
          font-size: 18px;
          line-height: 4;
        }
      }
    }

    .deco {
      position: absolute;
    }

    .star {
      top: -300px;
      right: -380px;
    }

    .shark {
      top: 400px;
      left: -330px;
    }

    .whale {
      bottom: -150px;
      right: -450px;
    }
  }

  // 活動倒數 ---------------------------------------------
  .active {
    max-width: 1200px;
    width: 100%;
    margin: 20px auto 100px;

    .item {
      width: 100%;
      height: 230px;
      display: flex;
      background-color: map-get($colors, "secondary");
      border-radius: 10px;
      overflow: hidden;
      // background-image: url(../assets/images/openActive.png);
      // background-repeat: no-repeat;

      .image {
        width: 50%;
        position: relative;
      }

      .image::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        border-right: 50px solid #68769a;
        border-bottom: 200px solid #68769a;
        border-top: 200px solid transparent;
        border-left: 50px solid transparent;
      }

      .image img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        object-fit: cover;
      }

      .text {
        width: 50%;
        margin: auto;
        color: map-get($colors, "light");
        text-align: center;
        background-color: #9fbdce;
        background: linear-gradient(80deg, transparent 75px, #68769a 0);

        .date {
          display: block;
          padding-bottom: 25px;
          color: map-get($colors, "mainColor");
        }

        .title {
          font-size: 30px;
        }

        .self {
          font-size: 18px;

          span {
            font-size: 35px;
          }
        }
      }
    }

    .card {
      position: relative;
      margin-bottom: 70px;
    }

    .day {
      position: absolute;
      top: -25px;
      right: -20px;
      width: 110px;
      height: 110px;
      text-align: center;
      background-color: map-get($colors, "light");
      border-radius: 50%;
      padding: 17px 0;

      span {
        line-height: 0.9;
      }
    }

    .day>span:first-child {
      display: block;
    }

    .day>span:nth-child(2) {
      font-size: 80px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  // -- RWD --------------------------------------
  @media screen and (max-width: 768px) {
    .ticket {
      max-width: 90%;
    }

    .map {
      max-width: 90%;
      flex-wrap: wrap;
      margin: 0 auto 60px;

      iframe {
        width: 100%;
        margin: auto;
      }

      .text {
        width: 100%;
        margin-top: 30px;
      }
    }

    // .map::after {
    //   content: '';
    //   width: 100%;
    //   border-bottom: 2px solid #68769a;
    //   border-radius: 5px;
    // }

    .active {
      max-width: 90%;

      .day {
        width: 90px;
        height: 90px;
        top: -25px;
        right: -20px;
      }

      .text {
        padding-right: 15px;
      }

      .day>span:nth-child(2) {
        font-size: 60px;
      }
    }
  }

  @media screen and (max-width: 415px) {
    .deco,
    .all-circle {
      display: none;
    }

    .banner {
      height: 40vh;
      overflow: hidden;

      img {
        width: 300%;
      }

      p {
        font-size: 35px;
      }
    }

    .entrance {
      margin: 0px auto;
    }

    .map {
      .paopao {
        display: none;
      }
    }

    .product {
      padding: 1px;
      margin: 0 auto;
      // border: 1px solid rgb(26, 16, 97);

      .item:nth-child(2) {
        text-align: left;
      }

      .item {
        flex-wrap: wrap;

        .image {
          width: 100%;

          img {
            width: 100%;
          }
        }

        .content {
          width: 80%;
          margin: 10px auto 35px;
          text-align: center;

          .text {
            text-align: justify;
          }

          .nub {
            // margin: auto;
            position: absolute;
            top: 0;
            left: 50px;
          }

          span {
            line-height: 2.5;
          }
        }
      }

      button {
        margin: 0 auto 50px;
      }
    }

    .active {
      width: 90%;

      .item {
        height: auto;
        flex-wrap: wrap;

        .image {
          width: 100%;
          height: 20vh;
        }

        .image::after {
          border: 0;
        }

        .text {
          width: 90%;
          margin-bottom: 25px;

          .date {
            padding: 15px;
          }

          .title {
            font-size: 25px;
          }

          .self {
            font-size: 15px;

            span {
              font-size: 25px;
            }
          }
        }
      }

      .day {
        top: -25px;
        right: -15px;
        width: 90px;
        height: 90px;
      }
    }

    .game {
      display: none;
    }

    .gameBar {
      display: flex;
      justify-content: center;
      margin: auto;
      // position: relative;

      .rangeCover {
        position: relative;
      }

      input {
        position: relative;
        display: flex;
        margin: 20px auto;
        background-color: map-get($colors, "h2Blue");

        &::before {
          position: absolute;
          content: "Light";
          font-size: 10px;
          top: -5px;
          left: -40px;
        }

        &::after {
          position: absolute;
          content: "Dark";
          font-size: 10px;
          top: -5px;
          right: -40px;
        }
      }

      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: map-get($colors, "mainColor");
        box-shadow: map-get($colors, "hoverColor") 0 0 10px;
      }

      .slider {
        appearance: none;
        width: 10rem;
        height: 0.25rem;
        outline: none;
        border-radius: 0.25rem;
      }

      label {
        position: absolute;
        top: -30px;
        padding: 5px;
        border-radius: 5px;
        color: #68769a;
        background-color: map-get($colors, "light");
        width: max-content;
        transform: translateX(-45%);
        // white-space: nowrap;

        &::after {
          position: absolute;
          bottom: -20px;
          left: 40%;
          content: "";
          border-top: 10px solid #eee;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          border-left: 10px solid transparent;
        }
      }
    }

    .gamePhone {
      display: flex;
      flex-wrap: wrap;
      height: 50vh;
      background-image: url();
      background-size: cover;
      background-position: center;

      .square {
        width: 100%;
        height: 100%;
        background-color: rgb(0, 0, 0);
      }
    }
  }

}
</style>
