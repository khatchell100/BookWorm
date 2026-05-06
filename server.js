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
        "authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIYXJkY292ZXIiLCJ2ZXJzaW9uIjoiOCIsImp0aSI6IjdjMDZmMGQzLWUzMzAtNDliZC05ZGQ4LTZjZTc2NWQ1YzBmMCIsImFwcGxpY2F0aW9uSWQiOjIsInN1YiI6IjgzOTU4IiwiYXVkIjoiMSIsImlkIjoiODM5NTgiLCJsb2dnZWRJbiI6dHJ1ZSwiaWF0IjoxNzc3NTc2OTc3LCJleHAiOjE4MDkxMTI5NzcsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciIsIlgtaGFzdXJhLXVzZXItaWQiOiI4Mzk1OCJ9LCJ1c2VyIjp7ImlkIjo4Mzk1OH19.r5T1J1F4xJK7dUFNPygv0mQUGqNRZAissqxH_nxIXZ8",
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