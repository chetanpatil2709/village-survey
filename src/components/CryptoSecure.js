import CryptoJS from "crypto-js";

const secret_key = "!@#$%^&*()12345ASDF!!@#$%^&*()12345ASDF@#$%^&*()12345ASDF!@#$%^&*()12345ASDF";
export function ToEncrypt(code) {
    let string = JSON.stringify(code);
    let encrypted = CryptoJS.AES.encrypt(string, secret_key).toString();
    return encrypted
}

export function ToDecrypt(code) {
    let bytes = CryptoJS.AES.decrypt(code, secret_key);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted
}