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
| Agent SDK + MCP | [`AiFinPay/sdk`](https://github.com/AiFinPay/sdk) | Client payment flow and facilitator adapters | x402 v2 EVM adapter/tests and settlement RC PR #26 are merged; package rollout and paid route acceptance are separate |
| x402 v2 adapter | [`standard-x402.ts`](https://github.com/AiFinPay/sdk/blob/main/node/src/facilitators/standard-x402.ts) | `PAYMENT-REQUIRED`, `PAYMENT-SIGNATURE`, CAIP-2, EIP-3009 and legacy-v1 compatibility | Non-EVM standard offers currently fail closed |
| x402 conformance tests | [`x402-v2-is-named.test.ts`](https://github.com/AiFinPay/sdk/blob/main/node/tests/x402-v2-is-named.test.ts) | Transport and EVM exact-payment regression checks | Unit/conformance evidence, not paid E2E evidence |
| Platform/backend | [`AiFinPay/aifinpay-web` PR #22](https://github.com/AiFinPay/aifinpay-web/pull/22) (private) | Unified 13-network route discovery/invoice control plane | Open stacked source RC, currently dependent on PR #17 and not mergeable; not deployed/live |
| EVM settlement | [`AiFinPay/evm-contract` PR #9](https://github.com/AiFinPay/evm-contract/pull/9) | Immutable v1.3 `100/0` and `0/0` route profiles | Open source candidate; human review, deployment, runtime readback and paid E2E pending |
| Solana | [`AiFinPay/solana-contract` PR #4](https://github.com/AiFinPay/solana-contract/pull/4) | New settlement-only program with AIFP-1 and AIFP-2 profiles | Open source-level production RC; new deploy/config/E2E/unpause pending |
| Stellar facilitator | [`AiFinPay/stellar-x402-facilitator`](https://github.com/AiFinPay/stellar-x402-facilitator) | Planned self-hostable Stellar x402 facilitator | Design / implementation-ready proposal; not a production facilitator |
| Stellar contracts | `AiFinPay/stellar-contract` (private) | Soroban settlement and passport-related experiments | Separate implementation surface; requires protocol conformance and deployment evidence |
| Casper | [`AiFinPay/casper-contract` PR #13](https://github.com/AiFinPay/casper-contract/pull/13) | Canonical native-CSPR settlement v3 | Open source-level production RC; deployment, review and paid E2E pending |
| NEAR / Aptos candidates | backend RC branch under `release-candidates/non-evm/` | Native-only replacement candidates | Source/CI candidates; no production activation or token-path claim |

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
| SDK/MCP settlement v2 RC exists | SDK PR #26 merged to `main` | **Source RC merged; publication/deployment/E2E pending** |
| 13-network backend control plane exists | Backend PR #22 | **Open stacked source RC; not merged or deployed** |
| Canonical EVM/Solana/Casper settlement candidates exist | Contract PRs #9/#4/#13 | **Open source RCs; routes remain disabled** |
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
