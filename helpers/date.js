module.exports = function (date) {
    return date ? `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` : '';
}