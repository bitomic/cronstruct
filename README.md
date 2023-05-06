# Cronstruct
> Construct cron expressions in a more human-readable way.

## Features
- Written using Typescript (and thus fully typed, supporting TypeScript and JavaScript).
- Lightweight.
- Suports ESM and CJS.

## Installation
```
# npm
npm i cronstruct

# yarn
yarn add cronstruct
```

## Usage
> The following examples use TypeScript and ESM `import ... from ...`, but it works the same with JavaScript and/or CJS.

Create a new instance:
```ts
import Cronstruct from 'cronstruct'
const cron = new Cronstruct()
```

Set any part of the expression:
```ts
new Cronstruct()
	.minute.at( 15 )
	.hour.every( 1 )
	// 15 */1 * * *
```
