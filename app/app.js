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
  var mytag='';
  https.get('https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw&json=1&delay=0&_=1577942519971', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        mytag='<html><body><table border=1><tr><td>公司</td><td>'+JSON.parse(data).msgArray['0'].n
        + '</td></tr><tr><td>開盤</td><td>' + JSON.parse(data).msgArray['0'].o
        + '</td></tr><tr><td>最高價</td><td>' + JSON.parse(data).msgArray['0'].h
        + '</td></tr><tr><td>成交價</td><td>'+ JSON.parse(data).msgArray['0'].z
        + '</td></tr></table></body></html>';
        res.send(mytag);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
