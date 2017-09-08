# Lanurite
Library for Models and Collection use in JS worlds

[![NPM](https://nodei.co/npm/lanurite.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/lanurite/)

**For use in browser**

`<script src="../dist/lanurite.js"></script>`

**For use in TypeScript**

```
import * as Lanurite from "lanurite"
console.log(Lanurite.version)

```

**For use in NodeJS**

```
var Lanurite = require("lanurite");
console.log(Lanurite.version)
```

## Example

```javascript

let model = new Lanurite.Model({name: "Robot"});
document.getElementById("test").innerHTML = model.get("name");

model.on("change", function (e) {
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
```
