<template>
  <div class="header">
    <div class="wrap" :style="{
      'background-color': headerColor,
      top: 0,
      left: 0,
      'z-index': 8,
      width: '100%',
    }">
      <!-- logo -->

      <!-- this.checkLogoPic = false; -->
      <div :class="{ logo: !checkLogoPic, logoChange: checkLogoPic }">
        <router-link to="/" v-if="!checkLogoPic"><img src="../../public/all_images/logo_all.svg" /></router-link>
        <router-link to="/" v-if="checkLogoPic"><img src="../../public/all_images/logo_half.svg" /></router-link>
      </div>

      <nav class="main-nav"  :style="{ 'color': headerwordColor}">
        <!-- 關於我們 -->
        <div class="main-menu">
          <router-link to="/about">{{ $t(menuTitle.about) }}</router-link>
          <ul class="sub-menu">
            <li v-for="aboutSub in aboutSub" key="aboutSub">
              <router-link :to="aboutSub.link">{{
                $t(aboutSub.name)
              }}</router-link>
            </li>
          </ul>
        </div>

        <!-- 最新消息 -->
        <div class="main-menu">
          <router-link to="/news">{{ $t(menuTitle.news) }}</router-link>
        </div>

        <!-- 探索海洋生物 -->
        <div class="main-menu">
          <router-link to="/explore">{{ $t(menuTitle.animal) }}</router-link>
          <ul class="sub-menu">
            <li v-for="animalSub in animalSub" key="animalSub">
              <router-link :to="animalSub.link" @click="changePageMove(animalSub.name)">{{ $t(animalSub.name)
              }}</router-link>
            </li>
          </ul>
        </div>

        <!-- DIDA商城 -->
        <div class="main-menu">
          <a>{{ $t(menuTitle.buy) }}</a>
          <ul class="sub-menu">
            <li v-for="buySub in buySub" key="buySub">
              <router-link :to="buySub.link">{{ $t(buySub.name) }}</router-link>
            </li>
          </ul>
        </div>

        <!-- 會員登入 -->
        <div class="icons">
          <span>
            <i @click="this.$store.state.storeShowLogin = true" v-if="!this.$store.state.userName"
              class="fa-solid fa-user" style="color: #eee"></i>
            <div v-if="this.$store.state.userName" @click="this.$router.push('./member')" style="color: #eee">
              {{ this.$store.state.userName }}
            </div>
            <span v-if="this.$store.state.userName" @click="logOutAPI()" class="logOutBtn">登出</span>
          </span>

          <!-- 購物車 -->
          <router-link to="/shoppingcart"><i class="fa-solid fa-cart-shopping" style="color: #eee"></i></router-link>
        </div>
        <!-- 語言切換 -->
        <div class="select">
          <select v-model="selectedLanguage" @change="changeLanguage">
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
            <!-- 添加其他支持的語言選項 -->
          </select>
          <span><i class="fa-solid fa-chevron-down" style="color: #eeeeee"></i></span>
        </div>
      </nav>
      <!-- 手機menu -->
      <div class="rwd_menu">

        <div class="navigation">
          <input type="checkbox" class="navigation__checkbox" id="nav-toggle">
          <label for="nav-toggle" class="navigation__button">
            <span class="navigation__icon" aria-label="toggle navigation menu"></span>
          </label>
          <div class="navigation__background"></div>

          <nav class="navigation__nav" role="navigation">

            <ul class="navigation__list">
              <div class="btn_wrap">
                <div class="icons">
                  <span>
                    <i @click="this.$store.state.storeShowLogin = true" v-if="!this.$store.state.userName"
                      class="fa-solid fa-user" style="color: #eee"></i>
                    <div v-if="this.$store.state.userName" @click="this.$router.push('./member')" style="color: #eee">
                      {{ this.$store.state.userName }}
                    </div>
                    <span v-if="this.$store.state.userName" @click="logOutAPI()" class="logOutBtn">登出</span>
                  </span>

                  <!-- 購物車 -->
                  <router-link to="/shoppingcart" @click="closeMobileMenu"><i class="fa-solid fa-cart-shopping"
                      style="color: #eee"></i></router-link>
                </div>
                <div class="select">
                  <select v-model="selectedLanguage" @change="changeLanguage">
                    <option value="zh-TW">繁體中文</option>
                    <option value="en">English</option>
                    <!-- 添加其他支持的語言選項 -->
                  </select>
                  <span><i class="fa-solid fa-chevron-down" style="color: #eeeeee"></i></span>
                </div>
              </div>
              <!-- 關於DIDA -->
              <li class="navigation__item">
                <a @click="toggleDropdown('about')">{{ $t(menuTitle.about) }}</a>
                <ul class="dropdown" v-if="showAboutDropdown">
                  <li v-for="aboutSub in aboutSub" key="aboutSub">
                    <router-link :to="aboutSub.link" @click="closeMobileMenu">{{
                      $t(aboutSub.name)
                    }}</router-link>
                  </li>
                </ul>
              </li>
              <!-- 最新消息 -->
              <li class="navigation__item">
                <router-link to="/news" @click="closeMobileMenu">{{ $t(menuTitle.news) }}</router-link>
              </li>
              <!-- 探索海洋 -->
              <li class="navigation__item">
                <router-link to="/explore" @click="closeMobileMenu">{{ $t(menuTitle.animal) }}</router-link>
              </li>
              <!-- 購物 -->
              <li class="navigation__item">
                <a @click="toggleDropdown('buy')">{{ $t(menuTitle.buy) }}</a>
                <ul class="dropdown" v-if="showBuyDropdown">
                  <li v-for="buySub in buySub" key="buySub">
                    <router-link :to="buySub.link" @click="closeMobileMenu">{{
                      $t(buySub.name)
                    }}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      checkLogoPic: false,
      headerColor: "rgba(56, 89, 75, 0)",
      headerwordColor:"dark green",
      headerPosition: "relative",
      showAboutDropdown: false,
      showBuyDropdown: false,
      menuTitle: {
        about: "關於DIDA",
        news: "最新消息",
        animal: "探索美食",
        buy: "DIDA商城",
      },
      aboutSub: [
        { link: "/about", name: "關於我們" },
        { link: "/faq", name: "常見問答" },
        { link: "/guide", name: "園區導覽" },
        { link: "/interact", name: "互動遊戲" },
      ],
      animalSub: [
        { link: "/#", name: "表層海洋帶" },
        { link: "/#", name: "中層海洋帶" },
        { link: "/#", name: "深層海洋帶" },
        { link: "/#", name: "深淵層海洋帶" },
        { link: "/#", name: "超深淵層海洋帶" },
      ],
      buySub: [
        { link: "/product", name: "DIDA購物" },
        { link: "/ticket", name: "DIDA購票" },
      ],
      icon: [
        {
          link: "#",
          eAlt: "會員登入icon",
          imgSrc: '<i class="fa-solid fa-user" style="color: #eeeeee;"></i>',
        },
        {
          link: "#",
          eAlt: "購物車icon",
          imgSrc:
            '<i class="fa-solid fa-cart-shopping" style="color: #eeeeee;"></i>',
        },

      ],
      selectedLanguage: "zh-TW", // 默認語言
      // language: [
      //   {
      //     option: "繁體中文",
      //   },
      //   {
      //     option: "英文",
      //   },
      // ],
    };
  },
  watch: {
    "$route.query"(nVal, oVal) {
      //   console.log(nVal);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    changePageMove(name) {
      if (name == "表層海洋帶") {
        // this.$router.push({ path: '/product', query: { article: 'footer' } });
        this.$router.push({ path: "/explore", query: { article: "one" } });
        setTimeout(() => {
          // 获取滚动目标元素
          const target = document.getElementById("one");

          // 滚动到目标元素
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (name == "中層海洋帶") {
        this.$router.push({ path: "/explore", query: { article: "two" } });
        setTimeout(() => {
          // 获取滚动目标元素
          const target = document.getElementById("two");

          // 滚动到目标元素
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (name == "深層海洋帶") {
        this.$router.push({ path: "/explore", query: { article: "three" } });
        setTimeout(() => {
          // 获取滚动目标元素
          const target = document.getElementById("three");

          // 滚动到目标元素
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (name == "深淵層海洋帶") {
        this.$router.push({ path: "/explore", query: { article: "four" } });
        setTimeout(() => {
          // 获取滚动目标元素
          const target = document.getElementById("four");

          // 滚动到目标元素
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (name == "超深淵層海洋帶") {
        this.$router.push({ path: "/explore", query: { article: "five" } });
        setTimeout(() => {
          // 获取滚动目标元素
          const target = document.getElementById("five");

          // 滚动到目标元素
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    },
    logOutAPI() {
      fetch("https://tibamef2e.com/cgd103/g1/api/postMemberLogout.php")
        .then((res) => res.json())
        .then((json) => console.log(json));
      this.$store.state.userName = "";
      this.$store.state.shoppingCart = [];
      this.$store.state.favoList = [];
      this.$store.state.ticketList = [];
      this.$store.state.totalScorePoint = 0;
    },
    handleScroll(event) {
      console.log(event);
      console.log(window.scrollY);
      if (window.scrollY == 0) {
        this.headerColor = "rgba(56, 89, 75, 0)";
        this.headerWordcolor ="dark green";
        this.checkLogoPic = false;
        
      } else {
        this.headerColor = "rgba(56, 89, 75, 1)";
        this.headerWordcolor ="white";
        this.checkLogoPic = true;
      }
    },
    toggleDropdown(menuType) {
      // 根據不同的子選單類型來判斷是否展開或收起
      if (menuType === 'about') {
        this.showAboutDropdown = !this.showAboutDropdown;
        // 如果展開about子選單，則收起buy子選單
        this.showBuyDropdown = false;
      } else if (menuType === 'buy') {
        this.showBuyDropdown = !this.showBuyDropdown;
        // 如果展開buy子選單，則收起about子選單
        this.showAboutDropdown = false;
      }
    },
    closeMobileMenu() {
      const checkbox = document.getElementById("nav-toggle");
      if (checkbox) {
        checkbox.checked = false;
      }
      this.showAboutDropdown = false;
      this.showBuyDropdown = false;
    },
    changeLanguage() {
      // 使用i18n的setLocale方法来切换语言
      this.$i18n.locale = this.selectedLanguage;
    },
    // toFooter(){
    //     this.$router.push({ path: '/product', query: { article: 'footer' } });
    //     this.$router.push({path:'/', query:{section : 'footer' }})
    // }
  },
};
</script>
<style scoped lang="scss">
// @import "~@/assets/scss/base/reset.scss";


.wrap {
  display: flex;
  max-width: 100vw;
  justify-content: space-between;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  transition: 1s;

  // logo 樣式
  .logoChange {
    width: 50px;
    transition: 1s;

    img {
      vertical-align: top;
      width: 100%;
    }
  }

  .logo {
    width: 80px;
    transition: 1s;

    img {
      vertical-align: top;
      width: 100%;
    }
  }

  // 選單樣式
  .main-nav {
    display: flex;
    justify-content: center;
    align-items: center;

    select {
      @include selectBtn;
    }
  }

  .main-nav a {
    line-height: 1.8;
    padding: 10px;
    text-decoration: none;
    // color: white;
    font-size: map-get($fontSizes, "nav");
  }

  .main-menu {
    position: relative;
    margin: 0 10px;
    display: flex;
    justify-content: center;
  }

  // 子選單樣式
  .sub-menu {
    visibility: hidden;
    text-align: center;
    position: absolute;
    top: 40px;
    padding: 10px 0;
    background-color: rgba(101, 101, 101, 0.6);
    backdrop-filter: blur(3px);
    border-radius: 2px;
    transform: translateY(-1em);
    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s,
      z-index 0s linear 0.01s;

    li:nth-child(4) {
      width: 140px;
      // width: fit-content;
    }
  }

  .main-menu:hover .sub-menu {
    visibility: visible;
    transform: translateY(0%);
    transition-delay: 0s, 0s, 0.3s;
  }

  .sub-menu a:hover {
    color: map-get($colors, hoverColor);
  }
}

.wrap.show {
  background-color: map-get($colors, mainColor);
}

select {
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-size: map-get($fontSizes, "p");
  cursor: pointer;
  /* background-image:url(imgs/Vector.png) ;
              background-position: right center; */
  /* appearance: none; */
  /* -moz-appearance: none; */
  width: 150px;
}

.icons {
  cursor: pointer;

  span {
    .logOutBtn {
      // border: 1px red solid;
      color: white;
    }
  }
}

.select {
  @include btnWidth;

  span {
    @include btnSpan;
  }
}

/* 滑鼠懸停時的樣式 */
select:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

/* 選擇狀態的樣式 */
select:focus {
  outline: none;
  border: 2px solid map-get($colors, hoverColor);
}

/* 下拉選項樣式 */
option {
  background-color: #2c3e50;
  color: #eee;
}

/* 選擇的下拉選項樣式 */
option:checked {
  background-color: map-get($colors, hoverColor);
  color: #fff;
}

.rwd_menu {
  display: none;
}

@media screen and (max-width:768px) {

  .wrap {
    .main-nav {
      display: none;
    }

    .btn_wrap {
      width: 80%;
      margin: auto;
      display: flex;
      justify-content: space-between;

      .icons {
        font-size: map-get($fontSizes , 'div');
        width: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center
      }

      select {
        @include selectBtn;
      }

      /* Remove IE arrow */
      select::-ms-expand {
        display: none;
      }

      /* Custom Select wrapper */
      .select {
        @include btnWidth;

        span {
          @include btnSpan;
        }
      }

      option {
        background-color: #2c3e50;
      }
    }

    .rwd_menu {
      display: flex;
      align-items: center;
      justify-content: center;



      .navigation {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        z-index: 7;
      }

      .navigation__checkbox {
        display: none;
      }

      .navigation__button {
        position: relative;
        text-align: center;
        border-radius: 50%;
        z-index: 8;
        cursor: pointer;

        span {
          margin-right: 1.5rem;
          display: inline-block;
        }

        &:hover {
          color: #C1D0D0;
          transform: scale(1.1);
        }
      }


      .navigation__background {
        position: absolute;
        max-height: 100vh;
        max-width: 100vw;
        inset: 0;
        opacity: 0;
        border-radius: 50%;
        background: map-get($colors , 'mainColor');
        z-index: 4;
        transition: all .8s cubic-bezier(0.86, 0, 0.07, 1);
      }

      .navigation__nav {
        position: fixed;
        inset: 0;
        max-width: 100vw;
        max-height: 100vh;
        opacity: 0;
        visibility: hidden;
        z-index: 4;
        transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) -.2s;
      }

      .navigation__list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 100%;
        height: 70%;
      }

      .navigation__item {
        margin: 2rem;
        padding: 1rem;
        position: relative;
      

        a {
          display: inline-block;
          width: 100%;
          text-decoration: none;
          color: map-get($colors , 'light');
          font-size: map-get($fontSizes , 'h5');
          font-weight: 600;
        }

        .dropdown {
          position: absolute;
          width: 100%;
          top: 120%;
          left: 0;
          margin: auto;
          background-color: map-get($colors , 'h2Blue' );
          border-radius: 2rem;
          transform: translateY(-1em);
          transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s;
          z-index: 2;

          >li {
            // margin: 1rem;
            padding: 1rem 0;
          }

          a {
            width: 100%;
            font-size: map-get($fontSizes , 'div');
            color: map-get($colors , 'dark' );
          }
        }
      }

      // menu字
      .navigation__link:link,
      .navigation__link:visited {
        display: inline-block;
        padding: 1rem 2rem;
        text-transform: uppercase;
        color: map-get($colors , 'light' );
        font-size: 2.4rem;
        text-decoration: none;
        transition: all .2s;

      }

      // menu字

      .navigation__checkbox:checked~.navigation__background {
        transform: scale(80);
        opacity: 1;
      }

      .navigation__checkbox:checked~.navigation__nav {
        width: 100%;
        visibility: visible;
        opacity: 1;
      }

      .navigation__icon {
        left: 50%;
        top: 30%;
        transform: translate(-50%, -30%);
        position: relative;
        margin: auto;

        &::before {
          top: -.7rem;
        }

        &::after {
          top: .7rem;
        }
      }



      .navigation__icon,
      .navigation__icon::before,
      .navigation__icon::after {
        height: 100%;
        width: 2rem;
        height: 2px;
        background-color: #eef6f7;
      }

      .navigation__icon::before,
      .navigation__icon::after {
        content: '';
        position: absolute;
        left: 0;
        transition: all 200ms;
      }


      //menu叉叉
      .navigation__checkbox:checked+.navigation__button .navigation__icon {
        background-color: transparent;
        box-shadow: none;
      }

      .navigation__checkbox:checked+.navigation__button .navigation__icon::before {
        top: 0;
        transform: rotate(135deg);
      }

      .navigation__checkbox:checked+.navigation__button .navigation__icon::after {
        top: 0;
        transform: rotate(-135deg);
      }
    }
  }
}
</style>
