/*This model is of each of the data to be able 
to use them in a better way 
*/
export class DataCountry {
    private id: number;
    private nameCountry: String;
    private nameProvince: String;
    private date: Date;
    private confirmed: number;
    private death: number;
    private recovered: number;


	constructor($id: number = null, $nameCountry: String = null, $nameProvince: String = null, $date: Date = null, $confirmed: number=null, $death: number=null, $recovered: number = null) {
		this.id = $id;
		this.nameCountry = $nameCountry;
		this.nameProvince = $nameProvince;
		this.date = $date;
		this.confirmed = $confirmed;
		this.death = $death;
		this.recovered = $recovered;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $nameCountry
     * @return {String}
     */
	public get $nameCountry(): String {
		return this.nameCountry;
	}

    /**
     * Getter $nameProvince
     * @return {String}
     */
	public get $nameProvince(): String {
		return this.nameProvince;
	}

    /**
     * Getter $date
     * @return {Date}
     */
	public get $date(): Date {
		return this.date;
	}

    /**
     * Getter $confirmed
     * @return {number}
     */
	public get $confirmed(): number {
		return this.confirmed;
	}

    /**
     * Getter $death
     * @return {number}
     */
	public get $death(): number {
		return this.death;
	}

    /**
     * Getter $recovered
     * @return {number}
     */
	public get $recovered(): number {
		return this.recovered;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $nameCountry
     * @param {String} value
     */
	public set $nameCountry(value: String) {
		this.nameCountry = value;
	}

    /**
     * Setter $nameProvince
     * @param {String} value
     */
	public set $nameProvince(value: String) {
		this.nameProvince = value;
	}

    /**
     * Setter $date
     * @param {Date} value
     */
	public set $date(value: Date) {
		this.date = value;
	}

    /**
     * Setter $confirmed
     * @param {number} value
     */
	public set $confirmed(value: number) {
		this.confirmed = value;
	}

    /**
     * Setter $death
     * @param {number} value
     */
	public set $death(value: number) {
		this.death = value;
	}

    /**
     * Setter $recovered
     * @param {number} value
     */
	public set $recovered(value: number) {
		this.recovered = value;
	}
	
}
