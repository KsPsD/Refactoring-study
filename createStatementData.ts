import type {play,playValue} from "./plays.js"
import type {performance ,invoice} from "./invoices.js"
import 'core-js';

type resPerf={
    play?:playValue
    amount?:number
    volumeCredits?:number
} & performance
type res ={
    customer?:string,
    performances?:resPerf[],
    totalAmount?:number,
    totalVolumeCredits?:number
   
}

class PerformanceCalculator {
    performance: performance;
    play: playValue;

    constructor(aPerformance: performance, aPlay:playValue) {
        this.performance = aPerformance;
        this.play = aPlay;

    }
    getamount() {
        throw new Error("서브 클래스에서 처리하도록 설계되었습니다.")
    }
    getvolumeCredits():number {

        return Math.max(this.performance.audience - 30, 0);

    }
}

class TragedyCalculator extends PerformanceCalculator {
    result: number;
    constructor(aPerformance: performance, aPlay:playValue){
        super(aPerformance,aPlay)
    }
    getamount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result
    }
}
class ComedyCalculator extends PerformanceCalculator {
    result: number;

    constructor(aPerformance: performance, aPlay:playValue){
        super(aPerformance,aPlay)
    }
    getamount():number {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result
    }
    getvolumeCredits():number {

        return super.getvolumeCredits()+Math.floor(this.performance.audience /5);

    }
}




export default function createStatementData(invoice:invoice, plays:play) :res {
    
    const result:res = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);

    return result

    function enrichPerformance(aPerformance:resPerf):resPerf {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = {...aPerformance}; //얕은 복사 수행
        result.play = calculator.play
        result.amount = calculator.getamount();
        result.volumeCredits = calculator.getvolumeCredits();
        return result
    }

    function playFor(aPerformance:performance):playValue {
        return plays[aPerformance.playID]
    }

    // function amountFor(aPerformance) {
    //     return new PerformanceCalculator(aPerformance, aPerformance.play).getamount()
    // }


    // function volumeCreditsFor(aPerformance) {
    //     return new PerformanceCalculator(aPerformance, aPerformance.play).getvolumeCredits()
    // }


    function totalAmount(data:res):number {
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }

    function totalVolumeCredits(data:res):number {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }

}
function createPerformanceCalculator(aPerformance:performance, aPlay:playValue) {
    switch (aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay)
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay)
        default:
            throw new Error(`알 수 없는 장르: ${aPlay.type}`)
    }
}
