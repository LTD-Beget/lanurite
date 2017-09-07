/**
 * Created by pyxru on 25.08.17.
 */


let model = new Lanurite.Model({name: "Yura"});
document.getElementById("test").innerHTML = model.get("name");

model.on("change", function (e) {
    document.getElementById("test").innerHTML = model.get("name")
    if (model.get("name") == "Yura") {
        return alert("Privet")
    }
    return alert("Papa")

})

let collection = new Lanurite.Collection();

collection.on("add", function (model) {
    document.getElementById("collection").innerHTML += model.get("name") + "<br>"
})

collection.on("clear", function () {
    document.getElementById("collection").innerHTML = "";
});

collection.on("reset", function () {
    document.getElementById("collection").innerHTML = "";
});