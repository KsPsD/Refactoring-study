import plays from "./plays.js" 
import invoices from "./invoices.js" 
import createStatementData from "./createStatementData.js"
import type {play,playValue} from "./plays.js"
import type {performance ,invoice} from "./invoices.js"
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

function statement(invoice: invoice, plays:play): string{
   
    return renderPlainText(createStatementData(invoice, plays))
}


function renderPlainText(data:res): string{
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    for(let perf of data.performances){
        result+=`${perf.play.name}: ${usd(perf.amount)} (${perf.audience} 석) \n`
    }
    result+=`총액: ${usd(data.totalAmount)}\n`
    result+=`적립 포인트: ${data.totalVolumeCredits}점 \n`
    return result;

}

function htmlStatement(invoice:invoice, plays:play){
   
    return renderHtml(createStatementData(invoice, plays))
}
function renderHtml(data:res){
    let result = `<h1>청구 내역 (고객명: ${data.customer}</h1>\n`;
    result+=`<table>\n`
    result+=`<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n`
    for(let perf of data.performances){
        result+=` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
        result+=`<td>${usd(perf.amount)}</td></tr>\n`
    }

    result+=`</table>\n`
    result+=`<p>총액: ${usd(data.totalAmount)}</em></p>\n`
    result+=`<p>적립 포인트: ${data.totalVolumeCredits}</em>점</p>\n`
    return result

    
}

function usd(aNumber:number){
    return new Intl.NumberFormat('en-US', {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100)
}


console.log(statement(invoices[0],plays))