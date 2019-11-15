<template>
    <section class="game">
        <Metrix /> 
        <div class="container"> 
            <div v-for="(el, i) of get.array" 
            :class="el" 
            :data-key="get.keyArray[i]"
            @click="step()" >
               {{ get.keyArray[i] }}   
            </div> 
        </div>
        <span>
            <router-link to="/menu"><div class="menuButton" @click="timerStop">Меню</div></router-link>
        </span>
    </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import store from '../store/store'
import Metrix from './Metrix.vue'

export default {
    name: 'game', 
    components: {
        Metrix
    },
     computed: {
        ...mapGetters(['get'])
    },
    methods: {
        ...mapMutations(['setArray']),
        ...mapActions(['step', 'timerStop']),
    }
}
</script>

<style lang="scss" scoped>
.game {
    font-family: Roboto, sans-serif;
    text-align: center;

    .container {
        display: block;
        position: relative;
        box-shadow: inset -1px -1px 5px 3px #222, inset 1px 1px 5px 3px #222;
        padding: 10px;
        box-sizing: border-box;
        font-size: 20px;
        font-weight: 700;
    
        > div {
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10vh;
            height: 10vh; 
            transition: .6s;
            cursor: pointer;
            
        }
        > div::before {
            content: '';
            z-index: -1;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 70%;
            width: 70%;
            box-shadow: 0 0 7px #222, inset -2px -2px 3px #222;
            background: #fff;
            font-size: 20px;
            font-family: Roboto, sans-serif;
        }
        > div:hover {
            transform: scale(1.08)
        }
    }
    a {
        text-decoration: none;

        .menuButton {
            border-radius: 20px;
            border: 2px solid grey;
            padding: 10px;
            margin-top: 20px;
            color: #222;
            font-size: 24px;
            transition: .7s;
        }
        .menuButton:hover {
           transform: scale(1.1);
           box-shadow: 1px 3px 5px 3px #222;
        }
    }
      
}
</style>