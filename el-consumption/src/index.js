const express = require('express');
const PORT = process.env.PORT ||3001;
var axios = require('axios');
const app = express();


app.listen(PORT, () => console.log (`Server started on port ${PORT}`));

app.get("/", async(req, res) => {
    const temp = await getTemp();
    consumption();
    res.send("" + temp)
})

const getTemp = async () => {
    try {
        const res = await axios.get('http://localhost:3000/');
        if(res.status == 200) {
            temp = res;
            return temp.data;
        }
        else {
            res.status(500);
            return("Bad request: " + res.status);
        }
    }
    catch (err) {
        console.log(err);
    }

}

const consumption = async () => {
    const temp = await getTemp();
    const baseLine = 8; // floor(5000kWh - 2000kWh / 365 ) kWh
    var date = new Date();
    var hour = date.getHours();
    console.log(hour);

}
