const { isEmail } = require("validator").default

/**
 * Emits, when user data is invalid
 * 
 * Error codes:
 * 
 * 1 - Invalid email
 * 
 * 2 - Short password
 * 
 * 3 - Passwords mismatch
 * 
 */
class ValidationError extends Error {
    /**
     * @param {Number} code 
     */
    constructor(code) {
        super("User data is invalid!")
        this.code = code
        switch (code) {
            case 1:
                this.name = "InvalidEmail"
                break;
            case 2:
                this.name = "ShortPassword"
                break;
            case 3:
                this.name = "PasswordMismatch"
                break;
            default:
                this.name = "ValidationError"
                break;
        }
    }
}

/**
 * @param {String} email 
 * @param {String} password1 
 * @param {String} password2 
 * @returns {Boolean}
 */
module.exports.validateRegisterData = (email, password1, password2) => {
    // Email validation
    if (!isEmail(email)) throw new ValidationError(1)

    // Password length validation
    if (password1 < 8) throw new ValidationError(2)
    if (password1 != password2) throw new ValidationError(3)
    return true
}

module.exports.ValidationError = ValidationError