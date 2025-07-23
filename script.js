// 含稅計算
function calculate() {
    const total = parseFloat(document.getElementById('total')?.value || 0);
    const rE = parseFloat(document.getElementById('entertainmentTax')?.value || 0) / 100;
    const rV = parseFloat(document.getElementById('vatTax')?.value || 0) / 100;

    if (!total || total <= 0) {
        document.getElementById('result').innerHTML = "請輸入有效的票價。";
        return;
    }

    const net = total / (1 + rE + rV);
    const entertainment = net * rE;
    const vat = net * rV;

    document.getElementById('result').innerHTML = `
    <strong>計算結果：</strong><br>
    未稅票價：NT$ ${net.toFixed(2)}<br>
    娛樂稅 (${(rE * 100).toFixed(1)}%)：NT$ ${entertainment.toFixed(2)}<br>
    營業稅 (${(rV * 100).toFixed(1)}%)：NT$ ${vat.toFixed(2)}<br>
    <hr>
    總額：NT$ ${total.toFixed(2)}
  `;
}

// 奢侈稅計算
function calcLuxury() {
    const total = parseFloat(document.getElementById('luxTotal')?.value || 0);
    const r = parseFloat(document.getElementById('luxRate')?.value || 0) / 100;

    if (!total || total <= 0) {
        document.getElementById('luxResult').innerHTML = "請輸入有效金額。";
        return;
    }

    const tax = total * r;
    const finalPrice = total + tax;

    document.getElementById('luxResult').innerHTML = `
    <strong>計算結果：</strong><br>
    商品原價：NT$ ${total.toFixed(2)}<br>
    奢侈稅 (${(r * 100).toFixed(1)}%)：NT$ ${tax.toFixed(2)}<br>
    <hr>
    總額 (含稅)：NT$ ${finalPrice.toFixed(2)}
  `;
}


