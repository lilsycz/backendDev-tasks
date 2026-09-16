import express from "express";
const app = express();
const PORT = 3000;

app.use (express.json());

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}!`);
});

type Party = {
    id: number;
    name: string;
    leader: string;
    seats: number;
};

let parties: Party[] = [
    { id: 1, name: "Socialdemokraterna", leader: "Magdalena Andersson", seats: 106 },
    { id: 2, name: "Sverigedemokraterna", leader: "Jimmie Åkesson", seats: 70 },
    { id: 3, name: "Moderaterna", leader: "Ulf Kristersson", seats: 66 },
    { id: 4, name: "Centerpartiet", leader: "Elisabeth Thand Ringqvist", seats: 24 },
    { id: 5, name: "Vänsterpartiet", leader: "Nooshi Dadgostar", seats: 21 },
    { id: 6, name: "Kristdemokraterna", leader: "Ebba Busch", seats: 19 },
    { id: 7, name: "Miljöpartiet", leader: "Amanda Lind", seats: 18 },
    { id: 8, name: "Liberalerna", leader: "Simona Mohamsson", seats: 16 },
];

app.get("/parties", (req, res) => {
    res.json(parties);
});

app.post("/parties", (req, res) => {
    const newParty = {
        id: parties.length+1,
        name: req.body.name,
        leader: req.body.leader,
        seats: req.body.seats,
    };
    if (!newParty.name || !newParty.leader) {
        return res.status(400).json({message: "Something is missing!"});
    }
    parties.push(newParty);
    res.status(201).json({message: "Party added sucessfully!", parties});
});

app.get("/parties/seats-total", (req, res) => {
    const totalParties = parties.reduce((sum,party) => sum + party.seats, 0);
    res.json({totalParties});
});

app.put("/parties/:id", (req, res) => {
    const partyId = parseInt(req.params.id);
    const party = parties.find((p)=> p.id === partyId);
    if (!party) {
        return res.status(404).json({message: "Party not found!"});
    };
    party.name = req.body.name || party.name;
    party.leader = req.body.leader || party.leader;
    party.seats = req.body.seats || party.seats;
    res.json({message: "Party updated sucessfully!", parties});
});

app.delete("/parties/:id", (req, res) => {
    const partyId = parseInt(req.params.id);
    parties = parties.filter((p)=> p.id !== partyId);
    res.json({message: "Party deleted!"});
});