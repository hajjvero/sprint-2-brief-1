/**
* function to check the value if is empty
*/
export function isEmpty(value) {
    return value === "" || value.length === 0;
}

/**
 * function to check the value is email valid
 */
export function isEmail(value) {
    const emailRegex = /^[\w._-]+@\w+\.(com|net|org|ma)$/i; // reg-ex of email

    return emailRegex.test(value);
}