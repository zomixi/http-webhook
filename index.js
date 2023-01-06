var express = require("express");

var PORT = process.env.PORT || 20002;

var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const data = [];

app.get("/", function (req, res) {
  const rows = data
    .map(
      (row) => `
      <tr>
          <td>${JSON.stringify(row.headers)}</td>
          <td>${JSON.stringify(row.body)}</td>
      </tr>`
    )
    .join("\n");

  res.send(`<html>
    <head>
        <title>Webhook</title>
    </head>
    <body>
        <table border="1" style="width: 100%">
            <tr>
                <th>headers</th>
                <th>body</th>
            </tr>
            ${rows}
        </table>
    </body>
</html>`);
});

app.post("/", function (req, res) {
  const { headers, body } = req;
  data.push({
    headers,
    body,
  });

  res.send("OK");
});

app.listen(PORT, function () {
  console.log("Listening on port " + PORT);
});
