const path = require('path');

module.exports = ({ dir }) => ({
    app: path.join(dir, 'src'),
    build: path.join(dir, 'build'),
    prod: path.join(dir, 'prod'),
});