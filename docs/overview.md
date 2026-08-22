# Overview

AIFP-2 is an open payment-execution protocol for software agents and machine-to-machine commerce. It standardizes the boundary between a paid resource, an autonomous payer, a policy-aware wallet, a settlement rail and a verifier.

## Design goals

- HTTP-native discovery through `402 Payment Required`.
- Machine-readable price and settlement terms.
- Local, non-custodial signing.
- Explicit network, asset and fee profiles.
- Verifiable receipts with replay resistance.
- x402 v2 interoperability through an optional compatibility adapter.
- Multiple settlement rails without changing the protected-resource contract.

## Non-goals

- Holding customer funds or private keys.
- Treating a blockchain transaction hash as proof without semantic verification.
- Claiming that every contract deployment has full SDK/backend/indexer support.
- Replacing AIFP-1 merchant traffic monetization, AIFP-3 identity, AIFP-4 banking, AIFP-5 authorization or AIFP-6 governance.

## Trust boundaries

The agent may distrust the resource server, quote service, facilitator, RPC and indexer. The resource server may distrust the client and any proof it submits. Conforming implementations bind every value before signature and independently verify the final settlement.

