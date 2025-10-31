const { runNetlifyHandler } = require('./_netlifyWrapper');
const netlifyModule = require('../netlify/functions/addMessage.js');

module.exports = async (req, res) => {
    await runNetlifyHandler(req, res, netlifyModule);
};