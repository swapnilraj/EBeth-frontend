# Ebeth Front-End
This is a repo for the Front-End of the EBeth betting app.

# Pre-requisites:

* Contracts deployed on your preference of network
* node
* [Metamask](https://metamask.io/)

# How to run?

The first thing to do would be to export the address of the betting contract like so:

``` 
export  BETMANAGER_ADDRESS=0x19ab6a9e79288f22e3a8536684991f0c2656d3fe
```
__Note: This betManager address contains outdated matches, it would be a better idea to deploy a new one__

#### Install Depedencies

```
yarn install
```

#### Running dev-server
```
yarn dev
```

# Front-end Stack

* React
* Redux
* TypeScript
* TypeStyle

# Contract Interaction Functions
[Documentation](./src/ethereum/)
