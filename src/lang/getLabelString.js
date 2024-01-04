import labels from "./langStore";

export default function getLabelString(key) {
    let lang = sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en';
    //sessionStorage.getItem('lang')
    return labels[key][lang];
}