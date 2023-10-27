<template>
  <div class="words">
  <p>{{ $t('RTeats') }}</p>
  <p>{{ $t('今天吃什麼') }}</p>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() { },
  methods: {},
};
</script>

<style scoped lang="scss">
body {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  position: relative;
}
.words{
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 50%;
}
p {
  position: relative;
  //   font-family: sans-serif;
  // text-transform: uppercase;
  font-size: 1.5em;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), #4c1a1a, rgba(255, 255, 255, 0));
  background-repeat: no-repeat;
  background-size: 80%;
  font-weight: 400;
  animation: animate 5s linear infinite;
  background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -300%;
  }

  100% {
    background-position: 300%;
  }
}

@media screen and (max-width:415px) {
  p {
    font-size: 0.5em;
  }
}
</style>
