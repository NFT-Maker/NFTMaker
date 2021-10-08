const main = {
    mainAbi: [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "_owner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "_approved",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "_from",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "_to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_who",
                    type: "address",
                },
                {
                    internalType: "string",
                    name: "_url",
                    type: "string",
                },
            ],
            name: "NFT",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            name: "NFTCount",
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
        {
            inputs: [],
            name: "NFTId",
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
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "NFTToOwner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "NFTUrl",
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
            inputs: [
                {
                    internalType: "address",
                    name: "_to",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_owner",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    internalType: "uint256",
                    name: "_balance",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "ownerOf",
            outputs: [
                {
                    internalType: "address",
                    name: "_owner",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "takeOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_to",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_tokenId",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ],
    mainCA: "0xE6b4A5770a606E1b0E334c8e5136057f47048B4e",
};

module.exports(main);
