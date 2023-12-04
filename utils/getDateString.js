export default function getDateString(date){
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const date_string = `${year}-${month}-${day}`;
    return date_string;
}