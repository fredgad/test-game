import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 
 
const store = new Vuex.Store({
        state: {
            verticalValue: 4,
            gorisontalValue: 4,
            array: [],
            keyArray: [],
            timer: 0,
            steps: 0,
            win: false,
            timerCheck: true,
            styles: '' 
        },
        mutations: { 
            setArray: (state) => { 
                // Обнуление стейта
                state.win = false
                state.steps = 0
                state.timer = 0
                state.timerCheck = true,
                state.array = [] 
                state.keyArray = []
                state.styles = ''

                const leftSpace = 100 / state.verticalValue, 
                      topSpace = 100 / state.gorisontalValue; 
                let   left = 0,
                      top = 0;

                // Запуск таймера
                const seconds = setInterval(() => {
                    if(!state.timerCheck) {
                        clearInterval(seconds)  
                    }
                    state.timer++
                },1e3)

                // Создание массивов
                for(let x = 1; x <= (state.verticalValue * state.gorisontalValue); x++) {
                    state.array.push('_' + x)
                    state.keyArray.push(x)
                }
                // // Перемешивание массива
                const sliced = state.keyArray.pop()
                for (let x = 0; x < state.keyArray.length; x++) {
                    let y = Math.trunc(Math.random() * state.keyArray.length);
                    let cont = state.keyArray[x];
                    state.keyArray[x] = state.keyArray[y]
                    state.keyArray[y] = cont;
                }
                state.keyArray.push(sliced)

                // Занесение стилей в переменную
                state.array.map((el, i) => {
                    state.styles += `.${el}{
                        left: ${left}%; 
                        top: ${top}%}`

                    if((i+1) % state.verticalValue) {
                        left += leftSpace
                    } else {
                        top += topSpace
                        left = 0 
                    }
                })

                // Установка стилей в тег style
                document.querySelector('.contSize').innerHTML = `
                .container { 
                    width: ${10*state.verticalValue}vh;
                    height: ${10*state.gorisontalValue}vh;
                }
                ${state.styles}`; 

                // Установка невидимого элемента
                setTimeout(()=> {
                    document.querySelector(`._${state.gorisontalValue * state.verticalValue}`)
                    .setAttribute('data-invis','true') 
                },0) 
            },
            // Установка количества клеточек
            setIncrementVertical: (state) => { if(state.verticalValue < 7)  state.verticalValue++ },
            setDecrementVertical: (state) => { if(state.verticalValue > 3)  state.verticalValue-- },
            setIncrementGorisontal: (state) => { if(state.gorisontalValue < 7)  state.gorisontalValue++ },
            setDecrementGorisontal: (state) => { if(state.gorisontalValue > 3)  state.gorisontalValue-- },   
        }, 
        actions: {
            // При нажатии на игровую клетку
            step: (ctx) => {
                let target = event.target,
                    targetClass = target.className,
                    invisItem = document.querySelector('[data-invis]'),
                    invisClass = invisItem.className;
                
                //  Горизонтальный сдвиг
                if(+targetClass.replace('_','')  === +invisClass.replace('_','') - 1) {
                    if(+targetClass.replace('_','') % ctx.state.verticalValue) {
                        target.className = invisItem.className
                        invisItem.className = targetClass
                        ctx.state.steps++
                    }
                }

                //  Вертикальный сдвиг
                if(+targetClass.replace('_','')  === +invisClass.replace('_','') + 1) {
                    if((+targetClass.replace('_','') - 1) % ctx.state.verticalValue) {
                        target.className = invisItem.className
                        invisItem.className = targetClass
                        ctx.state.steps++
                    }
                }
                if(+targetClass.replace('_','')  === +invisClass.replace('_','') - ctx.state.verticalValue ||
                +targetClass.replace('_','')  === +invisClass.replace('_','') + ctx.state.verticalValue) {
                    target.className = invisItem.className
                    invisItem.className = targetClass
                    ctx.state.steps++
                }

                //Проверка на победу 
                const boxes =  document.querySelector('.container').children;
                const winGame = Array.from(boxes).every((el) => {
                    return +el.getAttribute('data-key') === +el.className.replace('_', '')
                })
                if(winGame) { // Если победа
                    ctx.state.win = true
                    location.href = './#/menu'
                    ctx.state.timerCheck = false
                }
            },
            // Остановить таймер
            timerStop: (ctx) => {
                ctx.state.timerCheck = false
            }
        },
        getters: {
            get(state) {
                return state
            }
        }
});

export default store