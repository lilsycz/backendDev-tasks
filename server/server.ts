import express from "express";
const app = express();
const PORT = 3000;

app.use (express.json());

app.get("/", (req, res) => {
    res.send("Here you can get some useful properties for materials!");
});

app.get("/materials", (req, res) => {
    res.json({
        message: `Find the materials you like, if they're not in the base, welcome to message me!`,
        categories: {
            wood: ["Bamboo", "Reclaimed timber", "Cork"],
            biomaterials: ["Mycelium composite", "Bacterial cellulose", "Chitosan"],
            bioplastics: ["PLA", "PHA"],
            plastics: ["PET", "PVC"],
            metals: ["Recycled steel", "Aluminum"],
            fibers: ["Hemp", "Flax", "Wool"],
            composites: ["Concrete"],
        },
        timestamp: new Date().toISOString().split("T")[0],

    });
});

app.get("/about", (req, res) => {
    res.json({
        title: `Sustainable Materials API`,
        description: `This is a free API for architects and designers to access sustainable material properties. 
                    Built by an architect researching low-carbon 3D-printed building materials, 
                    such as mycelium composites and low-carbon concrete. 
                    The data can be used as input for material selection, formulation reference, and parametric design workflows.`
    });
});

app.get("/goals", (req, res) => {
    res.send("Choose sustainable materials — every small change reduces your carbon footprint.");
    /*for returning single objects we can choose res.send */
});


app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}!`);
});


