/*格式化请求地址*/
const formatUrl = (params, url)=> {
        url += url.indexOf("?") > -1 ? "" : "?";
        for (param in params) {
            url += param + "=" + params[param] + "&";
        }
        return url.substr(0, url.length - 1);
    },
    requestUrl = "http://10.87.42.87:3000/src/json/getCashierInfo.json";
/*json请求封装jsonp+XMLHttpRequest*/
const getJson = option=>new Promise(function (resolve, reject) {
    const preload = ()=> {
        if (option.preload && typeof option.preload == "function") {
            option.preload()
        }
    };
    if (option.responseType == "jsonp") {
        let script = document.createElement("script"),
            url = formatUrl(option.data, option.url),
            jsonp = option.jsonp || "callback",
            callback = "jsonp" + String(new Date().getTime()) + String(Math.random()).slice(-7);
        window[callback] = (data)=> {
            document.body.removeChild(script);
            resolve(data);
        };
        preload();
        script.setAttribute("src", url + (url.indexOf("?") > -1 ? "&" : "?") + jsonp + "=" + callback);

        document.body.appendChild(script);
    } else {
        let client = new XMLHttpRequest();
        client.open(option.type || "GET", formatUrl(option.data, option.url), option.async || false);
        client.onreadystatechange = function () {
            if (this.readyState == 2) {
                preload();
            } else if (this.readyState == 4) {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    reject(new Error(this.statusText));
                }
            }
        };
        client.responseType = option.responseType || "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    }
});

/*json请求*/
let requestJson = getJson({
    url: requestUrl,
    data: {
        cashierId: "5dfb001b44674614824da8756ef2b75d",
        terminalApplication: "media_cibn"
    },
    responseType: "json",
    async: true,
    preload: data=> {
        console.log("loading...");
    }
});
requestJson.then(res=> {
    if (res.resultStatus == 1) {
        for (let i in res.data.packages) {
            console.log(res.data.packages[i])
        }
    } else {
        console.log("get data fail")
    }
}).catch(err=>console.log("err:" + err));

/*jsonp请求*/
let requestJsonP = getJson({
    url: requestUrl,
    data: {
        cashierId: "5dfb001b44674614824da8756ef2b75d",
        terminalApplication: "media_cibn"
    },
    responseType: "jsonp",
    preload: data=> {
        console.log("loading...");
    }
});
requestJsonP.then(res=> {
    if (res.resultStatus == 1) {
        for (let i in res.data.packages) {
            console.log(res.data.packages[i])
        }
    } else {
        console.log("get data fail")
    }
}).catch(err=>console.log("err:" + err));


/*fetch请求*/
const myHeaders = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "zh-CN,zh;q=0.8",
    "Connection": "keep-alive",
    "Cookie": "vjuids=-146d23a58.15a3536bd09.0.b28df7043457c; tj2_lc=f0c863ef52ca84113c2c57188ec40073; vjlast=1486951464.1493692601.12; vipcsrf=224480758D",
    "Host": "api.itv.cp21.ott.cibntv.net",
    "Referer": "http://10.87.42.87:3000/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
};
let option = {
        headers: myHeaders,
        method: 'GET',
        mode: 'no-cors',
        credentials: "include",
        cache: 'default'
    },
    data = {
        cashierId: "5dfb001b44674614824da8756ef2b75d",
        terminalApplication: "media_cibn"
    },
    requestFetch = fetch(formatUrl(data, requestUrl), option);

requestFetch.then(res=> {
    console.log(res);
}).catch(err=> {
    console.log(err);
});