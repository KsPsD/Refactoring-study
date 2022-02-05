"use strict";
exports.__esModule = true;
var plays_js_1 = require("./plays.js");
var invoices_js_1 = require("./invoices.js");
var createStatementData_js_1 = require("./createStatementData.js");
function statement(invoice, plays) {
    return renderPlainText((0, createStatementData_js_1["default"])(invoice, plays));
}
function renderPlainText(data) {
    var result = "\uCCAD\uAD6C \uB0B4\uC5ED (\uACE0\uAC1D\uBA85: ".concat(data.customer, ")\n");
    for (var _i = 0, _a = data.performances; _i < _a.length; _i++) {
        var perf = _a[_i];
        result += "".concat(perf.play.name, ": ").concat(usd(perf.amount), " (").concat(perf.audience, " \uC11D) \n");
    }
    result += "\uCD1D\uC561: ".concat(usd(data.totalAmount), "\n");
    result += "\uC801\uB9BD \uD3EC\uC778\uD2B8: ".concat(data.totalVolumeCredits, "\uC810 \n");
    return result;
}
function htmlStatement(invoice, plays) {
    return renderHtml((0, createStatementData_js_1["default"])(invoice, plays));
}
function renderHtml(data) {
    var result = "<h1>\uCCAD\uAD6C \uB0B4\uC5ED (\uACE0\uAC1D\uBA85: ".concat(data.customer, "</h1>\n");
    result += "<table>\n";
    result += "<tr><th>\uC5F0\uADF9</th><th>\uC88C\uC11D \uC218</th><th>\uAE08\uC561</th></tr>\n";
    for (var _i = 0, _a = data.performances; _i < _a.length; _i++) {
        var perf = _a[_i];
        result += " <tr><td>".concat(perf.play.name, "</td><td>(").concat(perf.audience, "\uC11D)</td>");
        result += "<td>".concat(usd(perf.amount), "</td></tr>\n");
    }
    result += "</table>\n";
    result += "<p>\uCD1D\uC561: ".concat(usd(data.totalAmount), "</em></p>\n");
    result += "<p>\uC801\uB9BD \uD3EC\uC778\uD2B8: ".concat(data.totalVolumeCredits, "</em>\uC810</p>\n");
    return result;
}
function usd(aNumber) {
    return new Intl.NumberFormat('en-US', { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
}
console.log(statement(invoices_js_1["default"][0], plays_js_1["default"]));
