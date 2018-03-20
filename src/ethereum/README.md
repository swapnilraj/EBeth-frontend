# Contract Interaction

## Index

### Interfaces

* [IBetInfo](ibetinfo.md)
* [IUserBetInfo](iuserbetinfo.md)


### Functions

* [changeBet](README.md#changebet)
* [getAllClubs](README.md#getallclubs)
* [getAvailableBets](README.md#getavailablebets)
* [getAvailableBetsFromList](README.md#getavailablebetsfromlist)
* [getBetInfo](README.md#getbetinfo)
* [getGamesByClub](README.md#getgamesbyclub)
* [getPlacedBets](README.md#getplacedbets)
* [getUserBetInfo](README.md#getuserbetinfo)
* [isUserLoggedIn](README.md#isuserloggedin)
* [placeBet](README.md#placebet)



---
## Functions
<a id="changebet"></a>

### «Const» changeBet

► **changeBet**(betEvent: *`string`*, outcomeIndex: *`number`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:193](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L193)*



Allows a user to change a bet that they have placed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is changing their bet to. |





**Returns:** `Promise`.<`void`>





___

<a id="getallclubs"></a>

### «Const» getAllClubs

► **getAllClubs**(): `string`[]



*Defined in [ethereum/contract-interaction.ts:289](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L289)*



Returns an array of club names that are in our system.




**Returns:** `string`[]
An array with club names that are in our system.






___

<a id="getavailablebets"></a>

### «Const» getAvailableBets

► **getAvailableBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:217](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L217)*



Returns an array of bets for which the event is not over.




**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is not over.






___

<a id="getavailablebetsfromlist"></a>

### «Const» getAvailableBetsFromList

► **getAvailableBetsFromList**(betEvents: *`string`[]*): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:233](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L233)*



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



*Defined in [ethereum/contract-interaction.ts:247](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L247)*



Returns information about a bet event.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<[IBetInfo](ibetinfo.md)>
Information about a match that a bet is a available for.






___

<a id="getgamesbyclub"></a>

### «Const» getGamesByClub

► **getGamesByClub**(club: *`string`*): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:317](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L317)*



Returns an array of bets for a specific club.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| club | `string`   |  The name of the club. |





**Returns:** `Promise`.<`string`[]>
An array of the bets for a specific club.






___

<a id="getplacedbets"></a>

### «Const» getPlacedBets

► **getPlacedBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:203](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L203)*



Returns an array of the bet objects for bets placed by a user.




**Returns:** `Promise`.<`string`[]>
Array of addresses of Betting contracts that user placed bet on.






___

<a id="getuserbetinfo"></a>

### «Const» getUserBetInfo

► **getUserBetInfo**(betEvent: *`string`*): `Promise`.<[IUserBetInfo](iuserbetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:261](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L261)*



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



*Defined in [ethereum/contract-interaction.ts:274](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L274)*



Used to check if a user is logged in.




**Returns:** `Promise`.<`boolean`>
A boolean signifying if a user is logged in or not.






___

<a id="placebet"></a>

### «Const» placeBet

► **placeBet**(betEvent: *`string`*, outcomeIndex: *`number`*, value: *`string`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:179](https://github.com/swapnilraj/EBeth-frontend/blob/74798eb/src/ethereum/contract-interaction.ts#L179)*



Allows a user to place a bet.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is betting on. |
| value | `string`   |  Amount of Ether the user is betting. |





**Returns:** `Promise`.<`void`>





___


