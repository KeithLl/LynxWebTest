// 勋章列表
export class Medal {
  constructor(
    public medalId: number,
    public name: string,
    public type: number,
    public icon: string,
    public activeIcon: string,
    public isGranted: boolean,
    public text: string,
    public grantTime: number,
    public comment: string,
    public shareDesc: string,
    public shareTitle: string,
    public shareUrl: string,
    public studentId: string,
    public url: string,
    public wearing: boolean
  ) {
  }
}

// 勋章页结果
export class MedalResponse {

  public grantedCount: number;
  public totalCount: number;
  public wearingMedal: Medal | undefined;

  constructor(
    public medalList: Medal[],
    public commentH5url: string
  ) {
    // medalList重新排序
    medalList.sort((a, b) => {
      if (a.grantTime > b.grantTime) {
        return -1;
      } else if (a.grantTime < b.grantTime) {
        return 1;
      } else {
        return 0;
      }
    });

    this.grantedCount = 0;
    console.log("handle mEdal list : ", medalList);
    medalList.forEach(medal => {
      if (medal.isGranted) {
        this.grantedCount++;
      }
      if (medal.wearing) {
        this.wearingMedal = medal;
      }
    });

    this.totalCount = medalList.length;
  }
}
