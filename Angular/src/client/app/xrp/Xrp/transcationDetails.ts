export class TranscationDetails {

  constructor(
      /*Transcation details*/
    public quantity: number,
    public xrpPerBuyingPrice: number,
    public totalBuyingCost: number,
    public profit: number,
    public totalSellingcost: number,
    public xrpPerSellingPrice: number
  ) { }
}