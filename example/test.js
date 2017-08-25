
/**
 * Created by pyxru on 25.08.17.
 */


let model = new lanurite.Models({name: "Yura"});

let collect = new lanurite.Collections([model]);

collect.has(model);

model.on("set", (el) => {
    console.log(el)
});

model.set("surname", "test");