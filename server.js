const express = require('express');
const { LocalStorage } = require("node-localstorage");
const app = express();
const PORT = 3000;


const localStorage = new LocalStorage('./scratch')



localStorage.setItem("key", "thing you are trying to save")


app.use(express.json())


// app.get is used to retrieve the item and key to be placed in thunder client if not  404 error is called

app.get("/item/:key" , (req, res) => {
    let key = req.params.key;
    let storedItem = localStorage.getItem(key);
    if (storedItem) {
        res.json({ key: storedItem});
    } else {
        res.status(404).json({ error: `Item with key '${key}' not found`});
    }
});

//app.post is used to retrieve the item to be placed in thunder client and to set new keys

app.post("/item" , (req, res) => {
    let key = req.body.key;
    let value = req.body.value;
    localStorage.setItem(key, value);
        res.json({ message: `Item with key '${key}' stored successfully`});
    }
);


//app.delete is used to send delete method to thunder client where it deleted from the local storage placed in scratch
app.delete('/item/:key', (req, res) => {
    const key = req.params.key;
    const storedItem = localStorage.getItem(key);

    if (storedItem) {
        localStorage.removeItem(key);
        res.json({ message: `Item with key '${key}' deleted successfully` });
    } else {
        res.status(404).json({ error: `Item with key '${key}' not found` });
    }
});



// app.listen is a method that listens for port 3000 and prints the console.log message with port number
app.listen(PORT, () => {
    console.log(`running express api at localhost:${PORT}`)
})
