import {
  runOnBackground,
  useCallback,
  useEffect,
  useLynxGlobalEventListener,
  useMainThreadRef,
  useState
} from "@lynx-js/react";

import "./App.css";
import "./index.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { MainThread } from "@lynx-js/types";

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);
  const [data, setData] = useState(String);
  const logoRef = useMainThreadRef<MainThread.Element>(null);

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);

  const handleTap = () => {
    "main thread";
    runOnBackground(setAlterLogo)(!alterLogo);
  };

  const onTap = useCallback(() => {
    "main thread";
    runOnBackground(setAlterLogo)(!alterLogo);

    console.log("logoRef : " + logoRef.current);
  }, [alterLogo]);

  useLynxGlobalEventListener("testEvent", (data) => {
    console.log("testEvent : " + data);
    setAlterLogo(!alterLogo);
  });

  return (
    <view>
      <view className="Background"/>
      <view className="App">
        <view className="Banner">
          <view className="Logo" main-thread:bindtap={onTap}
                main-thread:ref={logoRef}>
            {alterLogo
              ? <image src={reactLynxLogo} className="Logo--react"/>
              : <image src={lynxLogo} className="Logo--lynx"/>}
          </view>
          {alterLogo ? <text className="Title">Test Msg</text> :
            <text className="Title">MsgHaha</text>}
          <input className="myInput" type={"text"} />
          <text className="Title">React</text>
          <text className="Subtitle">on Lynx</text>
        </view>
        <view className="Content">
          <image src={arrow} className="Arrow"/>
          <text className="Description">Tap the logo and have fun!</text>
          <text className="Hint">
            Edit
            <text style={{ fontStyle: "italic" }}>{" src/App.tsx "}</text>
            to see updates!
          </text>
        </view>
        <view style={{ flex: 1 }}></view>
      </view>
    </view>
  );
}
