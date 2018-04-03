# Contract-Interaction

## Index

### Interfaces

* [IBetInfo](ibetinfo.md)
* [IUserBetInfo](iuserbetinfo.md)


### Functions

* [changeBet](README.md#changebet)
* [getAllClubs](README.md#getallclubs)
* [getAllClubsFull](README.md#getallclubsfull)
* [getAvailableBets](README.md#getavailablebets)
* [getAvailableBetsFromList](README.md#getavailablebetsfromlist)
* [getBetInfo](README.md#getbetinfo)
* [getFullClubName](README.md#getfullclubname)
* [getGamesByClub](README.md#getgamesbyclub)
* [getPastBets](README.md#getpastbets)
* [getPlacedBets](README.md#getplacedbets)
* [getUserAccount](README.md#getuseraccount)
* [getUserBetInfo](README.md#getuserbetinfo)
* [isUserLoggedIn](README.md#isuserloggedin)
* [placeBet](README.md#placebet)



---
## Functions
<a id="changebet"></a>

### «Const» changeBet

► **changeBet**(betEvent: *`string`*, outcomeIndex: *`number`*): `Promise`.<`boolean`>



*Defined in [ethereum/contract-interaction.ts:248](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L248)*



Allows a user to change a bet that they have placed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is changing their bet to. |





**Returns:** `Promise`.<`boolean`>
Boolean indicating if the method was successful.






___

<a id="getallclubs"></a>

### «Const» getAllClubs

► **getAllClubs**(): `string`[]



*Defined in [ethereum/contract-interaction.ts:377](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L377)*



Returns an array of club names used by the contracts.




**Returns:** `string`[]
An array with club names that are in our system.






___

<a id="getallclubsfull"></a>

### «Const» getAllClubsFull

► **getAllClubsFull**(): `string`[]



*Defined in [ethereum/contract-interaction.ts:404](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L404)*



Returns an array of fulllength club names that are in our system.




**Returns:** `string`[]
An array with club names that are in our system.






___

<a id="getavailablebets"></a>

### «Const» getAvailableBets

► **getAvailableBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:278](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L278)*



Returns an array of bets for which the event is not over.




**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is not over.






___

<a id="getavailablebetsfromlist"></a>

### «Const» getAvailableBetsFromList

► **getAvailableBetsFromList**(betEvents: *`string`[]*): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:308](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L308)*



Returns an array of bets for which the event is not over from a list contract addresses.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvents | `string`[]   |  Array of addresses of Betting contracts. |





**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is not over.






___

<a id="getbetinfo"></a>

### «Const» getBetInfo

► **getBetInfo**(betEvent: *`string`*): `Promise`.<[IBetInfo](ibetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:322](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L322)*



Returns information about a bet event.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<[IBetInfo](ibetinfo.md)>
Information about a match that a bet is a available for.






___

<a id="getfullclubname"></a>

### «Const» getFullClubName

► **getFullClubName**(club: *`string`*): `string`



*Defined in [ethereum/contract-interaction.ts:456](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L456)*



Get full club name (for display & crests)


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| club | `string`   |  contract club name |





**Returns:** `string`
full name of club






___

<a id="getgamesbyclub"></a>

### «Const» getGamesByClub

► **getGamesByClub**(club: *`string`*): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:432](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L432)*



Returns an array of bets for a specific club.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| club | `string`   |  The name of the club. |





**Returns:** `Promise`.<`string`[]>
An array of the bets for a specific club.






___

<a id="getpastbets"></a>

### «Const» getPastBets

► **getPastBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:292](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L292)*



Returns an array of bets for which the event is over.




**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is over.






___

<a id="getplacedbets"></a>

### «Const» getPlacedBets

► **getPlacedBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:264](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L264)*



Returns an array of the bet objects for bets placed by a user.




**Returns:** `Promise`.<`string`[]>
Array of addresses of Betting contracts that user placed bet on.






___

<a id="getuseraccount"></a>

### «Const» getUserAccount

► **getUserAccount**(): `Promise`.<`string`>



*Defined in [ethereum/contract-interaction.ts:364](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L364)*



Returns the address of the users account.




**Returns:** `Promise`.<`string`>
The address of the users account.






___

<a id="getuserbetinfo"></a>

### «Const» getUserBetInfo

► **getUserBetInfo**(betEvent: *`string`*): `Promise`.<[IUserBetInfo](iuserbetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:336](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L336)*



Returns information about a bet a user placed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<[IUserBetInfo](iuserbetinfo.md)>
Information about a bet that a user has placed.






___

<a id="isuserloggedin"></a>

### «Const» isUserLoggedIn

► **isUserLoggedIn**(): `Promise`.<`boolean`>



*Defined in [ethereum/contract-interaction.ts:349](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L349)*



Used to check if a user is logged in.




**Returns:** `Promise`.<`boolean`>
A boolean signifying if a user is logged in or not.






___

<a id="placebet"></a>

### «Const» placeBet

► **placeBet**(betEvent: *`string`*, outcomeIndex: *`number`*, value: *`string`*): `Promise`.<`boolean`>



*Defined in [ethereum/contract-interaction.ts:227](https://github.com/swapnilraj/EBeth-frontend/blob/4b57453/src/ethereum/contract-interaction.ts#L227)*



Allows a user to place a bet.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is betting on. |
| value | `string`   |  Amount of Ether the user is betting. |





**Returns:** `Promise`.<`boolean`>
Boolean indicating if the method was successful.






___


