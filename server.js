const express = require('express')
const app = express()
const port = 5010

const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.post('/get-data/:name', async (req, res) => {

    const name = req.params.name;

    const q = `
          query Test($x: String!) {
            search(
                query: $x,
                query_type: "Book",
                per_page: 1,
                page: 1
            ) {
                results
            }}
        `

  
    const request2 = await fetch("https://api.hardcover.app/v1/graphql",{         
        method: "POST",
        headers: {
        "content-type" : "application/json",
        "authorization" : "put your hardcover key here...",
        },
        body: JSON.stringify({
        query : q,
        variables : { x : name},
        }),
        
    });

    const r = await request2.json();
    console.log(r);
    res.send(r);



})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
