# Security Model

## Assets protected

- payer funds and signing keys;
- merchant/provider entitlement;
- payment requirements, route pins and receipts;
- ledger integrity and replay state;
- resource access and quota state;
- agent policy and identity bindings.

## Threats and controls

| Threat | Required control |
|---|---|
| Malicious quote changes payee or amount | Bind fields; compare against trusted policy and route registry |
| Wrong-chain signing | CAIP-2/chain-id check from the connected RPC and wallet |
| Counterfeit or wrong-decimal token | Independent token allowlist and on-chain decimals check |
| Stale or malicious contract | Address + runtime hash + economics pin before signature |
| Replay or double receipt | Unique payment ID, nonce, expiry and atomic consume |
| Fake transaction hash | Semantic RPC/program verification and finality policy |
| ABI mismatch | Canonical ABI artifact and calldata conformance vectors |
| Server failure after settlement | Durable reconciliation state; never charge again automatically |
| Facilitator compromise | Facilitator cannot override independent pins or wallet policy |
| Indexer reorg/finality error | Confirmation depth/finality, rollback and reconciliation |
| Route confusion | Explicit `route_class`, economics and contract profile |

## Key custody

AIFP-2 is non-custodial by default. Signing happens in the payer wallet boundary. Backend services may construct unsigned transaction plans and broadcast signed payloads, but must not receive raw private keys or recovery phrases.

## Verification rule

```text
client claim
≠ proof

authoritative chain/program data
+ canonical route definition
+ finality policy
+ replay state
= verified settlement
```

## Audit status

Internal and automated reviews do not replace an independent external audit. Each production route must publish reviewer approval, frozen artifact evidence and paid E2E acceptance before activation.

