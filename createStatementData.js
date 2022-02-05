"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require("core-js");
var PerformanceCalculator = /** @class */ (function () {
    function PerformanceCalculator(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    PerformanceCalculator.prototype.getamount = function () {
        throw new Error("서브 클래스에서 처리하도록 설계되었습니다.");
    };
    PerformanceCalculator.prototype.getvolumeCredits = function () {
        return Math.max(this.performance.audience - 30, 0);
    };
    return PerformanceCalculator;
}());
var TragedyCalculator = /** @class */ (function (_super) {
    __extends(TragedyCalculator, _super);
    function TragedyCalculator(aPerformance, aPlay) {
        return _super.call(this, aPerformance, aPlay) || this;
    }
    TragedyCalculator.prototype.getamount = function () {
        var result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    };
    return TragedyCalculator;
}(PerformanceCalculator));
var ComedyCalculator = /** @class */ (function (_super) {
    __extends(ComedyCalculator, _super);
    function ComedyCalculator(aPerformance, aPlay) {
        return _super.call(this, aPerformance, aPlay) || this;
    }
    ComedyCalculator.prototype.getamount = function () {
        var result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    };
    ComedyCalculator.prototype.getvolumeCredits = function () {
        return _super.prototype.getvolumeCredits.call(this) + Math.floor(this.performance.audience / 5);
    };
    return ComedyCalculator;
}(PerformanceCalculator));
function createStatementData(invoice, plays) {
    var result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;
    function enrichPerformance(aPerformance) {
        var calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        var result = __assign({}, aPerformance); //얕은 복사 수행
        result.play = calculator.play;
        result.amount = calculator.getamount();
        result.volumeCredits = calculator.getvolumeCredits();
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    // function amountFor(aPerformance) {
    //     return new PerformanceCalculator(aPerformance, aPerformance.play).getamount()
    // }
    // function volumeCreditsFor(aPerformance) {
    //     return new PerformanceCalculator(aPerformance, aPerformance.play).getvolumeCredits()
    // }
    function totalAmount(data) {
        return data.performances.reduce(function (total, p) { return total + p.amount; }, 0);
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce(function (total, p) { return total + p.volumeCredits; }, 0);
    }
}
exports["default"] = createStatementData;
function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error("\uC54C \uC218 \uC5C6\uB294 \uC7A5\uB974: ".concat(aPlay.type));
    }
}
