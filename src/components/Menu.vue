<template>
    <section id="menu">
        <div v-if="!props.firstStartCheck" class="result">
            <h1>Победа!</h1>
            <div class="steps">
                <p>Шаги</p>
                <div>{{ props.steps }}</div>
            </div>
            <div class="timer">
                <p>Время</p>
                <div>{{ props.timer }}</div>
            </div>
        </div>
        <h1 v-else>Пятнашки</h1> 
        
        <div v-if="props.firstStartCheck" class="playButton"  @click="props.firstStart()">Играть</div>
        <div v-else class="playButton" @click="props.startGame()">Ещё раз</div>
    </section>
</template>
 
<script>
export default {
    name: 'Menu',
    props: ['props']
}
</script>

<style lang="scss" scoped>
#menu {
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
    width: 300px;   

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
    .playButton {
           border-radius: 20px;
           border: 2px solid grey;
           padding: 10px;
           margin-top: 20px;
           color: #222;
           font-size: 24px;
           transition: .7s;
           cursor: pointer;
    }
    .playButton:hover {
       transform: scale(1.1);
       box-shadow: 1px 3px 5px 3px #222;
    }
}
.menu:hover {
    transform: scale(1.1);
    box-shadow: 1px 3px 5px 3px #222;
}
</style>