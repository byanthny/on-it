# On It - Server

This project contains the monolithic server/back-end for *On It*.
The deployed server itself as well as scripts for database
configuration.

## DB Schema

```mermaid
erDiagram
    USER ||--o{ PROJECT: "has many"
    USER ||--o{ TASK: "has many"
    TASK ||--o{ PROJECT: references
    TASK ||--o{ TASK: "has many"
    TASK ||--o{ NOTE: "has many" 
```

## Authentication

```mermaid
sequenceDiagram
    actor C as client
    participant S as Server
    participant R as Session DB
    participant M as Entity DB

    C->>S: POST /register
    Note right of C: email, password
    S->>M: create User document
    M->>S: 
    S->>R: create Session ID store
    S->>C: new Session ID
    C->>S: GET /user
    Note right of C: with header { session: <sesion_ID> }
    S->>R: get session
    R->>S: 
    S->>M: get User document
    M->>S: 
    S->>C: Return user info   
```
