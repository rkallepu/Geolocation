//Test on Design Patterns
//addy osmani
//Stoyan Stefanov
function Security(){
    Security.instance = Security.instance || this;
    return Security.instance;
}
var service = new Security();
var op = new Security();
console.log(service === op);	//true

