
/**
 * Created by pyxru on 25.08.17.
 */


let model = new lanurite.Models({name: "Yura"});
document.getElementById("test").innerHTML = model.get("name");

model.on("change", function (e){
    console.log(e)
    document.getElementById("test").innerText = model.get("name");
})

let collection = new lanurite.Collections();

collection.on("add", function(model){
    document.getElementById("collection").innerHTML+=model.get("l_id") + "<br>"
})