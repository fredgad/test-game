<template>
    <section class="metrix">
        <div class="steps">
          <p>Шагов</p>
          <div>{{ get.steps }}</div>
        </div>
        <div class="timer">
          <p>Таймер</p>
          <div>{{ get.timer }}</div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store/store'

export default {
    name: 'Metrix',
    computed: {
        ...mapGetters(['get'])
    }
}
</script>

<style lang="scss" scoped>
.metrix {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .steps, .timer {

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      padding: 0 20px;
      box-shadow:  inset 3px 3px 5px 3px #222, inset -3px -3px 5px 3px #222;
      margin: 0 20px;
      font-weight: 900;
      font-size: 20px;
    }
  }
}
</style>