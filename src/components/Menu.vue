<template>
    <section class="menu">
        <Result v-show="get.win" />
 
        <div class="options">
            <p>Вертикально</p>           
            <div class="gorisontal">
                <div class="gorisontal__minus" @click="setDecrementGorisontal"><p>-</p></div>
                <span class="gorisontal__value">{{ get.gorisontalValue }}</span>
                <div class="gorisontal__plus" @click="setIncrementGorisontal"><p>+</p></div>
            </div>
            <p>Горизонтально</p> 
            <div class="vertical">
                <div class="vertical__minus" @click="setDecrementVertical"><p>-</p></div>
                <span class="vertical__value">{{ get.verticalValue }}</span>
                <div class="vertical__plus" @click="setIncrementVertical"><p>+</p></div>
            </div>
        </div>

        <router-link to="/game"><div class="playButton" @click="setArray">Играть</div></router-link> 
    </section>
</template>
 
<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../store/store'
import Result from './Result.vue'

export default {
    name: 'menu',
    components: {
        Result
    },
    computed: {
        ...mapGetters(['get'])
    },
    methods: {
        ...mapMutations([
            'setTimers', 
            'setArray', 
            'setIncrementVertical', 
            'setDecrementVertical', 
            'setIncrementGorisontal', 
            'setDecrementGorisontal' 
        ]),
    }
}

</script>

<style lang="scss" scoped>
.menu {
    display: flex;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid grey;
    padding: 20px;
    border-radius: 20px;
    transition: .7s;
    font-family: Roboto, sans-serif;
    text-align: center;

    .options {
        display: flex;
        flex-direction: column;
        width: 300px;
        justify-content: center;
        align-items: center;


        .gorisontal, .vertical { 
            display: flex;
        }
        > div {

            span {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                width: 50px;
                box-shadow:  inset 3px 3px 5px 3px #222, inset -3px -3px 5px 3px #222;
                margin: 0 20px;
                font-weight: 900;
                font-size: 20px;
            }
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                width: 50px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 7px #222, inset -3px -3px 5px 3px #222;
                transition: .4s;
                font-weight: 900;
                font-size: 20px;
                cursor: pointer;
                padding-top: 0px;
                
                p {
                    transition: .4s;
                    transform: translate(-2.25px, -2.25px)
                }
            }
            div:hover {
                box-shadow: 0 0 0px #222, inset 3px 3px 5px 3px #222;
            }
            div:hover p {
                transform: translate(2.25px, 2.25px)
            }
        }   
        .vertical {
        
            .vertical__plus {
                cursor: pointer;
            }
        }  
    }

    a {
        text-decoration: none;
         div {
                border-radius: 20px;
                border: 2px solid grey;
                padding: 10px;
                margin-top: 20px;
                color: #222;
                font-size: 24px;
                transition: .7s;
         }
         div:hover {
            transform: scale(1.1);
            box-shadow: 1px 3px 5px 3px #222;
         }
    }

}
.menu:hover {
    transform: scale(1.1);
    box-shadow: 1px 3px 5px 3px #222;
    
}
</style>