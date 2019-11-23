<template>
    <section class="game">
        <div class="metrix">
            <div class="steps">
              <p>Шагов</p>
              <div>{{ props.steps }}</div>
            </div>
            <div class="timer">
              <p>Таймер</p>
              <div>{{ props.timer }}</div>
            </div>
        </div>
        <transition-group tag="div" class="container">  
            <div v-for="(el, i) of props.array"  
            :key="el"
            :data-key="el"
            :class="`_${i+1}`"
            @click="props.makeStep()" >
               {{ el+1 }}    
            </div> 
        </transition-group>
        <span>
            <div class="menuButton" @click="props.startGame()">Заново</div>
        </span>
    </section>
</template>

<script>
export default {
    name: 'game', 
    props: ['props']
}
</script>

<style lang="scss" scoped>
.game {
    font-family: Roboto, sans-serif;
    text-align: center;

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
    .container {
        display: flex;
        position: relative;
        box-shadow: inset -1px -1px 5px 3px #222, inset 1px 1px 5px 3px #222;
        padding: 10px;
        box-sizing: border-box;
        font-size: 20px;
        font-weight: 700;
        width: 48vh;
        height: 48vh;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;
    
        ._1{left: 0%; top: 0%}
        ._2{left: 25%; top: 0%}
        ._3{left: 50%; top: 0%}
        ._4{left: 75%; top: 0%}
        ._5{left: 0%; top: 25%}
        ._6{left: 25%; top: 25%}
        ._7{left: 50%; top: 25%}
        ._8{left: 75%; top: 25%}
        ._9{left: 0%; top: 50%}
        ._10{left: 25%; top: 50%}
        ._11{left: 50%; top: 50%}
        ._12{left: 75%; top: 50%}
        ._13{left: 0%; top: 75%}
        ._14{left: 25%; top: 75%}
        ._15{left: 50%; top: 75%} 
        ._16{left: 75%; top: 75%}
        [data-key="15"] {
            z-index: -1; 
            opacity: 0
        }
        > div {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12vh;
            height: 12vh; 
            transition: all .5s;
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
    .menuButton {
        border-radius: 20px;
        border: 2px solid grey;
        padding: 10px;
        margin-top: 20px;
        color: #222;
        font-size: 24px;
        transition: .7s;
        cursor: pointer;
    }
    .menuButton:hover {
       transform: scale(1.1);
       box-shadow: 1px 3px 5px 3px #222;
    }
}
</style>