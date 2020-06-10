
/*The model is created to collect the data of 
  the countries to be able to show them in a list 
 */
export class Country {
    private id: number;
    private name: String;
    private flag: String;


    constructor($id: number = null, $name: String = null, $flag: String = null) {
        this.id = $id;
        this.name = $name;
        this.flag = $flag;
    }


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $name
     * @return {String}
     */
    public get $name(): String {
        return this.name;
    }

    /**
     * Getter $flag
     * @return {String}
     */
    public get $flag(): String {
        return this.flag;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $name
     * @param {String} value
     */
    public set $name(value: String) {
        this.name = value;
    }

    /**
     * Setter $flag
     * @param {String} value
     */
    public set $flag(value: String) {
        this.flag = value;
    }


}
