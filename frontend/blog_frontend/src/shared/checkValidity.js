export const checkValidity = (
    value,
    rules,
    inputIndentifier = null,
    password = null
) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = (value !== "" || value !== null) && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }
    if (inputIndentifier === "password1") {
        isValid = password === value && isValid;
    }
    return isValid;
};
