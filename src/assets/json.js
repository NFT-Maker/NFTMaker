const abc = {
  abi5: [
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "changeName",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_num",
          type: "uint256",
        },
      ],
      name: "changeNum",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "viewName",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "viewNum",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  bytecode5:
    "608060405234801561001057600080fd5b50610599806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632b311337146100515780635353a2d81461006d57806354c5b14814610089578063b5f10b38146100a7575b600080fd5b61006b600480360381019061006691906102f6565b6100c5565b005b610087600480360381019061008291906102ad565b6100cf565b005b6100916100e9565b60405161009e919061038d565b60405180910390f35b6100af6100f3565b6040516100bc919061036b565b60405180910390f35b8060018190555050565b80600090805190602001906100e5929190610185565b5050565b6000600154905090565b60606000805461010290610466565b80601f016020809104026020016040519081016040528092919081815260200182805461012e90610466565b801561017b5780601f106101505761010080835404028352916020019161017b565b820191906000526020600020905b81548152906001019060200180831161015e57829003601f168201915b5050505050905090565b82805461019190610466565b90600052602060002090601f0160209004810192826101b357600085556101fa565b82601f106101cc57805160ff19168380011785556101fa565b828001600101855582156101fa579182015b828111156101f95782518255916020019190600101906101de565b5b509050610207919061020b565b5090565b5b8082111561022457600081600090555060010161020c565b5090565b600061023b610236846103cd565b6103a8565b9050828152602081018484840111156102575761025661052c565b5b610262848285610424565b509392505050565b600082601f83011261027f5761027e610527565b5b813561028f848260208601610228565b91505092915050565b6000813590506102a78161054c565b92915050565b6000602082840312156102c3576102c2610536565b5b600082013567ffffffffffffffff8111156102e1576102e0610531565b5b6102ed8482850161026a565b91505092915050565b60006020828403121561030c5761030b610536565b5b600061031a84828501610298565b91505092915050565b600061032e826103fe565b6103388185610409565b9350610348818560208601610433565b6103518161053b565b840191505092915050565b6103658161041a565b82525050565b600060208201905081810360008301526103858184610323565b905092915050565b60006020820190506103a2600083018461035c565b92915050565b60006103b26103c3565b90506103be8282610498565b919050565b6000604051905090565b600067ffffffffffffffff8211156103e8576103e76104f8565b5b6103f18261053b565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610451578082015181840152602081019050610436565b83811115610460576000848401525b50505050565b6000600282049050600182168061047e57607f821691505b60208210811415610492576104916104c9565b5b50919050565b6104a18261053b565b810181811067ffffffffffffffff821117156104c0576104bf6104f8565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b6105558161041a565b811461056057600080fd5b5056fea2646970667358221220fda374c023bca393f1aabee726941e51f93fc146e85f91f6d046bb12cc10659e64736f6c63430008070033",
};

var jsonData11 = JSON.stringify(abc);

console.log(jsonData11);
