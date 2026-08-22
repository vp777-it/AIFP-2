# AIFP-2 Roadmap

## Status legend

- **Complete:** merged and reproducible in the canonical source.
- **Candidate:** source exists and automated checks pass; release evidence is incomplete.
- **Blocked:** a known release gate is open.
- **Planned:** specification or implementation work has not completed.

## Release gates

| Gate | Status | Acceptance evidence |
|---|---|---|
| Protocol and object schemas | **Candidate** | Specification and schemas reviewed together |
| x402 v2 EVM exact-payment adapter (SDK scope) | **Complete** | Merged source and named tests for v2 headers, CAIP-2 and EIP-3009 |
| Cross-component x402 v2 route | **Blocked** | SDK, backend, verifier, settlement, receipt and protected-resource E2E |
| Canonical EVM `0/0` contract profile | **Candidate** | Frozen source, independent review, bytecode/runtime pin |
| Backend transaction-plan ABI parity | **Blocked** | Generated calldata matches the deployed contract ABI |
| Invoice → settlement → receipt lifecycle | **Blocked** | Durable state and receipt issuance after verified settlement |
| Clean SDK/MCP installation | **Candidate** | Published packages installed from an empty project |
| Polygon acceptance route | **Blocked** | Real paid E2E through SDK, backend, contract, verifier and receipt |
| Solana acceptance route | **Planned** | Deployable SBF artifact and behavioral security tests |
| Casper acceptance route | **Planned** | v3 entrypoint parity and paid E2E |
| NEAR and Aptos acceptance routes | **Planned** | Canonical implementations, verification and E2E |
| Independent security review | **Blocked** | Named reviewer approval and remediation closeout |
| Production activation | **Blocked** | Every production gate in `docs/deployment-evidence.md` passes |

## Scope order

1. Freeze one Polygon AIFP-2 vertical slice.
2. Resolve ABI, receipt lifecycle and legacy-route isolation.
3. Complete testnet acceptance, then controlled mainnet activation.
4. Publish SDK/MCP release candidates from the accepted source.
5. Apply the same evidence contract to additional networks one at a time.

No network is promoted because a contract address exists. Promotion requires current, reproducible, cross-component evidence.
