// 勋章列表
export class Medal {
  constructor(
    public medalId: number,
    public name: string,
    public type: number,
    public icon: string,
    public activeIcon: string
  ) {
  }
}

// 勋章页结果
export class MedalResponse {
  constructor(
    public medalList: Medal[],
    public commentH5url: string
  ) {
  }
}
