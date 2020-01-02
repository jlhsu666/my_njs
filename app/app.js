/*
 * Copyright (c) 2012-2019 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

/*eslint-env node*/

var express = require('express');
var app = express();
const https = require('https');





app.get('/', function (req, res) {
  https.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&json=1&delay=0&_=1577942519971', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).msgArray['0']['nf']);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  var mytag='<html><body><table border=1><tr><td>姓名</td><td>XX</td></tr><tr><td>學號</td><td>YYY</td></tr><tr><td>地址</td><td>ZZZ</td></tr></table></body></html>';
  res.send(mytag);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
