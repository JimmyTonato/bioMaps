export class News{
    private title: string;
    private description: string;
    private url: string;
    private urlToImage : string;
    private publishedAt: string;


    //Constructor
	constructor($title: string=null, $description: string=null, $url: string=null, $urlToImage: string=null, $publishedAt: string=null) {
		this.title = $title;
		this.description = $description;
		this.url = $url;
		this.urlToImage = $urlToImage;
		this.publishedAt = $publishedAt;
	}


    /**
     * Getter $title
     * @return {string}
     */
	public get $title(): string {
		return this.title;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Getter $url
     * @return {string}
     */
	public get $url(): string {
		return this.url;
	}

    /**
     * Getter $urlToImage
     * @return {string}
     */
	public get $urlToImage(): string {
		return this.urlToImage;
	}

    /**
     * Getter $publishedAt
     * @return {string}
     */
	public get $publishedAt(): string {
		return this.publishedAt;
	}

    /**
     * Setter $title
     * @param {string} value
     */
	public set $title(value: string) {
		this.title = value;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
	}

    /**
     * Setter $url
     * @param {string} value
     */
	public set $url(value: string) {
		this.url = value;
	}

    /**
     * Setter $urlToImage
     * @param {string} value
     */
	public set $urlToImage(value: string) {
		this.urlToImage = value;
	}

    /**
     * Setter $publishedAt
     * @param {string} value
     */
	public set $publishedAt(value: string) {
		this.publishedAt = value;
	}

}