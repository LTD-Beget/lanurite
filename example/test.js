
/**
 * Created by pyxru on 25.08.17.
 */


let model = new lanurite.Models({name: "Yura"});
document.getElementById("test").innerHTML = model.get("name");

model.on("change", function (e){
    document.getElementById("test").innerHTML=model.get("name")
    if (model.get("name") == "Yura"){
        return alert("Privet")
    }
    return alert("Papa")

})

let collection = new lanurite.Collections();

collection.on("add", function(model){
    document.getElementById("collection").innerHTML+=model.get("name") + "<br>"
})