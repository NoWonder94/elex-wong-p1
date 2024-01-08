#!/bin/sh

./node_modules/.bin/truffle-flattener source/token/ERC20/ERC20WithSupply.sol > build/flattened_contracts/ERC20WithSupply.sol
./node_modules/.bin/truffle-flattener source/emails.com/airdrop.sol > build/flattened_contracts/emailsComAirdrop.sol
# Remove duplicate license identifiers from the flattened file (build error)
perl -pi -e 's/SPDX-License-Identifier//g' build/flattened_contracts/ERC20WithSupply.sol
perl -pi -e 's/SPDX-License-Identifier//g' build/flattened_contracts/emailsComAirdrop.sol

# Compile contracts
#solc-select use 0.7.1
#solc source/token/ERC20/ERC20WithSupply.sol --allow-paths .,node_modules/ --base-path . --combined-json abi,asm,ast,bin,bin-runtime,devdoc,opcodes,srcmap,srcmap-runtime,userdoc > ./compiled/ERC20WithSupply.json
#solc source/finance/VestingWallet.sol --combined-json abi,asm,ast,bin,bin-runtime,devdoc,opcodes,srcmap,srcmap-runtime,userdoc > ./compiled/VestingWallet.json
#solc source/token/ERC20/utils/TokenTimelock.sol --combined-json abi,asm,ast,bin,bin-runtime,devdoc,opcodes,srcmap,srcmap-runtime,userdoc > ./compiled/TokenTimelock.json
truffle compile

# Flatten contracts for verification
#./node_modules/.bin/poa-solidity-flattener source/token/ERC20/ERC20WithSupply.sol
#./node_modules/.bin/poa-solidity-flattener source/finance/VestingWallet.sol
#./node_modules/.bin/poa-solidity-flattener source/token/ERC20/utils/TokenTimelock.sol

