<template>
  <div class="all-circle">
    <slot name="circle"></slot>
    <div class="circle-border">
      <div class="circle-core"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
};
</script>
<style scoped lang="scss">
.all-circle {
  position: relative;
  //   border: 1px red solid;
  display: flex;
  width: 300px;
  margin: -70px 100px;
  margin: 35% 15%;


  .circle-border {
    position: absolute;
    width: 250px;
    height: 250px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 2;
    background: rgb(63, 249, 220);
    background: linear-gradient(0deg,
        rgba(38, 101, 91, 0.1) 33%,
        rgb(133, 201, 161) 100%);
    animation: spin 4s linear 0s infinite;

    .circle-core {
      width: 100%;
      height: 100%;
      background-color: rgba(19, 67, 35, 1);
      border-radius: 50%;
    }
  }

  .text {
    position: absolute;
    color: white;
    left: 50%;
    top: 50%;
    translate: -50%;
    z-index: 20;
    // border: 1px red solid;
  }
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}

@media screen and (max-width:768px) {
  .all-circle {
    margin: -120px 30px;
  }
}
</style>
