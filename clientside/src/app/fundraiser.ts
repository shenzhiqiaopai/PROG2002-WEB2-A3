export class Fundraiser {
  FUNDRAISER_ID: number;
  ORGANIZER: string;
  CAPTION: string;
  TARGET_FUNDING: string;
  CURRENT_FUNDING: string;
  CITY: string;
  ACTIVE: boolean
  CATEGORY_ID: number;
  Category_Name: string;

  constructor(
    public fundraiserId: number,
    public organizer: string,
    public caption: string,
    public target_funding: string,
    public current_funding: string,
    public city: string,
    public active: boolean,
    public categoryId: number,
    public categoryName: string) {
    this.FUNDRAISER_ID = fundraiserId;
    this.ORGANIZER = organizer;
    this.CAPTION = caption;
    this.TARGET_FUNDING = target_funding;
    this.CURRENT_FUNDING = current_funding;
    this.CITY = city;
    this.ACTIVE = active;
    this.CATEGORY_ID = categoryId;
    this.Category_Name = categoryName;
  }
}
