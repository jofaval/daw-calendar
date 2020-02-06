class Validator {
    noEmpty(valor) {
        return valor.toString().length != 0;
    }

    numeric(valor) {
        return isNaN(valor);
    }

    email(valor) {
        return /^[a-z]+([\.]?[a-z0-9_-]+)*@iesabastos\.org$/.test(valor);
    }

    datetime(valor) {
        return /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/.test(valor);
    }

    date(valor) {
        return /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/.test(valor);
    }

    name(valor) {
        return /^[a-zñ\ \º\ª]+$/iu.test(valor);
    }

    password(valor) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/i.test(valor);
    }

    state(valor) {
        return ["perfect", "on_repair", "left_out"].includes(valor);
    }

    text(valor) {
        return /^[a-zñ\ \º\ª]+$/ium.test(valor);
    }

    username(valor) {
        return /^[a-z0-9_-]{3,24}$/i.test(valor);
    }
}