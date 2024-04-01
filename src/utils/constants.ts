import {NavLink} from "../models/components.ts";

export const navLinks: NavLink[] = [
    {title: 'Подтвержденные бронирования', path: '/', show: (role) => role === 'admin'},
    {title: 'Добавить бронирование', path: '/add-booking', show: (role) => role === 'admin'},
    {title: 'Заявки', path: '/requests', show: (role) => role === 'admin'},
    {title: 'Информация о ресторане', path: '/info', show: (role) => role === 'admin'},
    {title: 'Добавить учетную запись', path: '/add-user', show: (role) => ['superadmin', 'admin'].includes(role)},
    {title: 'Статистика', path: '/stats', show: (role) => role === 'admin'},
    {title: 'Все рестораны', path: '/restaurants', show: (role) => role === 'superadmin'},
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
