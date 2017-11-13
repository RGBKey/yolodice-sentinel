const chalk = require('chalk');

module.exports = {
    log: function(msg, level) {
        let date = new Date();
        let string = chalk.gray(`${date.toLocaleDateString()}[${this.leadingZero(date.getHours())}:${this.leadingZero(date.getMinutes())}:${this.leadingZero(date.getSeconds())}] `);
        switch(level) {
            case 0: // Default
                console.log(string + msg);
                break;
            case 1: // Dim
                console.log(string + chalk.gray(msg));
                break;
            case 2: // Error
                console.log(string + chalk.red(msg));
                break;
            case 3: // No timestamp
                console.log(msg);
                break;
            default:
                console.log(string + msg);
                break;
        }
    },

    leadingZero: function(n) {
        if(n < 10) {
            return '0' + n;
        } else {
            return n;
        }
    }
};
