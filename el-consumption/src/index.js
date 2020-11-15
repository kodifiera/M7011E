const express = require('express');
const PORT = process.env.PORT ||3001;
var axios = require('axios');
const app = express();


app.listen(PORT, () => console.log (`Server started on port ${PORT}`));

app.get("/", async(req, res) => {
    const temp = await getTemp();
    res.send("" + temp.data)
})

const getTemp = async () => {
    try {
        const res = await axios.get('http://localhost:3000/');
        if(res.status == 200) {
            temp = res;
            return temp;
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
