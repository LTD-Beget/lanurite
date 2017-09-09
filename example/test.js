/**
 * Created by pyxru on 25.08.17.
 */


let model = new Lanurite.Model({name: "Robot"});
document.getElementById("test").innerHTML = model.get("name");

model.on(["change", "reset"], function (e) {
    document.getElementById("test").innerHTML = model.get("name")
    model.off("change", log)
});


let collection = new Lanurite.Collection();

collection.on("add", function (model) {
    document.getElementById("collection").innerHTML += model.get("name") + "<br>"
})

collection.on("clear", function () {
    document.getElementById("collection").innerHTML = "";
});

collection.on("destroy", function () {
    document.getElementById("collection").innerHTML = "";
});

model.on("change", log);

collection.on("reset", function () {
    getCollectionDOM();
});

getCollectionDOM();

function log(event){
    console.log(event)
}

function getCollectionDOM() {
    document.getElementById("collection").innerHTML = "";
    collection.each((el) => {
        document.getElementById("collection").innerHTML += el.get("name") + "<br>"
    });
}