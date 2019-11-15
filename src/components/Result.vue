<template>
    <section class="result" v-show="get.win">
      <h1>Победа!</h1>
      <div class="steps">
        <p>Шаги</p>
        <div>{{ get.steps }}</div>
      </div>
      <div class="timer">
        <p>Время</p>
        <div>{{ get.timer }}</div>
      </div>
    </section>
</template>
 
<script>
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
    name: 'Result', 
    computed: {
        ...mapGetters(['get'])
    }
}

</script>

<style lang="scss" scoped>
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 28px;
  }
  > div {
    display: flex;
    width: 220px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
  }
}
</style>