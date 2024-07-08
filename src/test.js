async function fetchData() {
    let data = await fetch('https://api.example.com');
    return data.json();
}
async function showData() {
    let data = await fetchData();  // 等待 fetchData 完成
    console.log(data);  // 在 fetchData 完成后执行
}

function displayData() {
    let dataPromise = fetchData();  // 返回一个 Promise
    console.log(dataPromise);  // 显示 Promise 对象，而不是最终结果
    dataPromise.then(data => console.log(data));  // 当 Promise 解决时执行
}

showData();
// displayData();
console.log('The end');