const data = JSON.parse(this.response);
var length = 0;
for (var k in data)
    if (data.hasOwnProperty(k))
        length++;