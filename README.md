# eSocket POS

The eSocket POS offers a simple way for communicating with the eSocket.POS application through their API (i.e., XML request interface)

The code is structure as follow:

```
.
├── src                     # Source code
    ├── eSocketClient       # Connection and communication with socket using TCP.
    ├── example             # Database connection configuration file.
    ├── utils               # Helper functions for converting xml string to bytes array (with required format) and viceversa.
    ├── xmlRequest          # Generating all commands or requests in XML format.
└── README.md               # This file.
```


## How to add this package

run `npm install esocket.pos` or `yarn add esocket.pos`

