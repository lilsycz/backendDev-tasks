# Riksdag Parties API

A simple CRUD API for managing Swedish Riksdag (2026 election) party data — built as practice for full CRUD patterns (GET, POST, PUT, DELETE) using an in-memory array.

## Routes

### GET /parties
Returns the full list of parties.
Status: 200
<img width="963" height="506" alt="Screenshot 2026-09-16 at 17 30 45" src="https://github.com/user-attachments/assets/06232830-fae0-4864-9516-ce6ed06d600c" />

### GET /parties/seats-total
Returns the total seat count across all parties.
Status: 200
<img width="972" height="196" alt="Screenshot 2026-09-16 at 17 18 27" src="https://github.com/user-attachments/assets/e01b448c-bf95-4609-9b11-d8a30a85ddac" />

### POST /parties
Add a new party.
Request body: `{ "name": "...", "leader": "...", "seats": 0 }`
Status: 201 / 400
<img width="954" height="487" alt="Screenshot 2026-09-16 at 17 24 15" src="https://github.com/user-attachments/assets/e84d97e0-4747-45ba-9bc9-911747e6bbb4" />
<img width="954" height="195" alt="Screenshot 2026-09-16 at 17 24 41" src="https://github.com/user-attachments/assets/9d8317a0-752b-4c77-b002-eafd4a0c08f3" />

### PUT /parties/:id
Updates an existing party by id.
Request body: `{ "name": "...", "leader": "...", "seats": 0 }` (any combination)
Status: 200 / 404
<img width="959" height="332" alt="Screenshot 2026-09-16 at 17 23 04" src="https://github.com/user-attachments/assets/c9353212-bb4f-40a9-9f63-5bedcbdca692" />
<img width="959" height="179" alt="Screenshot 2026-09-16 at 17 23 49" src="https://github.com/user-attachments/assets/497591f4-bcbc-4d24-85d0-5cef024d27e5" />

### DELETE /parties/:id
Removes a party by id.
Status: 200
<img width="961" height="177" alt="Screenshot 2026-09-16 at 17 27 08" src="https://github.com/user-attachments/assets/c63c9e44-c300-42ec-a151-9e1df8695ea6" />
