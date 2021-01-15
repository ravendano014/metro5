import Datetime from "../type";

Datetime.registerLocale("bg", {
    months: "Януари_Февруари_Март_Април_Май_Юни_Юли_Август_Септември_Октомври_Ноември_Декември".split("_"),
    monthsShort: "Янр_Фев_Мар_Апр_Май_Юни_Юли_Авг_Сеп_Окт_Ное_Дек".split("_"),
    weekdays: "Неделя_Понеделник_Вторник_Сряда_Четвъртък_Петък_Събота".split("_"),
    weekdaysShort: "Нед_Пон_Вто_Сря_Чет_Пет_Съб".split("_"),
    weekdaysMin: "Нд_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
    weekStart: 1
});
