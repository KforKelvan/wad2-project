function convertAndFilter(entriesArr) {
 const now = moment();
 const previousMinute = now.clone().subtract(1, 'minutes');
 const currentTime = now;
 console.log('previousMinute', previousMinute.format());
 console.log('currentTime', currentTime.format());
 return entriesArr.filter(row => {
    const scheduleDatetime = moment(row['datetime']);
    return scheduleDatetime.isAfter(previousMinute) && scheduleDatetime.isBefore(currentTime);
 });
}

async function sendMessage(row) {
 const bot_id = "6842993088:AAGqiVSlwx9aaXLAx6Mp1CNblPMUIMqP6bs";
 const chat_id = row['TeleID'];
 const message = row['Msg'];
 const url = `https://api.telegram.org/bot${bot_id}/sendMessage?chat_id=${chat_id}&text=${message}`;

 try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
 } catch (error) {
    console.error(error);
 }
}

async function processData() {
 try {
    const data = await getEntries();
    const filteredData = convertAndFilter(data);
    if (filteredData.length > 0) {
        const statuses = await Promise.all(filteredData.map(sendMessage));
        console.log(statuses);
    }
 } catch (error) {
    console.error(error);
 }
}

(async function () {
 try {
    while (true) {
        await processData();
        console.log('Waiting for 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
    }
 } catch (error) {
    console.error(error);
 }
})();