# AIFP-2 Implementation Map

Last reconciled: **2026-08-23**.

This page separates the AIFP-2 protocol from the repositories that currently implement parts of it. A repository, contract address, passing unit test or historical deployment is not by itself evidence that an AIFP-2 route is production-ready.

## Canonical definition

**AIFP-2 is AiFinPay's agent-payment system and payment-execution protocol.** It owns AiFinPay routing, wallet-policy integration, payment requirements, settlement verification and receipts. It also includes a standards-compatible x402 v2 execution profile.

x402 is an external open protocol. AIFP-2 is neither a Coinbase product nor merely a wrapper around one vendor's facilitator. Conversely, AiFinPay does not claim ownership of the x402 standard.

The current AIFP-2 economic profile is:

```text
provider / merchant: provider-defined amount
AiFinPay fee:        0 bps
creator fee:         0 bps
```

AIFP-1 economics must never be substituted into an AIFP-2 route.

## Source precedence

When sources conflict, use this order:

1. current approved product decision and this versioned protocol specification;
2. merged source and tests in the active implementation repository;
3. reproducible deployment, bytecode and paid E2E evidence;
4. release notes tied to a commit and artifact;
5. older Obsidian audits and architecture notes as historical evidence only.

An older note cannot override a newer approved economic or identity model. A deployment register cannot override verified on-chain runtime evidence.

## Active implementation surfaces

| Surface | Repository / source | Current role | Status boundary |
|---|---|---|---|
| Public protocol | [`AiFinPay/AIFP-2`](https://github.com/AiFinPay/AIFP-2) | Normative behavior, schemas, architecture and acceptance rules | Draft 0.1; not a runtime |
| Agent SDK + MCP | [`AiFinPay/sdk`](https://github.com/AiFinPay/sdk) | Client payment flow and facilitator adapters | x402 v2 EVM adapter and named tests are merged on `main`; broader route acceptance is separate |
| x402 v2 adapter | [`standard-x402.ts`](https://github.com/AiFinPay/sdk/blob/main/node/src/facilitators/standard-x402.ts) | `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE`, CAIP-2, EIP-3009 and legacy-v1 compatibility | Non-EVM standard offers currently fail closed |
| x402 conformance tests | [`x402-v2-is-named.test.ts`](https://github.com/AiFinPay/sdk/blob/main/node/tests/x402-v2-is-named.test.ts) | Transport and EVM exact-payment regression checks | Unit/conformance evidence, not paid E2E evidence |
| Platform/backend | `AiFinPay/aifinpay-web` (private) | HTTP gate, transaction planning, verification, receipt and platform integration | Must be reconciled with contract ABI and durable financial state |
| EVM settlement | [`AiFinPay/evm-contract`](https://github.com/AiFinPay/evm-contract) | `B2BSplitter` and EVM settlement surfaces | Deployed/history evidence exists; canonical `0/0` route acceptance remains gated |
| Solana | [`AiFinPay/solana-contract`](https://github.com/AiFinPay/solana-contract) | Solana payment program | Source/deployed instruction parity and paid E2E must be proven before activation |
| Stellar facilitator | [`AiFinPay/stellar-x402-facilitator`](https://github.com/AiFinPay/stellar-x402-facilitator) | Planned self-hostable Stellar x402 facilitator | Design / implementation-ready proposal; not a production facilitator |
| Stellar contracts | `AiFinPay/stellar-contract` (private) | Soroban settlement and passport-related experiments | Separate implementation surface; requires protocol conformance and deployment evidence |
| Casper | [`AiFinPay/casper-contract`](https://github.com/AiFinPay/casper-contract) | Casper settlement implementation | Contract existence does not establish AIFP-2 paid E2E |

## Legacy and experimental surfaces

| Repository | Classification | Rule |
|---|---|---|
| `AiFinPay/aifinpay-x402-gate` (private) | Legacy experiment | May supply evidence or code for migration; must not define current protocol behavior |
| `AiFinPay/aifinpay-agents` (private) | Hackathon/agent experiment | Demonstration surface, not canonical payment infrastructure |
| `AiFinPay/aifinpay-contracts` (private, archived) | Historical contract source | Read-only provenance; new canonical work belongs in active contract repositories |

## What is implemented versus accepted

| Claim | Current evidence | Allowed wording |
|---|---|---|
| x402 v2 EVM transport/profile exists | Merged SDK source and tests | **Implemented in SDK scope** |
| Multiple contract/program deployments exist | Repository and deployment evidence | **Deployed surfaces exist** |
| Read-only and partial payment adapters exist across networks | SDK/contracts and historical audit evidence | **Partial network support** |
| One clean canonical paid vertical slice passes SDK → backend → contract → verifier → receipt → protected resource | Not yet published as current reproducible acceptance evidence | **Not accepted / production gate open** |
| Independent current security audit closes the canonical route | Not published | **Pending** |
| AIFP-2 is globally production-live | Required evidence is incomplete | **Must not be claimed** |

## Release rule

A route becomes `production` only when one frozen version proves all of the following together:

1. canonical network, asset, payee, amount, fee profile and contract/runtime hash;
2. local wallet authorization and correct transaction construction;
3. verified settlement, confirmations/finality and replay protection;
4. durable invoice, settlement, receipt and consumption state;
5. protected-resource delivery bound to the verified payment;
6. current security review and remediation closeout;
7. reproducible paid E2E from a clean environment.

See [deployment evidence](deployment-evidence.md) for the full acceptance contract.
