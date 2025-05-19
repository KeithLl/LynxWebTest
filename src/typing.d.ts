declare let NativeModules: {
  // 本地存储模块
  NativeLocalStorageModule: {
    setStorageItem(key: string, value: string): void;
    getStorageItem(key: string): string | null;
    clearStorage(): void;
  };

  // 本地滚动判断模块
  NativeScrollHelperModule: {
    setCanRefresh(name: string, key: boolean): void;
  };
};
