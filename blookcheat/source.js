// Load Avo Console
var devtools = document.createElement("div")
devtools.setAttribute("class", "avodevtools")
devtools.setAttribute("id", "avodevtools")
devtools.setAttribute("contenteditable", "false")
document.getElementsByTagName("body")[0].appendChild(devtools)
var devtools = document.getElementById("avodevtools")
var navbar = document.createElement("div")
navbar.setAttribute("id", "avonavbar")
devtools.appendChild(navbar)
var navbar = document.getElementById("avonavbar")
var edit = document.createElement("button")
edit.innerText = "Edit"
edit.setAttribute("class", "avoedit")
edit.setAttribute("onclick", "if (document.designMode == 'off') {document.designMode = 'on'} else {document.designMode = 'off'}")
navbar.appendChild(edit)
var xray = document.createElement("button")
xray.innerText = "X-Ray"
xray.setAttribute("class", "avoxray")
xray.setAttribute("onclick", "javascript:(function () {var script=document.createElement('script');script.src='https://x-ray-goggles.mouse.org/webxray.js';script.className='webxray';script.setAttribute('data-lang','en-US');script.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');document.body.appendChild(script);}())")
navbar.appendChild(xray)
var elements = document.createElement("button")
elements.innerText = "Elements"
elements.setAttribute("class", "avoelements avoactive")
elements.setAttribute("onclick", "avogoelements()")
navbar.appendChild(elements)
var console = document.createElement("button")
console.innerText = "Console"
console.setAttribute("class", "avoconsole")
console.setAttribute("onclick", "avogoconsole()")
navbar.appendChild(console)
var closebtn = document.createElement("button")
closebtn.innerText = "X"
closebtn.setAttribute("class", "avoclosebtn")
closebtn.setAttribute("onclick", "avoclosedevtools()")
navbar.appendChild(closebtn)
async function fetchcode() {
var code;
var url = await fetch(window.location);
var res = await url.text();
code = res;
var thecode = document.createElement("div")
thecode.innerText = code
thecode.setAttribute("class", "avothecode")
devtools.appendChild(thecode)
}
fetchcode()
var thelogs = document.createElement("div")
thelogs.setAttribute("id", "avologs")
devtools.appendChild(thelogs)
var theloginput2 = document.createElement("div")
theloginput2.setAttribute("class", "avologinput2")
devtools.appendChild(theloginput2)
var theloginputbefore = document.createElement("div")
theloginputbefore.setAttribute("class", "avologinputbefore")
theloginputbefore.innerText = ">"
theloginput2.appendChild(theloginputbefore)
var theloginput = document.createElement("input")
theloginput.setAttribute("id", "avologinput")
theloginput.setAttribute("autofocus", "")
theloginput.setAttribute("autocomplete", "off")
theloginput2.appendChild(theloginput)
var thestyle = document.createElement("style")
thestyle.id = "avostyle"
thestyle.innerText = "@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');"
thestyle.innerText += ".avodevtools {font-family: Roboto;}"
thestyle.innerText += ".avodevtools {position: fixed; right: 8px; top: 8px; bottom: 8px; width: 500px; background: black; color: white; border-radius: 2.5px; text-align: center; z-index: 9999999999;}"
thestyle.innerText += ".avoelements {cursor: pointer; outline: none; background: transparent; color: #aaa; font-size: 20px; border: 2px solid blue; margin: 0; margin-top: 10px; border-right: none; border-left: none;}"
thestyle.innerText += ".avoelements:hover {background: #1c1c1c;}"
thestyle.innerText += ".avothecode {border: 1px solid white; margin: 5px; margin-top: 10px; border-radius: 2.5px; padding: 5px; overflow: scroll; text-align: left; height: 90%;}"
thestyle.innerText += ".avoedit {cursor: pointer; outline: none; background: transparent; color: #aaa; font-size: 20px; border: 2px solid blue; border-radius: 2.5px 0 0 2.5px; margin: 0; margin-top: 10px; margin-left: 5px;}"
thestyle.innerText += ".avoedit:hover {background: #1c1c1c;}"
thestyle.innerText += ".avoxray {cursor: pointer; outline: none; background: transparent; color: #aaa; font-size: 20px; border: 2px solid blue; margin: 0; margin-top: 10px; border-left: none;}"
thestyle.innerText += ".avoxray:hover {background: #1c1c1c;}"
thestyle.innerText += ".avoconsole {cursor: pointer; outline: none; background: transparent; color: #aaa; font-size: 20px; border: 2px solid blue; border-radius: 0 2.5px 2.5px 0; margin: 0; margin-top: 10px;}"
thestyle.innerText += ".avoconsole:hover {background: #1c1c1c;}"
thestyle.innerText += ".avoclosebtn {cursor: pointer; outline: none; background: transparent; color: #aaa; font-size: 20px; border: 2px solid blue; border-radius: 2.5px; margin-right: 10px; margin-top: 10px; float: right;}"
thestyle.innerText += ".avoclosebtn:hover {background: #1c1c1c;}"
thestyle.innerText += ".avoactive {background: blue; color: white;}"
thestyle.innerText += ".avoactive:hover {background: blue;}"
thestyle.innerText += "#avologinput {outline: none; border: none; width: 100%; font-size: 15px;background:black;color:white;}"
thestyle.innerText += ".avologinput2 {display: flex; font-size: 15px;margin: 10px; display: none;}"
thestyle.innerText += ".avolog {padding: 2.5px; border-radius: 2.5px; font-size: 15px;margin: 10px; text-align: left;}"
thestyle.innerText += "#avologs {max-height: 89%; overflow: scroll;display: none;}"
thestyle.innerText += ".avoerror {color: red; background: lightpink; padding: 2.5px; border-radius: 2.5px; font-size: 15px;margin: 10px; text-align: 
thestyle.innerText += ".avowarn {color: black; background: yellow; padding: 2.5px; border-radius: 2.5px; font-size: 15px;margin: 10px; text-align: 
thestyle.innerText += "::-webkit-scrollbar {display: none;}"
document.getElementsByTagName("body")[0].appendChild(thestyle)
var thescript = document.createElement("script")
thescript.id = "avoscript"
thescript.innerText += 'console.log = function(text) {var log = document.createElement("p");log.innerText = text;log.className = "avolog";document.getElementById("avologs").appendChild(log);var logs = document.getElementById("avologs");logs.scrollTop = 
thescript.innerText += 'console.warn = function(text) {var log = document.createElement("p");log.innerText = text;log.className = "avowarn";document.getElementById("avologs").appendChild(log);var logs = document.getElementById("avologs");logs.scrollTop = 
thescript.innerText += 'console.error = function(text) {var log = document.createElement("p");log.innerText = text;log.className = "avoerror";document.getElementById("avologs").appendChild(log);var logs = document.getElementById("avologs");logs.scrollTop = 
thescript.innerText += 'console.clear = function() {document.getElementById("avologs").innerText = "";console.log("Console was cleared");};'
thescript.innerText += 'window.onerror = function (err, url, line) {var log = document.createElement("p");if (url == "") {url = "<anonymous>"};log.innerText = err + " at " + url + ":" + line;log.className = "avoerror";document.getElementById("avologs").appendChild(log);var logs = document.getElementById("avologs");logs.scrollTop = 
thescript.innerText += 'function runcode(code) {var res = eval(code);console.log(res);};'
thescript.innerText += 'loginput = document.getElementById("avologinput");loginput.addEventListener("keyup", function onEvent(e) {;if (e.keyCode === 13) {;if (this.value !== "") {;if (!this.value.startsWith("console.log") && !this.value.startsWith("console.warn") && !this.value.startsWith("console.error")) {console.log(this.value)};var code = this.value;this.value = "";runcode(
thescript.innerText += 'function avogoconsole() {var logs = document.getElementById("avologs"); var loginput2 = document.getElementsByClassName("avologinput2")[0]; var thecode = document.getElementsByClassName("avothecode")[0]; logs.style.display = "inherit"; loginput2.style.display = "flex"; thecode.style.display = "none"; document.getElementById("avologinput").focus(); var elements = document.getElementsByClassName("avoelements")[0]; var console = document.getElementsByClassName("avoconsole")[0]; elements.classList.remove("avoactive"); console.classList.add("
thescript.innerText += 'function avogoelements() {var logs = document.getElementById("avologs"); var loginput2 = document.getElementsByClassName("avologinput2")[0]; var thecode = document.getElementsByClassName("avothecode")[0]; logs.style.display = "none"; loginput2.style.display = "none"; thecode.style.display = "inherit"; document.getElementById("avologinput").focus(); var elements = document.getElementsByClassName("avoelements")[0]; var console = document.getElementsByClassName("avoconsole")[0]; elements.classList.add("avoactive"); console.classList.remove("avoactive");}'
thescript.innerText += 'function avoclosedevtools() {var devtools = document.getElementById("avodevtools"); document.body.removeChild(devtools);var devtools = document.getElementById("avostyle"); document.body.removeChild(devtools);var devtools = document.getElementById("avoscript"); document.body.removeChild(devtools)}'
document.getElementsByTagName("body")[0].appendChild(thescript)
// Loading Message
console.log('Loading...');
// Define Commands
function bcjsHelp() {
  console.log('---');
  console.log('Functions');
  console.log('---');
  console.log('bcjsHelp()');
  console.log('Logs this list again');
  console.log('---');
  console.log('bcjsGui()');
  console.log('Loads Computer GUI');
  console.log('---');
  console.log('bcjsMobileGui()');
  console.log('Loads Mobile GUI');
  console.log('---');
  console.log('bcjsGetDailyRewards()');
  console.log('Gets daily 500 gold 300 xp');
  console.log('---');
  console.log('bcjsEveryAnswerCorrect()');
  console.log('Functions');
  console.log('---');
}
function bcjsGui() {bcjsEXEC = document.createElement("script");bcjsEXEC.type = "text/javascript";bcjsEXEC.src = "https://raw.githubusercontent.com/Huzunian/Blooket-Cheats/main/obfuscated/gui.js";document.body.appendChild(bcjsEXEC);}
function bcjsMobileGui() {bcjsEXEC = document.createElement("script");bcjsEXEC.type = "text/javascript";bcjsEXEC.src = "https://raw.githubusercontent.com/Huzunian/Blooket-Cheats/main/obfuscated/mobileGui.js";document.body.appendChild(bcjsEXEC);}
function bcjsGetDailyRewards() {bcjsEXEC = document.createElement("script");bcjsEXEC.type = "text/javascript";bcjsEXEC.src = "https://raw.githubusercontent.com/Huzunian/Blooket-Cheats/main/obfuscated/global/getDailyRewards.js";document.body.appendChild(bcjsEXEC);}
function bcjsEveryAnswerCorrect() {bcjsEXEC = document.createElement("script");bcjsEXEC.type = "text/javascript";bcjsEXEC.src = "https://raw.githubusercontent.com/Huzunian/Blooket-Cheats/main/obfuscated/global/everyAnswerCorrect.js";document.body.appendChild(bcjsEXEC);}
// Loading Finished
console.log('Done!');console.log('Type bcjsHelp() for help!');

