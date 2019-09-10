function authenticater(req, res, next) {
    console.log('Authenticating...');
    next();
}

module.exports = authenticater;