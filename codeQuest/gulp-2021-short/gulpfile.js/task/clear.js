// Пакеты
const del = require("del");

// Удаление директории
const clear = () => {
    return del($.path.root);
}

module.exports = clear;