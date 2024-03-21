import {months} from "./constants.ts";

export function getPersonsCountString(personsCount: number){
    const x = personsCount % 10;
    if (x === 0 || x >= 5 || personsCount >= 9 && personsCount < 15) return `${personsCount} персон`
    if (x > 1 && x < 5) return `${personsCount} персоны`
    return `${personsCount} персона`
}

export function getBookingPeriod(dateFrom: string, dateTo: string){
    const from = new Date(dateFrom)
    const to = new Date(dateTo)
    const fromTime = dateFrom.split('T')[1].substring(0,5)
    const toTime = dateTo.split('T')[1].substring(0,5)
    return `${from.getDate()} ${months[from.getMonth()].declinedName}, ${fromTime}-${toTime}`
}

export function validateLogin(login: string): string | null{
    if(!login) return "Поле обязательно для заполнения"
    if(!/[a-zA-Z0-9-_.@]$/.test(login)) return "Неверный формат логина"
    if(login.length < 3) return "Минимальная длина 3 символа"
    if(login.length > 25) return "Максимальная длина 25 символов"
    return null
}
