
export function InitDateFunction(days =[], months =[], years =[]){
  let date = new Date();
  for (let i: number = 1; i <= 31; i++) {
    let day: string = i.toString();
    if (i < 10) {
      day = '0' + day;
    }
    days.push(day);
  }

  months.push('января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
         'июля','августа', 'сентября', 'октября', 'ноября','декабря'
  );

  for (let i = date.getFullYear(); i > (date.getFullYear() - 100); i--) {
    years.push(i);
  }
}
