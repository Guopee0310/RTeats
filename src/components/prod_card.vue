<template>
  <div class="select_btn">
    <prodSelect @transferClass="getClass" @transferPrice="getPrice" @transferSearch="searchClick"></prodSelect>
  </div>
  <div class="card" v-for="(i, index) in chooseItem" :key="i.imageSrc">
    <div class="heart">
      <heart @change-heart="changeHeart($event, i, index)" :keepLove="keepHeartArr[index]"
        :is-active="favList.findIndex((v) => v.favoName === i.titleName) > -1"></heart>
    </div>
    <div class="pic">
      <a href="#" @click.prevent="showProductDetails(i)"><img :src="i.imageSrc" alt="" /></a>
    </div>

    <div class="name">
      <a href="">{{ i.titleName }}</a>
    </div>
    <div class="info">
      <div class="cost">
        <span>NT {{ i.prodPrice }}</span>
      </div>
      <div class="prod_btn">
        <div class="num">
          <input type="button" value="–" @click="productDown(index)" />
          <input type="text" :value="i.count" size="1" />
          <input type="button" value="+" @click="i.count++" />
        </div>
        <div class="buy">
          <i class="fa-solid fa-cart-shopping" style="color: #9fbdce" @click.prevent="
            pushAndTogglePopup(i.imageSrc, i.titleName, i.count, i.prodPrice)
            "></i>
          <!-- pushInShoppingCart(
                  i.imageSrc,
                  i.titleName,
                  i.count,
                  i.prodPrice
                ) -->

          <cartpop />
        </div>
      </div>
    </div>
  </div>
  <!-- ↓↓↓ 商品彈窗 ↓↓↓ -->
  <transition name="fade">
    <div v-if="selectedProduct" class="modal">
      <div class="shadow" @click="closeModal"></div>
      <div class="modal-content">
        <div class="prod-content">
          <div class="prod-img">
            <img :src="selectedProduct.imageSrc" />
          </div>
          <div class="prod-info">
            <div>
              <h5>{{ $t(selectedProduct.titleName) }}</h5>
              <p>NT {{ $t(selectedProduct.prodPrice) }}</p>
            </div>
            <p>{{ $t(selectedProduct.info) }}</p>
          </div>
        </div>
        <div class="close" @click="closeModal">
          <i class="fa-solid fa-xmark" style="color: #062f4a"></i>
        </div>
      </div>
    </div>
  </transition>
  <!-- ↑↑↑ 商品彈窗 ↑↑↑ -->
  <Page :total="chooseItem2.length" @on-change="updatePage" class="changepage" v-if="showPage" />
</template>

<script>
import heart from "./heart.vue";
import prodSelect from "../components/select.vue";
import cartpop from "../components/cartPopup.vue";
import { mapMutations } from "vuex";
export default {
  name: "son",
  data() {
    return {
      cardsAll: [
        {
          imageSrc: require("../assets/images/dolphin_pillow.jpg"),
          titleName: "極舒適海豚抱枕",
          select: '極舒適海豚',
          prodPrice: "380",
          tag: "抱枕",
          count: 1,
          info: "海豚抱枕的介紹海豚抱枕的介紹海豚抱枕的介紹海豚抱枕的介紹",
        },
        {
          imageSrc: require("../assets/images/whaleshark_doll.png"),
          titleName: "Q版鯨鯊玩偶",
          select: 'Q版鯨鯊',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "Q版鯨鯊玩偶的介紹Q版鯨鯊玩偶的介紹Q版鯨鯊玩偶的介紹Q版鯨鯊玩偶的介紹Q版鯨鯊玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/dolphin_doll.png"),
          titleName: "超可愛海豚寶寶玩偶",
          select: '超可愛海豚寶寶',
          prodPrice: "399",
          tag: "玩偶",
          count: 1,
          info: "超可愛海豚寶寶玩偶的介紹超可愛海豚寶寶玩偶的介紹超可愛海豚寶寶玩偶的介紹超可愛海豚寶寶玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/shark_doll.jpg"),
          titleName: "愛睏a鯊鯊玩偶",
          select: '愛睏a鯊鯊',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "愛睏a鯊鯊玩偶的介紹愛睏a鯊鯊玩偶的介紹愛睏a鯊鯊玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/shark_keyring.jpg"),
          titleName: "QQ的鯊鯊鑰匙圈",
          select: 'QQ的鯊鯊鑰匙圈',
          prodPrice: "160",
          tag: "配飾",
          count: 1,
          info: "QQ的鯊鯊鑰匙圈的介紹QQ的鯊鯊鑰匙圈的介紹QQ的鯊鯊鑰匙圈的介紹",
        },
        {
          imageSrc: require("../assets/images/Nemo_doll.jpg"),
          titleName: "Nemo玩偶",
          select: 'Nemo',
          prodPrice: "299",
          tag: "玩偶",
          count: 1,
          info: "Nemo玩偶的介紹Nemo玩偶的介紹Nemo玩偶的介紹Nemo玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/sealion_doll.png"),
          titleName: "Q版海獅玩偶",
          select: 'Q版海獅',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "Q版海獅玩偶的介紹Q版海獅玩偶的介紹Q版海獅玩偶的介紹Q版海獅玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/shark_doll_2.png"),
          titleName: "Q版鯊鯊玩偶",
          select: 'Q版鯊鯊',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "Q版鯊鯊玩偶的介紹Q版鯊鯊玩偶的介紹Q版鯊鯊玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/loveing_garden_eel.png"),
          titleName: "戀愛ing花園鰻玩偶",
          select: '戀愛ing花園鰻',
          prodPrice: "399",
          tag: "玩偶",
          count: 1,
          info: "戀愛ing花園鰻玩偶的介紹戀愛ing花園鰻玩偶的介紹戀愛ing花園鰻玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/whale_doll.jpg"),
          titleName: "勾錐a小鯨魚玩偶",
          select: '勾錐a小鯨魚',
          prodPrice: "350",
          tag: "玩偶",
          count: 1,
          info: "勾錐a小鯨魚玩偶的介紹勾錐a小鯨魚玩偶的介紹勾錐a小鯨魚玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/lantern_fish_doll.jpg"),
          titleName: "貪吃燈籠魚玩偶",
          select: '貪吃燈籠魚',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "貪吃燈籠魚玩偶的介紹貪吃燈籠魚玩偶的介紹貪吃燈籠魚玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/pufferfish_doll.jpg"),
          titleName: "愛睏a河豚玩偶",
          select: '愛睏a河豚',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "愛睏a河豚玩偶的介紹愛睏a河豚玩偶的介紹愛睏a河豚玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/octopus_doll.jpg"),
          titleName: "老爺爺章魚玩偶",
          select: '老爺爺章魚',
          prodPrice: "399",
          tag: "玩偶",
          count: 1,
          info: "老爺爺章魚玩偶的介紹老爺爺章魚玩偶的介紹老爺爺章魚玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/sea_turtle_doll.jpg"),
          titleName: "勾錐a海龜玩偶",
          select: '勾錐a海龜',
          prodPrice: "399",
          tag: "玩偶",
          count: 1,
          info: "勾錐a海龜玩偶的介紹勾錐a海龜玩偶的介紹勾錐a海龜玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/killer_whale_doll.jpg"),
          titleName: "帥氣a虎鯨玩偶",
          select: '帥氣a虎鯨',
          prodPrice: "499",
          tag: "玩偶",
          count: 1,
          info: "帥氣a虎鯨玩偶的介紹帥氣a虎鯨玩偶的介紹帥氣a虎鯨玩偶的介紹帥氣a虎鯨玩偶的介紹",
        },
        {
          imageSrc: require("../assets/images/stingray_pillow.jpg"),
          titleName: "極舒適魟魚抱枕",
          select: '極舒適魟魚',
          prodPrice: "380",
          tag: "抱枕",
          count: 1,
          info: "極舒適魟魚抱枕的介紹極舒適魟魚抱枕的介紹極舒適魟魚抱枕的介紹",
        },
        {
          imageSrc: require("../assets/images/shark_pillow2.jpg"),
          titleName: "滿出來鯊鯊抱枕",
          select: '滿出來鯊鯊',
          prodPrice: "660",
          tag: "抱枕",
          count: 1,
          info: "滿出來鯊鯊抱枕的介紹滿出來鯊鯊抱枕的介紹滿出來鯊鯊抱枕的介紹",
        },
        {
          imageSrc: require("../assets/images/shark_pillow.jpg"),
          titleName: "極舒適鯊魚抱枕",
          select: '極舒適鯊魚',
          prodPrice: "499",
          tag: "抱枕",
          count: 1,
          info: "極舒適鯊魚抱枕的介紹極舒適鯊魚抱枕的介紹極舒適鯊魚抱枕的介紹",
        },
      ],
      chooseItem: [],
      pageSize: 8,
      selectFirst: false,
      priceFirst: false,
      chooseItem2: [],
      selectOption: "所有商品",
      getPriceOption: "價格",
      getPage: 1,
      keepHeartArr: [],
      searchInput: "",
      showModal: false,
      selectedProduct: null,
      showPage: true,
    };
  },
  mounted() {
    this.chooseItem = [...this.cardsAll];
    this.cardsAll.sort((a, b) => {
      return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    });
    this.chooseItem2 = this.cardsAll;
    this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    for (let i = 0; i < this.chooseItem2.length; i++) {
      this.keepHeartArr.push(true);
    }
    for (let i = 0; i < this.$store.state.favoList.length; i++) {
      this.keepHeartArr[this.$store.state.favoList[i].favIndex] = false;
    }
    this.getClass(this.selectOption);
    this.getPrice(this.getPriceOption);
  },
  props: {
    msg1: [String, Number],
  },
  components: {
    heart,
    prodSelect,
    cartpop,
  },
  computed: {
    favList() {
      return this.$store.state.favoList;
    },
  },
  methods: {
    // 商品彈窗 ----------------------------------
    showProductDetails(i) {
      this.selectedProduct = i;
    },
    closeModal() {
      this.selectedProduct = null;
    },
    // ------------------------------------------
    productDown(idx) {
      if (this.chooseItem[idx].count > 0) {
        this.chooseItem[idx].count--;
      }
    },
    pushInShoppingCart(img1, name1, count1, price1) {
      console.log([img1, name1, count1, price1]);
      if (!this.$store.state.userName) {
        alert("需先登入會員");
        return;
      }
      for (let i = 0; i < this.$store.state.shoppingCart.length; i++) {
        if (img1 === this.$store.state.shoppingCart[i].imgURL) {
          this.$store.state.shoppingCart[i].count += count1;
          return;
        }
      }
      this.$store.state.shoppingCart.push({
        imgURL: img1,
        name: name1,
        price: price1,
        count: count1,
        select: false,
      });
      console.log(this.$store.state.shoppingCart);
      //   imgURL: './image/seagull_tshirt.png',
      //   name: '海鷗T-Shirt',
      //   price: '680',
      //   count: 1,
    },
    // getClass(data) {
    //   this.selectOption = data;
    //   if (data == "所有商品") {
    //     this.chooseItem = this.cardsAll;
    //     if (this.getPriceOption == "由高到低") {
    //       this.chooseItem.sort((a, b) => {
    //         return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //       });
    //       this.chooseItem2 = this.chooseItem;
    //       this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //     } else if (this.getPriceOption == "由低到高") {
    //       this.chooseItem.sort((a, b) => {
    //         return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //       });
    //       this.chooseItem2 = this.chooseItem;
    //       this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //     } else if (this.getPriceOption == "") {
    //       this.chooseItem.sort((a, b) => {
    //         return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //       });
    //       this.chooseItem2 = this.chooseItem;
    //       this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //     }
    //   } else {
    //     this.chooseItem = [];
    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (this.cardsAll[i].tag === data) {
    //         this.chooseItem.push(this.cardsAll[i]);
    //         if (this.getPriceOption == "由高到低") {
    //           this.chooseItem.sort((a, b) => {
    //             return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //           });
    //           this.chooseItem2 = this.chooseItem;
    //           this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //         } else if (this.getPriceOption == "由低到高") {
    //           this.chooseItem.sort((a, b) => {
    //             return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //           });
    //           this.chooseItem2 = this.chooseItem;
    //           this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //         } else if (this.getPriceOption == "") {
    //           this.chooseItem.sort((a, b) => {
    //             return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //           });
    //           this.chooseItem2 = this.chooseItem;
    //           if (this.chooseItem.length >= this.pageSize) {
    //             this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // getPrice(data) {
    //   this.getPriceOption = data;
    //   if (!this.selectOption) {
    //     if (data == "由低到高") {
    //       this.cardsAll.sort((a, b) => {
    //         return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //       });
    //       this.chooseItem = this.cardsAll.slice(0, this.pageSize);
    //     } else if (data == "由高到低") {
    //       this.cardsAll.sort((a, b) => {
    //         return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //       });
    //       this.chooseItem = this.cardsAll.slice(0, this.pageSize);
    //     }
    //   } else if (this.selectOption == "所有商品") {
    //     this.chooseItem2 = this.cardsAll;
    //     this.chooseItem2.sort((a, b) => {
    //       return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //     });
    //     this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //   } else if (this.selectOption !== "所有商品") {
    //     this.chooseItem2 = [];
    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (this.cardsAll[i].tag === this.selectOption) {
    //         this.chooseItem2.push(this.cardsAll[i]);
    //       }
    //     }
    //     if (data == "由高到低") {
    //       this.chooseItem2.sort((a, b) => {
    //         return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //       });
    //       this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //     } else if (data == "由低到高") {
    //       this.chooseItem2.sort((a, b) => {
    //         return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //       });
    //       this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //     }
    //   }
    // },
    getClass(data) {
      this.selectOption = data;
      if (data === "所有商品") {
        this.chooseItem2 = this.cardsAll;
      } else {
        this.chooseItem2 = this.cardsAll.filter(
          (item) => item.tag === data
        );
      }
      this.showPage = false;
      setTimeout(() => {
        this.showPage = true;
      }, 100);
      this.getPage = 1;
      this.getPrice(this.getPriceOption);
      this.updatePage(1);
    },
    getPrice(data) {
      this.getPriceOption = data;
      if (data === "由低到高") {
        this.chooseItem2.sort((a, b) => parseInt(a.prodPrice) - parseInt(b.prodPrice));
        this.currentPage = 1;
      } else if (data === "由高到低") {
        this.chooseItem2.sort((a, b) => parseInt(b.prodPrice) - parseInt(a.prodPrice));
        this.getPage = 1;
      }
      this.showPage = false;
      setTimeout(() => {
        this.showPage = true;
      }, 100);
      this.updatePage(1);
    },

    searchClick(data) {
      const searchInput = data.toUpperCase();
      const res = this.cardsAll.filter((i) => {
        const search_content = i.titleName.toUpperCase();
        return search_content.includes(searchInput);
      });
      this.chooseItem2 = res;
      this.updatePage(1);
    },
    updatePage(data) {
      this.getPage = data;
      const optionStartIdx = (this.getPage - 1) * this.pageSize;
      const optionEndIdx = optionStartIdx + this.pageSize;
      console.log(optionStartIdx);
      console.log(optionEndIdx);
      console.log(this.chooseItem2);
      this.chooseItem = this.chooseItem2.slice(optionStartIdx, optionEndIdx);
    },
    changeHeart(isFav, i, index) {
      console.log(isFav, i, index);

      const favListIndex = this.favList.findIndex(
        (v) => v.favoName === i.titleName
      );
      if (favListIndex > -1) {
        this.$store.state.favoList.splice(favListIndex, 1);
      } else {
        this.$store.state.favoList.push({
          favoImg: i.imageSrc,
          favoName: i.titleName,
          favoPrice: i.prodPrice,
          favoIntroduction: i.info,
          favIndex: index,
        });
      }

      // for (let j = 0; j < this.$store.state.favoList.length; j++) {
      //   if (i.imageSrc == this.$store.state.favoList[j].favoImg) {
      //     return;
      //   }
      // }
      // if (!isFav && this.$store.state.userName) {
      //   this.$store.state.favoList.push({
      //     favoImg: i.imageSrc,
      //     favoName: i.titleName,
      //     favoPrice: i.prodPrice,
      //     favoIntroduction: i.info,
      //     favIndex: index,
      //   });
      // }
      console.log(this.$store.state.favoList);
      // TODO　ＣＡＬＬ　ＡＰＩ
      // if (isFav) {
      //   this.$store.state.favoList.push({
      //     favoImg: `require(${i.imageSrc})`,
      //     favoName: i.titleName,
      //     favoPrice: i.prodPrice,
      //     favoIntroduction: "",
      //   });
      // }
    },
    closeCartPopup() {
      // 延迟一秒后关闭购物车弹出视图
      setTimeout(() => {
        this.toggleCartPopup();
      }, 500); // 500毫秒（1秒）后关闭
    },
    // getClass(data) {
    //   this.chooseItem2 = [];
    //   this.selectOption = data;
    //   this.selectFirst = true;
    //   if (this.priceFirst && this.selectFirst) {
    //     this.priceFirst = false;

    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (data == "所有商品") {
    //         this.chooseItem2 = this.cardsAll;
    //         this.chooseItem = this.chooseItem2;
    //         console.log("301行成功觸發", this.cardsAll);
    //         // this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //       } else if (this.cardsAll[i].tag === data) {
    //         this.chooseItem2.push(this.cardsAll[i]);
    //         this.chooseItem = this.chooseItem2;
    //         // this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //       }
    //     }
    //   } else {
    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (data == "所有商品") {
    //         this.chooseItem2 = this.cardsAll;
    //         this.chooseItem = this.chooseItem2;
    //         // this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //       } else if (this.cardsAll[i].tag === data) {
    //         this.chooseItem2.push(this.cardsAll[i]);
    //         this.chooseItem = this.chooseItem2;
    //         // this.chooseItem = this.chooseItem2.slice(0, this.pageSize);
    //       }
    //     }
    //   }
    // },

    // getPrice(data) {
    //   this.priceFirst = true;
    //   this.getPriceOption = data;
    //   if (!this.selectFirst) {
    //     this.chooseItem2 = this.cardsAll;
    //     console.log("311行 直接篩選價錢的陣列", this.chooseItem2);
    //   } else {
    //     this.chooseItem2 = this.chooseItem;
    //     console.log(this.chooseItem2);
    //   }

    //   if (data === "由低到高") {
    //     this.chooseItem2.sort((a, b) => {
    //       return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //     });
    //   } else if (data === "由高到低") {
    //     this.chooseItem2.sort((a, b) => {
    //       return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //     });
    //   } else if (data === "價格") {
    //     this.chooseItem2 = this.cardsAll;
    //   }
    //   this.chooseItem = this.chooseItem2;
    //   // const optionStartIdx = (this.getPage - 1) * this.pageSize;
    //   // const optionEndIdx = optionStartIdx + this.pageSize;
    //   // console.log("起始位置", optionStartIdx);
    //   // console.log("結束位置", optionEndIdx);
    //   // this.chooseItem = this.chooseItem2.slice(optionStartIdx, optionEndIdx);
    // },
    // updatePage(page) {
    //   this.getPage = page;
    //   if (this.selectFirst && this.priceFirst) {
    //     this.chooseItem2 = [];

    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (this.selectOption == "所有商品") {
    //         this.chooseItem2 = this.cardsAll;
    //       } else if (this.cardsAll[i].tag === this.selectOption) {
    //         this.chooseItem2.push(this.cardsAll[i]);
    //       }
    //     }
    //     if (this.getPriceOption === "由低到高") {
    //       this.chooseItem2.sort((a, b) => {
    //         return parseInt(a.prodPrice) - parseInt(b.prodPrice);
    //       });
    //     } else if (this.getPriceOption === "由高到低") {
    //       this.chooseItem2.sort((a, b) => {
    //         return parseInt(b.prodPrice) - parseInt(a.prodPrice);
    //       });
    //     }
    //     const optionStartIdx = (page - 1) * this.pageSize;
    //     const optionEndIdx = optionStartIdx + this.pageSize;
    //     this.chooseItem = this.chooseItem2.slice(optionStartIdx, optionEndIdx);
    //   } else if (this.selectFirst) {
    //     const selectStartIdx = (page - 1) * this.pageSize;
    //     const selectEndIdx = selectStartIdx + this.pageSize;
    //     this.chooseItem2 = [];
    //     for (let i = 0; i < this.cardsAll.length; i++) {
    //       if (this.selectOption == "所有商品") {
    //         this.chooseItem2 = this.cardsAll;
    //       } else if (this.cardsAll[i].tag === this.selectOption) {
    //         this.chooseItem2.push(this.cardsAll[i]);
    //       }
    //     }
    //     console.log("起始位置", selectStartIdx);
    //     console.log("結束位置", selectEndIdx);
    //     console.log("複製的陣列", this.chooseItem2);
    //     this.chooseItem = this.chooseItem2.slice(selectStartIdx, selectEndIdx);
    //     console.log(this.chooseItem2);
    //   } else {
    //     const startIdx = (page - 1) * this.pageSize;
    //     const endIdx = startIdx + this.pageSize;
    //     this.chooseItem = this.cardsAll.slice(startIdx, endIdx);
    //   }
    // },
    ...mapMutations(["toggleCartPopup"]),
    pushAndTogglePopup(imageSrc, titleName, count, prodPrice) {
      // 添加商品到购物车
      this.pushInShoppingCart(imageSrc, titleName, count, prodPrice);

      // 切换购物车弹出视图的显示状态
      if (this.$store.state.userName) {
        this.toggleCartPopup();
        this.closeCartPopup();
      }
    },
  },
};
</script>
<style scoped lang="scss">
.card {
  width: calc((100% / 4) - 20px);
  // margin: 0 0 50px;
  margin: 0 10px 50px;
  display: flex;
  flex-wrap: wrap;

  .heart {
    margin: 0 0 -50px auto;
    padding: 0 5px;
    z-index: 2;
  }

  .pic {
    width: 280px;
    height: 280px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.2);
  }

  .pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
    transform: scale(1);
    transition: 0.7s;
  }

  .pic img:hover {
    transition: 0.7s;
    transform: scale(1.1);
  }

  .name {
    font-size: 17px;
    letter-spacing: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 1.5;
    font-family: Gowun Batang, "Times New Roman", Times, NotoSerifCJKtc-Regular,
      serif;
    color: #333;
  }

  .name a {
    text-decoration: none;
    color: #333;
    transition: 0.3s;
    font-size: Gowun Batang, "Times New Roman", Times, NotoSerifCJKtc-Regular,
      serif;
    display: block;
  }

  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .prod_btn {
    display: flex;
  }

  .num input {
    width: 27px;
    border: 0;
    text-align: center;
    background-color: #9fbdce;
    font-size: 15px;
  }

  .num input:first-child {
    border-radius: 15px 0 0 15px;
    cursor: pointer;
  }

  .num input:last-child {
    border-radius: 0 15px 15px 0;
    cursor: pointer;
  }

  .buy {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .buy i {
    font-size: 17px;
  }

  .buy .fa-cart-shopping {
    width: 12px;
  }

  .buy:hover .fa-plus {
    display: none;
  }

  .buy:hover .fa-cart-shopping {
    display: inline-block;
  }

  .buy:hover {
    background-color: #eee;
  }

  .name a:hover {
    color: #c48710;
    transition: 0.2s;
  }

  .buy img:nth-child(1):hover {
    transition: 0.2s;
    opacity: 0;
  }
}

.select_btn {
  width: 1200px;
  margin: 50px auto;
  display: flex;
  justify-content: end;
}

.changepage {
  width: 1200px;
  text-align: center;
  margin-bottom: 20px;
}

@media screen and (max-width: 768px) {
  .select_btn {
    width: 100%;
    justify-content: center;
  }

  .card {
    width: 40%;
    margin: 0 30px 50px;

    .heart {
      margin: 0 30px -50px auto;
    }
  }
}

.modal {
  // display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // 彈窗背景亮度
  z-index: 10;
  justify-content: center;
  align-items: center;

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
    /* 在蓋板下面 */
  }

  .modal-content {
    width: 1000px;
    height: 400px;
    margin: 0 auto;
    border: 0;
    border-radius: 5px;
    text-align: center;
    background-color: rgba(40, 61, 84, 0.8);
    padding: 20px;
    position: relative;
    top: 100px;
    display: flex;
    align-items: center;
  }

  .close {
    width: 45px;
    height: 45px;
    background-color: #93B7CD;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    position: absolute;
    top: -20px;
    right: -20px;

    i {
      line-height: 45px;
      font-size: 30px;
    }
  }

  .prod-content {
    width: 90%;
    height: 90%;
    margin: 0 auto;
    // border: 1px solid #333;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .prod-img {
    margin-right: 20px;
    width: 40%;
    height: 80%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0;
      border-radius: 15px;
    }
  }

  .prod-info {
    width: 40%;
    height: 80%;
    text-align: justify;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    h5 {
      color: map-get($colors, "light");
    }

    p {
      color: map-get($colors, "light");
      font-size: map-get($fontSizes, "p");
    }

    >p {
      margin-top: 30px;
      line-height: 40px;
    }
  }
}

// 彈窗顯示與隱藏延遲動畫效果
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .modal {
    .modal-content {
      width: 700px;
      top: 60px;
    }
  }

  .changepage {
    width: 100%;
  }
}

@media screen and (max-width: 414px) {
  .card {
    margin: 0 15px 50px;

    .pic {
      width: 160px;
      height: 160px;
    }

    .prod_btn {
      display: none;
    }

    .heart {
      margin: 0 0 -50px auto;
    }
  }

  .modal {
    .modal-content {
      width: 80%;
      top: 60px;
      padding: 0;
    }

    .prod-content {
      flex-direction: column;
    }

    .prod-img {
      height: 180px;
      width: 180px;
      margin: 0;
    }

    .prod-info {
      width: 80%;
      margin-top: 10px;

      >p {
        margin-top: 10px;
        line-height: 30px;
      }
    }
  }

  .changepage {
    width: 100%;
  }
}
</style>
