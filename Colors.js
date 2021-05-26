'use strict';

const shortToOldAnsi = new Map([
    ['{D', '\x1b[1;30m'],
    ['{r', '\x1b[31m'],
    ['{R', '\x1b[1;31m'],
    ['{g', '\x1b[32m'],
    ['{G', '\x1b[1;32m'],
    ['{y', '\x1b[33m'],
    ['{Y', '\x1b[1;33m'],
    ['{b', '\x1b[34m'],
    ['{B', '\x1b[1;34m'],
    ['{m', '\x1b[35m'],
    ['{M', '\x1b[1;35m'],
    ['{c', '\x1b[36m'],
    ['{C', '\x1b[1;36m'],
    ['{w', '\x1b[37m'],
    ['{W', '\x1b[1;37m'],
    ['{x', '\x1b[0m']
]);

const shortToAnsi256 = new Map([
    ['{D', '\x1b[38;5;8m'],
    ['{r', '\x1b[38;5;1m'],
    ['{R', '\x1b[38;5;9m'],
    ['{g', '\x1b[38;5;2m'],
    ['{G', '\x1b[38;5;10m'],
    ['{y', '\x1b[38;5;3m'],
    ['{Y', '\x1b[38;5;11m'],
    ['{b', '\x1b[38;5;4m'],
    ['{B', '\x1b[38;5;12m'],
    ['{m', '\x1b[38;5;5m'],
    ['{M', '\x1b[38;5;13m'],
    ['{c', '\x1b[38;5;6m'],
    ['{C', '\x1b[38;5;14m'],
    ['{w', '\x1b[38;5;7m'],
    ['{W', '\x1b[38;5;15m'],
    ['{x', '\x1b[0m']
]);

function replacer(match, ansiSupport, p1, offset, string) {
    let replacement = '';
    if (ansiSupport == 'ansi256') {
        replacement = shortToAnsi256.get(match);
        if (!replacement) {
            replacement = shortToAnsi256.get('{x');
        }
    }
    else if (ansiSupport == 'ansi') {
        replacement = shortToOldAnsi.get(match);
        if (!replacement) {
            replacement = shortToOldAnsi.get('{x');
        }
    }
    return replacement;
}

function parseColoredString(coloredString, ansiSupport) {
    let ansiString = coloredString.replaceAll(new RegExp('\\{\\w', 'g'), (match) => {
        return replacer(match, ansiSupport);
    });
    return ansiString;
}

module.exports = { shortToOldAnsi, shortToAnsi256, parseColoredString }