import "./redApp.css";
import {
  useEffect,
  useState
} from "@lynx-js/react";

export function App() {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const setStorage = () => {
    NativeModules.NativeLocalStorageModule.setStorageItem(
      "testKey",
      "Hello, ReactLynx!" + Math.random() * 10000
    );
    getStorage();
  };

  const getStorage = () => {
    const value = NativeModules.NativeLocalStorageModule.getStorageItem("testKey");
    setStoredValue(value);
  };

  const clearStorage = () => {
    NativeModules.NativeLocalStorageModule.clearStorage();
    setStoredValue(null);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <view className={"container"}>
      <view className={"containerBox"}>
        <text className={"containerBoxText"}>
          Current stored value: {storedValue || "None"}
        </text>
      </view>
      <view className={"buttonContainer"}>
        <view className={"button"} bindtap={setStorage}>
          <text className={"buttonText"}>Set storage: Hello, ReactLynx!</text>
        </view>
        <view className={"button"} bindtap={getStorage}>
          <text className={"buttonText"}>Read storage</text>
        </view>
        <view className={"button"} bindtap={clearStorage}>
          <text className={"buttonText"}>Clear storage</text>
        </view>
      </view>
    </view>
  );
}
