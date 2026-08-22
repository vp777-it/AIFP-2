# Network Matrix

The matrix separates four facts that must never be collapsed into one marketing number:

1. source or adapter exists;
2. a contract/program has been observed on mainnet;
3. the canonical AIFP-2 `0/0` route is deployed and pinned;
4. a clean paid E2E has passed.

## Current protocol surfaces

| Network | Identifier | Family | Implementation repository | Current AIFP-2 status |
|---|---|---|---|---|
| [Polygon](https://polygon.technology/) | `eip155:137` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Canonical first acceptance target; `0/0` production activation pending |
| [Avalanche C-Chain](https://www.avax.network/) | `eip155:43114` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Source/adaptor surface; activation evidence pending |
| [Arbitrum One](https://arbitrum.io/) | `eip155:42161` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Source/adaptor surface; activation evidence pending |
| [BNB Smart Chain](https://www.bnbchain.org/) | `eip155:56` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Decimal-accounting remediation must be merged and redeployed |
| [Base](https://www.base.org/) | `eip155:8453` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Source/adaptor surface; activation evidence pending |
| [Unichain](https://www.unichain.org/) | `eip155:130` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Source/adaptor surface; activation evidence pending |
| [Optimism](https://www.optimism.io/) | `eip155:10` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Legacy deployment exists; canonical `0/0` route pending |
| [BOT Chain](https://botchain.ai/) | `eip155:677` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Legacy deployment exists; canonical `0/0` route pending |
| [XRPL EVM](https://xrplevm.org/) | `eip155:1440000` | EVM | [evm-contract](https://github.com/AiFinPay/evm-contract) | Legacy deployment exists; canonical `0/0` route pending |
| [Solana](https://solana.com/) | `solana:<genesis-hash>` | SVM | [solana-contract](https://github.com/AiFinPay/solana-contract) | Source candidate; deployable-artifact and behavioral gates pending |
| [NEAR](https://near.org/) | ecosystem profile | WASM | AiFinPay/near-contract | Private implementation lane; acceptance pending |
| [Aptos](https://aptosfoundation.org/) | `aptos:1` | Move | AiFinPay/aptos-contract | Private implementation lane; acceptance pending |
| [Casper](https://casper.network/) | ecosystem profile | WASM | [casper-contract](https://github.com/AiFinPay/casper-contract) | v3 source candidate; entrypoint/E2E acceptance pending |

## Promotion states

```text
PLANNED
→ SOURCE_CANDIDATE
→ DEPLOYED_DISABLED
→ VERIFIED_DISABLED
→ E2E_ACCEPTED
→ PAYMENTS_LIVE
→ SUSPENDED or RETIRED
```

Only `PAYMENTS_LIVE` may be advertised as payable. A historical deployment, explorer page, SDK enum or read-only balance adapter does not satisfy that state.

## Logos and trademarks

Network names and logos identify interoperability targets. They remain the property of their respective owners and do not imply endorsement or partnership.

