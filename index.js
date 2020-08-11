const http = require("http");
const request = require("request");

const AWS = require("aws-sdk");
const STS = new AWS.STS();

const CONSOLE = "https://ap-northeast-1.console.aws.amazon.com/console";
const LOGIN = "https://signin.aws.amazon.com/federation";
const ISS = "awsmc";

const ASSUME_ROLE_REQ = require("./json/AWSLogin.json");

const hostname = '127.0.0.1';
const port = 5201;

const server = http.createServer(async (req, res) => {
  const assumeRole = await getAssumeRole();
  const token = await getToken(assumeRole.Credentials);
  const url = await getRedirectUrl(token);
  res.statusCode = 301;
  res.setHeader('Location', url);
  res.setHeader('Cache-Control', "no-cache, no-store");
  res.setHeader('Pragma', "no-cache");
  res.end();
});

server.listen(port, hostname, () => {
  console.log("Server running at http:\/\/localhost:5201");
});


function getAssumeRole() {
  return new Promise(function(resolve, reject){
    STS.assumeRole(ASSUME_ROLE_REQ, function(err, data) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(data);
      }
    });
  });
}

function getToken(assumeRole) {
  return new Promise(function(resolve, reject){
    var session = {
      sessionId: assumeRole.AccessKeyId,
      sessionKey: assumeRole.SecretAccessKey,
      sessionToken: assumeRole.SessionToken
    }
    requestUrl = LOGIN
      + "?Action=getSigninToken"
      + "&SessionType=json"
      + "&Session=" + encodeURIComponent(JSON.stringify(session));
    var options = {
      url: requestUrl,
      json: true
    };
    request.get(options, function (err, res, body) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(body.SigninToken);
      }
    })
  });
}

function getRedirectUrl(token) {
  return new Promise(function(resolve, reject){
    var redirectUrl = LOGIN
      + "?Action=login"
      + "&SigninToken=" + encodeURIComponent(token)
      + "&Issuer=" + encodeURIComponent(ISS)
      + "&Destination=" + encodeURIComponent(CONSOLE)
    resolve(redirectUrl);
  });
}