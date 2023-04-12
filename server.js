var express = require("express");

var PORT = process.env.PORT || 20002;

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const store = [];

app.get("/", function (req, res) {
  const rows = store
    .map(
      (row, index) => `
      <tr>
        <td align="center">${index + 1}</td>
        <td>${JSON.stringify(row.headers)}</td>
        <td>${JSON.stringify(row.body)}</td>
      </tr>`
    )
    .join("");

  res.send(`
  <html>
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
          td {
            word-break: break-all;
            padding: 8px;
          }
      </style>
    </head>
    <body>
        <table border="1">
          <thead>
              <tr>
                <th style="width: 2%;">index</th>
                <th style="width: 44%;">headers</th>
                <th style="width: 44%;">body</th>
              </tr>
          </thead>
          ${rows}
        </table>
    </body>
  </html>`);
});

app.post("/", function (req, res) {
  const { headers, body } = req;
  store.push({
    headers,
    body,
  });

  res.send("OK");
});

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
