import { type NumberValidator, s } from '@sapphire/shapeshift'

export type CronPart = `${ number }`
	| '*'
	| `*/${ number }`
	| `${ number }-${ number }`
	| `${ number }`[]

export class CronToken {
	/**
	 * Literal value to write in place. Value may be a number, step values, range or list.
	 * @since 1.0.0
	 */
	public value: CronPart = '*'
	protected validator: NumberValidator<number>
	protected cron: Cronstruct

	public constructor( cron: Cronstruct, min: number, max: number ) {
		this.cron = cron
		this.validator = s.number.greaterThanOrEqual( min ).lessThanOrEqual( max )
	}

	/**
	 * Set its value to `*`.
	 * @returns cron
	 * @since 1.0.0
	 */
	public any(): Cronstruct {
		this.value = '*'
		return this.cron
	}

	/**
	 * Set a specific value.
	 * @param v Value.
	 * @returns cron
	 * @since 1.0.0
	 */
	public at( v: number ): Cronstruct {
		this.value = `${ this.validator.parse( v ) }`
		return this.cron
	}

	/**
	 * Run cron with a step value.
	 * @param v Step.
	 * @returns cron
	 * @since 1.0.0
	 */
	public every( v: number ): Cronstruct {
		this.value = `*/${ this.validator.parse( v ) }`
		return this.cron
	}

	/**
	 * Specify multiple times to form a range.
	 * @param args Values.
	 * @returns cron
	 * @since 1.0.0
	 */
	public list( ...args: number[] ): Cronstruct {
		this.value = args.map( i => `${ this.validator.parse( i ) }` as `${ number }` )
		return this.cron
	}

	/**
	 * Set a start and end value.
	 * @param from Start.
	 * @param to End.
	 * @returns cron
	 * @since 1.0.0
	 */
	public range( from: number, to: number ): Cronstruct {
		this.value = `${ this.validator.parse( from ) }-${ this.validator.parse( to ) }`
		return this.cron
	}

	public toString(): string {
		return typeof this.value === 'string'
			? this.value
			: this.value.join( ',' )
	}
}

export class Cronstruct {
	public readonly minute: CronToken
	public readonly hour: CronToken
	public readonly day: CronToken
	public readonly month: CronToken
	public readonly weekday: CronToken

	public constructor() {
		this.minute = new CronToken( this, 0, 59 )
		this.hour = new CronToken( this, 0, 23 )
		this.day = new CronToken( this, 1, 31 )
		this.month = new CronToken( this, 1, 12 )
		this.weekday = new CronToken( this, 0, 6 )
	}

	public toString(): string {
		return [
			this.minute,
			this.hour,
			this.day,
			this.month,
			this.weekday
		].join( ' ' )
	}
}

export default Cronstruct

console.log( new Cronstruct()
.minute.at( 15 )
.hour.every( 1 ).toString() )