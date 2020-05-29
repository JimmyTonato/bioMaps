import { SafeResourceUrl } from '@angular/platform-browser';

export class Videos{
  private id: number;
  private Country: string;
  private VideoId: string;
  private ChannelId: string;
  private ChannelTitle: string;
  private Title: string;
  private Description: string;
  private img: SafeResourceUrl;
  private PublishTime: Date;

	constructor($id: number=null, $Country: string=null, $VideoId: string=null, $ChannelId: string=null, $ChannelTitle: string=null, $Title: string=null, $Description: string=null, $img: SafeResourceUrl=null, $PublishTime: Date) {
		this.id = $id;
		this.Country = $Country;
		this.VideoId = $VideoId;
		this.ChannelId = $ChannelId;
		this.ChannelTitle = $ChannelTitle;
		this.Title = $Title;
		this.Description = $Description;
		this.img = $img;
		this.PublishTime = $PublishTime;
	}


    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $Country
     * @return {string}
     */
	public get $Country(): string {
		return this.Country;
	}

    /**
     * Getter $VideoId
     * @return {string}
     */
	public get $VideoId(): string {
		return this.VideoId;
	}

    /**
     * Getter $ChannelId
     * @return {string}
     */
	public get $ChannelId(): string {
		return this.ChannelId;
	}

    /**
     * Getter $ChannelTitle
     * @return {string}
     */
	public get $ChannelTitle(): string {
		return this.ChannelTitle;
	}

    /**
     * Getter $Title
     * @return {string}
     */
	public get $Title(): string {
		return this.Title;
	}

    /**
     * Getter $Description
     * @return {string}
     */
	public get $Description(): string {
		return this.Description;
	}

    /**
     * Getter $img
     * @return {SafeResourceUrl}
     */
	public get $img(): SafeResourceUrl {
		return this.img;
	}

    /**
     * Getter $PublishTime
     * @return {Date}
     */
	public get $PublishTime(): Date {
		return this.PublishTime;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $Country
     * @param {string} value
     */
	public set $Country(value: string) {
		this.Country = value;
	}

    /**
     * Setter $VideoId
     * @param {string} value
     */
	public set $VideoId(value: string) {
		this.VideoId = value;
	}

    /**
     * Setter $ChannelId
     * @param {string} value
     */
	public set $ChannelId(value: string) {
		this.ChannelId = value;
	}

    /**
     * Setter $ChannelTitle
     * @param {string} value
     */
	public set $ChannelTitle(value: string) {
		this.ChannelTitle = value;
	}

    /**
     * Setter $Title
     * @param {string} value
     */
	public set $Title(value: string) {
		this.Title = value;
	}

    /**
     * Setter $Description
     * @param {string} value
     */
	public set $Description(value: string) {
		this.Description = value;
	}

    /**
     * Setter $img
     * @param {SafeResourceUrl} value
     */
	public set $img(value: SafeResourceUrl) {
		this.img = value;
	}

    /**
     * Setter $PublishTime
     * @param {Date} value
     */
	public set $PublishTime(value: Date) {
		this.PublishTime = value;
	}



}
