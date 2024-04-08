import {NavLink} from "../models/components.ts";
import {Roles} from "./enums.ts";

export const navLinks: NavLink[] = [
    {
        title: 'Подтвержденные бронирования',
        path: '/',
        show: (role: Roles) => [Roles.Staff, Roles.Admin].includes(role)
    },
    {
        title: 'Добавить бронирование',
        path: '/add-booking',
        show: (role: Roles) => [Roles.Staff, Roles.Admin].includes(role)
    },
    {
        title: 'Заявки',
        path: '/requests',
        show: (role: Roles) => [Roles.Staff, Roles.Admin].includes(role)
    },
    {
        title: 'Информация о ресторане',
        path: '/info',
        show: (role: Roles) => role === Roles.Admin
    },
    {
        title: 'Добавить учетную запись',
        path: '/add-user',
        show: (role: Roles) => [Roles.Admin, Roles.SuperAdmin].includes(role)
    },
    {
        title: 'Статистика',
        path: '/stats',
        show: (role: Roles) => role === Roles.Admin
    },
    {
        title: 'Все рестораны',
        path: '/restaurants',
        show: (role) => role === Roles.SuperAdmin
    },
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
