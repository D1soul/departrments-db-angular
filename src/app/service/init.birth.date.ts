
export function InitBirthDate(days =[], months =[], years =[]){
  let date = new Date();
    for (let i: number = 1; i <= 31; i++) {
      let day: string = i.toString();
      if (i < 10) {
        day = '0' + day;
      }
      days.push(day);
    }

    months.push(
      {id: 1, name: 'января'},
      {id: 2, name: 'февраля'},
      {id: 3, name: 'марта'},
      {id: 4, name: 'апреля'},
      {id: 5, name: 'мая'},
      {id: 6, name: 'июня'},
      {id: 7, name: 'июля'},
      {id: 8, name: 'августа'},
      {id: 9, name: 'сентября'},
      {id: 10, name: 'октября'},
      {id: 11, name: 'ноября'},
      {id: 12, name: 'декабря'}
    );

    for (let i = date.getFullYear(); i > (date.getFullYear() - 100); i--) {
      years.push(i);
    }
}
