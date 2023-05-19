const pattern = {
    idNumber: /^\d{18}$/gi,
    idNUmberStrict: /^\d{6}(19|20)\d{2}(0\d|1[0-2])([0-2]\d|3[0,1])\d{4}$/gi,
    phoneNumber: /^1\d{10}$/gi,
    email: /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/gi,
    ipAddress: /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/gi,
    float: /^-?\d+(\.\d+)?$/gi,
    positiveInteger: /^\d+$/gi,
    account: /^[a-zA-Z]\w{4,15}$/gi,
    password: /^[a-zA-Z]\w{5,17}$/gi,
    strongPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/gi,
    bankCard: /^\d{15, 19}$/,
    phoneMasking: /(?<=1\d{2})\d{4}(?=\d{4})/gi,
    idNumberMasking: /(?<=\d{6})\d{8}(?=\d{4})/gi
}

export default pattern
