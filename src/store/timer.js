/**
 * Универсальный таймер версии 1.0
 * для вызова таймера необходимо вызвать startTime(id,[object])
 * id - передаем контейнер в котором будет отображаться таймер
 * [object] - передача настроек таймера в обьекте где:
 * template - шаблон таймера куда перетается "template string" в который нужно указать кроме верстки, метку похожую на интерполяцию {{timer}}
 * {{timer}} - контейнер с таймером.
 * deleteTimer - удалить по окончании, по умолчанию false
 * endDate - передать дату при котором таймер остановится в формате "2050-01-01 01:01".
 * timerReverse по умолчанию true, таймер обратного отсчета.
 * idTimer - id для таймера
 */
class InstrumtorgTimer {
  constructor() {
    this.startTimer = (id, obj) => {
      const htmlContainer = document.getElementById(id);
      const {
        endDate,
        deleteTimer = false,
        timerReverse = true,
        template,
        idTimer
      } = obj;
      const typeTimer = timerReverse ? this.getDateReverse : this.getDateNormal; // проверка timer reverse
      const containerTimer = this.createDOMContainer(
        typeTimer,
        endDate,
        this.dateParse,
        idTimer,
        deleteTimer,
        htmlContainer
      );
      this.renderDomElementDate
        ? this.renderDomElementDate(htmlContainer, template, containerTimer)
        : null;
    };
  }

  dateParse(dateString) {
    const str = dateString.replace(
      /^(.*-[0-9][0-9])(\ )([0-9][0-9]\:.*$)/,
      "$1T$3"
    );
    return Date.parse(str) - Date.now();
  }

  getDateReverse(endTime, dateParse) {
    const total = dateParse(endTime);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return [
      {
        days: days < 10 ? "0" + days : "" + days,
        hours: hours < 10 ? "0" + hours : "" + hours,
        minutes: minutes < 10 ? "0" + minutes : "" + minutes,
        seconds: seconds < 10 ? "0" + seconds : "" + seconds
      },
      total
    ];
  }

  getDateNormal(endTime, dateParse) {
    const date = new Date();
    const total = dateParse(endTime) - date.getMilliseconds();
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return [
      {
        days: days < 10 ? "0" + days : "" + days,
        hours: hours < 10 ? "0" + hours : "" + hours,
        minutes: minutes < 10 ? "0" + minutes : "" + minutes,
        seconds: seconds < 10 ? "0" + seconds : "" + seconds
      },
      total
    ];
  }

  createDOMContainer(
    typeTimer,
    endTime,
    dateParse,
    idTimer,
    deleteTimer,
    htmlContainer
  ) {
    const container = {
      elements: {
        days: {
          firstSpan: document.createElement("span"),
          lastSpan: document.createElement("span")
        },
        hours: {
          firstSpan: document.createElement("span"),
          lastSpan: document.createElement("span")
        },
        minutes: {
          firstSpan: document.createElement("span"),
          lastSpan: document.createElement("span")
        },
        seconds: {
          firstSpan: document.createElement("span"),
          lastSpan: document.createElement("span")
        }
      },
      uploadSpan() {
        const arr = [];
        let i = 0;
        for (const key in this.elements) {
          arr[i] = document.createElement("div");
          arr[i].insertAdjacentElement(
            "beforeend",
            this.elements[key].firstSpan
          );
          arr[i].insertAdjacentElement(
            "beforeend",
            this.elements[key].lastSpan
          );
          i++;
        }
        return arr;
      },

setNumber: function(array, prevArray = true) {
        let i = 0;
        if (prevArray === true) {
          for (const key in this.elements) {
            this.elements[key].firstSpan.innerText = array[i][0];
            this.elements[key].lastSpan.innerText = array[i][1];
            i++;
          }
          return;
        }

        for (const key in this.elements) {
          // сравниваем предыдущее состояние с настоящим.
          if (array[i][0] != prevArray[i][0]) {
            this.elements[key].firstSpan.innerText = array[i][0];
          }
          if (array[i][1] != prevArray[i][1]) {
            this.elements[key].lastSpan.innerText = array[i][1];
          }
          i++;
        }
      }
    };

    const divTimer = document.createElement("div");
    divTimer.id = idTimer;
    for (const iterator of container.uploadSpan()) {
      divTimer.insertAdjacentElement("beforeend", iterator);
    }

    container.setNumber(Object.values(typeTimer(endTime, dateParse)[0]));
    let prevArray = [...Object.values(typeTimer(endTime, dateParse)[0])];

    let idSetInterval = setInterval(() => {
      container.setNumber(
        Object.values(typeTimer(endTime, dateParse)[0]),
        prevArray
      );
      prevArray = [...Object.values(typeTimer(endTime, dateParse)[0])];

      if (deleteTimer && typeTimer(endTime, dateParse)[1] <= 1000) {
        this.removeTimer.call(this, htmlContainer);
      }
      if (typeTimer(endTime, dateParse)[1] <= 1000) {
        clearInterval(idSetInterval);
      }
    }, 1000);

    if (deleteTimer && typeTimer(endTime, dateParse)[1] <= 1000) {
      this.removeTimer(htmlContainer);
    }
    if (typeTimer(endTime, dateParse)[1] <= 1000) {
      clearInterval(idSetInterval);
    }

    return divTimer;
  }

  removeTimer(htmlContainer) {
    this.renderDomElementDate = null;
    htmlContainer.innerHTML = "";
  } 

  renderDomElementDate(id, template, containerTimer) {
    const arr = [];
    arr[0] = template.slice(0, template.indexOf("{{"));
    arr[1] = template.slice(template.indexOf("}}") + 2);
    const divId = "suhudhasauyhdashsh827283782728482191294910";
    const elem = `${arr[0]}<div style="position: absolute;" id="${divId}"></div>${arr[1]}`;
    id.insertAdjacentHTML("beforeend", elem);
    const divPoint = id.querySelector("#" + divId);
    divPoint.insertAdjacentElement("afterend", containerTimer);
    if (typeof divPoint.remove === 'function') {
      divPoint.remove();
    } else {
      divPoint.parentNode.removeChild(divPoint);
    }
  }
}

const timer = new InstrumtorgTimer();

timer.startTimer("timer", { 
  deleteTimer: true, // удалить по окончании, по умолчанию false
  endDate: "2019-11-15 10:54", // передать дату при котором таймер остановится в формате "2050-01-01 01:01".
  timerReverse: true, // по умолчанию true, таймер обратного отсчета.
  idTimer: "instrumtorg-timer", // id для таймера
  template: `
  <div class="black-friday-banner">
  <div class="black-friday-banner__title">
  До конца акции осталось
  </div>
    {{timer}}
  <div class="date-descr">
        <div class="date-title">дней</div>
        <div class="date-title">часов</div>
        <div class="date-title">минут</div>
        <div class="date-title">секунд</div>
    </div>
  </div>
` // шаблон таймера куда перетается "template string" в который нужно указать кроме верстки, метку похожую на интерполяцию {{timer}}
});