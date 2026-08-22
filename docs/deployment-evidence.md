# Deployment Evidence Contract

A route may move to `PAYMENTS_LIVE` only when every item below has current evidence.

## Source and build

- canonical repository, tag and commit SHA;
- compiler/toolchain versions and lockfiles;
- deterministic or reproducible build command;
- generated ABI/IDL/module metadata;
- independent human review and security closeout.

## Deployment

- network identifier and environment;
- contract/program/module address;
- deploy transaction, block/slot and deployer;
- runtime bytecode/program hash compared with the frozen artifact;
- owner, upgrade authority, treasury and emergency authority;
- exact supported assets, addresses/mints and decimals;
- route economics and activation flag.

## Cross-component conformance

- SDK and backend use the same ABI/IDL and selectors;
- transaction plan matches the contract/program function exactly;
- verifier checks the same event/instruction semantics;
- receipt and ledger bind the same `payment_id` and resource;
- legacy routes cannot receive new canonical traffic.

## Paid acceptance

At least one real native or stable-asset payment, as applicable, must demonstrate:

1. 402/payment requirement;
2. wallet policy approval and local signing;
3. settlement against the pinned deployment;
4. merchant/provider balance change;
5. exact AIFP-2 `0/0` economics;
6. event/instruction verification;
7. receipt issuance and protected-resource retry;
8. ledger/indexer reconciliation;
9. replay, expiry and tamper rejection;
10. monitoring and rollback procedure.

Evidence must be recent enough to describe the deployed release, not a superseded contract.

