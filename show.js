import plays from "./plays.js" 
import invoices from "./invoices.js" 

function amountFor(perf,play){
    let result = 0;
    switch(play.type){
        case "tragedy":
               thisAmount = 40000;
               if(perf.audience>30){
                result+=1000 * (perf.audience -30);
               }
               break
        case "comedy":
            thisAmount = 30000;
            if(perf.audience>20){
                result +=10000 +500 * (perf.audience -20);
            }
            result +=300 * perf.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${play.type}`)
       }
       return result
}

function statement(invoice, plays){
    let totalAmount =0
    let volumeCredits = 0
    let result =`청구 내역 (고객명: ${invoice.customer})\n`;
    const format= new Intl.NumberFormat('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 2}).format

    for(let perf of invoice.performances){
        const play = plays[perf.playID]
        let thisAmount = 0;

       let thisAmount=amountFor(perf,play)
       volumeCredits +=Math.max(perf.audience -30 ,0);
       if("comedy" ===play.type) volumeCredits +=Math.floor(perf.audience / 5);


       result+=`${play.name}: ${format(thisAmount/100)} (${perf.audience} 석) \n`
       totalAmount +=thisAmount
    }
    result+=`총액: ${format(totalAmount/100)}\n`
    result+=`적립 포인트: ${volumeCredits}점 \n`
    return result;

}


console.log(statement(invoices[0],plays))