<template>
    <div>
        <Menu v-if="win" :props="{array, timer, steps, startGame, firstStart, firstStartCheck}" />
        <Game v-else :props="{array, timer, steps, startGame, makeStep}" />
    </div>
</template>

<script>
import Game from './Game.vue'
import Menu from './Menu.vue'

export default {
    name: 'app',
    components: {
        Game, Menu
    },
    data() {
        return {
            invis: 15,
            array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
            timer: 0,
            steps: 0,
            win: true,
            firstStartCheck: true,
            timerCheck: true,
        }
    },
    methods: {
        firstStart() { // Первый запуск
            this.firstStartCheck = false
            this.startGame()
            this.timerStart()
        },
        startGame() { // Запуск игры
            this.win = false // Обнуление стейта
            this.array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
            this.steps = 0
            this.timer = 0
            this.timerCheck = true

            this.changeArray()
        },
        makeStep() { // При нажатии на игровую клетку
            let target = event.target.getAttribute('data-key'),
                targetPos = this.array.indexOf(+target),
                invisPos = this.array.indexOf(this.invis);

            if (targetPos === invisPos + 1 || targetPos === invisPos - 1 ||  // Горизонтальная проверка
                targetPos === invisPos + 4 || targetPos === invisPos - 4 ) { // Вертикальная проверка
                    let pos1 = this.array.splice(targetPos, 1, this.array[invisPos])
                    this.array[invisPos] = pos1[0]
                    this.steps++
                    this.winCheck()
            }
        },   
        changeArray() { // Перемешать массив
            const sliced = this.array.pop()
            for (let x = 0; x < this.array.length; x++) {
                let y = Math.trunc(Math.random() * this.array.length),
                    cont = this.array[x];
                this.array[x] = this.array[y]
                this.array[y] = cont;
            }
            this.array.push(15)
        },
        winCheck() { // Проверка на победу 
            const winGame = this.array.every((el, i) => el === i)
            if(winGame) { // Если победа
                this.win = true
                this.timerCheck = false
            }
        },
        timerStart() { // Запуск таймера
            const time = setInterval(() => {
                if(this.timerCheck) { this.timer++ }
            },1e3);
        }
    },
}
</script>