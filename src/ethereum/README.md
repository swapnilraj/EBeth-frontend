# Contract Interaction

## Index

### Interfaces

* [IBetInfo](ibetinfo.md)
* [IUserBetInfo](iuserbetinfo.md)


### Functions

* [changeBet](README.md#changebet)
* [claimWinnings](README.md#claimwinnings)
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



*Defined in [ethereum/contract-interaction.ts:191](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L191)*



Allows a user to change a bet that they have placed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is changing their bet to. |





**Returns:** `Promise`.<`void`>





___

<a id="claimwinnings"></a>

### «Const» claimWinnings

► **claimWinnings**(betEvent: *`string`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:201](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L201)*



Allows a user to claim their winnings


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<`void`>





___

<a id="getallclubs"></a>

### «Const» getAllClubs

► **getAllClubs**(): `string`[]



*Defined in [ethereum/contract-interaction.ts:299](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L299)*



Returns an array of club names that are in our system.




**Returns:** `string`[]
An array with club names that are in our system.






___

<a id="getavailablebets"></a>

### «Const» getAvailableBets

► **getAvailableBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:227](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L227)*



Returns an array of bets for which the event is not over.




**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is not over.






___

<a id="getavailablebetsfromlist"></a>

### «Const» getAvailableBetsFromList

► **getAvailableBetsFromList**(betEvents: *`string`[]*): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:243](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L243)*



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



*Defined in [ethereum/contract-interaction.ts:257](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L257)*



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



*Defined in [ethereum/contract-interaction.ts:330](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L330)*



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



*Defined in [ethereum/contract-interaction.ts:213](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L213)*



Returns an array of the bet objects for bets placed by a user.




**Returns:** `Promise`.<`string`[]>
Array of addresses of Betting contracts that user placed bet on.






___

<a id="getuserbetinfo"></a>

### «Const» getUserBetInfo

► **getUserBetInfo**(betEvent: *`string`*): `Promise`.<[IUserBetInfo](iuserbetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:271](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L271)*



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



*Defined in [ethereum/contract-interaction.ts:284](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L284)*



Used to check if a user is logged in.




**Returns:** `Promise`.<`boolean`>
A boolean signifying if a user is logged in or not.






___

<a id="placebet"></a>

### «Const» placeBet

► **placeBet**(betEvent: *`string`*, outcomeIndex: *`number`*, value: *`string`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:177](https://github.com/swapnilraj/EBeth-frontend/blob/55f3d1a/src/ethereum/contract-interaction.ts#L177)*



Allows a user to place a bet.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is betting on. |
| value | `string`   |  Amount of Ether the user is betting. |





**Returns:** `Promise`.<`void`>





___


