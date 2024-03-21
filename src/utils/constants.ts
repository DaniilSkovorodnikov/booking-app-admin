import {NavLink} from "../models/components.ts";

export const navLinks: NavLink[] = [
    {title: 'Подтвержденные бронирования', path: '/'},
    {title: 'Добавить бронирование', path: '/add-booking'},
    {title: 'Заявки', path: '/requests'},
    {title: 'Информация о ресторане', path: '/info'},
    {title: 'Добавить учетную запись', path: '/add-user'},
    {title: 'Статистика', path: '/stats'},
]

export const months = [
    {name: "Январь", declinedName: "января"},
    {name: "Февраль", declinedName: "февраля"},
    {name: "Март", declinedName: "марта"},
    {name: "Апрель", declinedName: "апреля"},
    {name: "Май", declinedName: "мая"},
    {name: "Июнь", declinedName: "июня"},
    {name: "Июль", declinedName: "июля"},
    {name: "Август", declinedName: "августа"},
    {name: "Сентябрь", declinedName: "сентября"},
    {name: "Октябрь", declinedName: "октября"},
    {name: "Ноябрь", declinedName: "ноября"},
    {name: "Декабрь", declinedName: "декабря"}
]
