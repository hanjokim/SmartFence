const dateString = "2021.05.01";
let articleDate = "09:23:51";

const myBirthday = new Date(dateString);
const present = new Date();
const presentDate = present.getFullYear() + '.' + (present.getMonth()+1) + '.' + present.getDate();

articleDate = articleDate.indexOf(':') > 0 ? presentDate : articleDate;

console.log(myBirthday);
console.log(present);
console.log(articleDate);
console.log(parseInt((present - myBirthday)/24/60/60/1000));