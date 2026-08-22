# Architecture

```mermaid
flowchart TB
  subgraph Client["Payer trust boundary"]
    Agent["AI agent"] --> Policy["AIFP-6 policy"]
    Policy --> Wallet["Local wallet / signer"]
    Passport["AIFP-3 passport"] -. optional identity .-> Policy
    Auth["AIFP-5 authorization"] -. optional profile .-> Wallet
  end
  Resource["API / MCP / digital service"] --> Gateway["402 + quote gateway"]
  Agent --> Resource
  Gateway --> Wallet
  Wallet --> Rail["Settlement rail"]
  Rail --> Verifier["Verifier + finality"]
  Verifier --> Ledger["Durable payment state"]
  Ledger --> Receipt["Signed receipt"]
  Receipt --> Agent
  Agent --> Resource
```

## Components

| Component | Owns | Must not own |
|---|---|---|
| Resource server | access decision, price reference, receipt validation | payer key |
| Quote gateway | accepted routes, immutable transaction plan | authority to change wallet policy |
| Wallet | local keys, policy enforcement, signature | server-side custody by default |
| Contract/program | deterministic settlement, replay guard, events | HTTP access decision |
| Verifier | chain semantics and finality | trust a client hash blindly |
| Ledger/indexer | durable state, reconciliation, evidence | redefine on-chain outcome |
| Receipt service | signed access proof | issue before verification |

## State machine

```mermaid
stateDiagram-v2
  [*] --> CHALLENGED
  CHALLENGED --> AUTHORIZED
  AUTHORIZED --> BROADCAST
  BROADCAST --> CONFIRMING
  CONFIRMING --> VERIFIED
  CONFIRMING --> FAILED
  VERIFIED --> RECEIPT_ISSUED
  RECEIPT_ISSUED --> CONSUMED
  FAILED --> RECONCILING
  RECONCILING --> VERIFIED
  RECONCILING --> FAILED
```

Financial state transitions require durable idempotency and append-only evidence. Redis or an in-memory cache alone is not a canonical financial ledger.

