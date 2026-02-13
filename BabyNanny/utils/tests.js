const date = new Date()
const bornDate = new Date("2024-06-14");
const yearDiff = (date.getFullYear()-bornDate.getFullYear())
const monthDiff = date.getMonth()-bornDate.getMonth()
var monthAge = (yearDiff*12)+(monthDiff)
if(date.getDay() - bornDate.getDay() <= 0){
    monthAge--;
}
console.log(monthAge);