const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.mainPage = (elist, d) => renderPug('index', { list: elist, date: d });
exports.idPage = (personInfo, d) => renderPug('infoPerson', { person: personInfo, date: d });
exports.formPage = (registo, d) => renderPug('form', { e: registo, date: d });
exports.statsPage = (emds, d) => renderPug('stats', { emds: emds, date: d });
exports.successPage = (msg, d) => renderPug('success', { message: msg, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });
