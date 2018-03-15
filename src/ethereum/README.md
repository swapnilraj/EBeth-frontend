# Contract Interaction

## Index 

### Interfaces

* [IBetInfo](ibetinfo.md)
* [IUserBetInfo](iuserbetinfo.md)


### Functions

* [changeBet](README.md#changebet)
* [claimWinnings](README.md#claimwinnings)
* [getAvailableBets](README.md#getavailablebets)
* [getBetInfo](README.md#getbetinfo)
* [getPlacedBets](README.md#getplacedbets)
* [getUserBetInfo](README.md#getuserbetinfo)
* [placeBet](README.md#placebet)



---
## Functions
<a id="changebet"></a>

### «Const» changeBet

► **changeBet**(betEvent: *`string`*, outcomeIndex: *`number`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:192](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L192)*



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



*Defined in [ethereum/contract-interaction.ts:202](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L202)*



Allows a user to claim their winnings


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<`void`>





___

<a id="getavailablebets"></a>

### «Const» getAvailableBets

► **getAvailableBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:228](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L228)*



Returns an array of bets for which the event is not over.




**Returns:** `Promise`.<`string`[]>
Array of bets for which the event is not over.






___

<a id="getbetinfo"></a>

### «Const» getBetInfo

► **getBetInfo**(betEvent: *`string`*): `Promise`.<[IBetInfo](ibetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:243](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L243)*



Returns information about a bet event.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<[IBetInfo](ibetinfo.md)>
Information about a match that a bet is a available for.






___

<a id="getplacedbets"></a>

### «Const» getPlacedBets

► **getPlacedBets**(): `Promise`.<`string`[]>



*Defined in [ethereum/contract-interaction.ts:214](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L214)*



Returns an array of the bet objects for bets placed by a user.




**Returns:** `Promise`.<`string`[]>
Array of addresses of Betting contracts that user placed bet on.






___

<a id="getuserbetinfo"></a>

### «Const» getUserBetInfo

► **getUserBetInfo**(betEvent: *`string`*): `Promise`.<[IUserBetInfo](iuserbetinfo.md)>



*Defined in [ethereum/contract-interaction.ts:257](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L257)*



Returns information about a bet a user placed.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |





**Returns:** `Promise`.<[IUserBetInfo](iuserbetinfo.md)>
Information about a bet that a user has placed.






___

<a id="placebet"></a>

### «Const» placeBet

► **placeBet**(betEvent: *`string`*, outcomeIndex: *`number`*, value: *`string`*): `Promise`.<`void`>



*Defined in [ethereum/contract-interaction.ts:178](https://github.com/swapnilraj/EBeth-frontend/blob/9a866d4/src/ethereum/contract-interaction.ts#L178)*



Allows a user to place a bet.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| betEvent | `string`   |  Address of the Betting contract. |
| outcomeIndex | `number`   |  Index of the outcome that the user is betting on. |
| value | `string`   |  Amount of Ether the user is betting. |





**Returns:** `Promise`.<`void`>





___


