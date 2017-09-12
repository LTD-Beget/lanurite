let collectionEl = $("<ul></ul>")
$("body").append(collectionEl)
let model = new Lanurite.Model({"name": "Robot"})
let collection = new Lanurite.Collection([{"name": "1"}, {"name": "Person2"}, {name: "Person3"}, {"name": "Person4"}, model]);
collection.each((model)=>{
    model.on("change",()=>{
        model.get("el").text(model.get("name"))
    })

    model.on("destroy", () =>{
        model.get("el").remove()
    })

})
function initCollection() {
    collectionEl.html("")
    collection.each((model)=>{
        let modelEl = $("<li></li>")
        modelEl.text(model.get("name"))
        model.set("el", modelEl)
        collectionEl.append(modelEl)

    })
}

collection.on("reset", initCollection)

initCollection()
