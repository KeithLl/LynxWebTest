import {
  runOnBackground,
  useCallback,
  useEffect,
  useLynxGlobalEventListener,
  useMainThreadRef,
  useState
} from "@lynx-js/react";

import "./App.css";
import arrow from "./assets/arrow.png";
import lynxLogo from "./assets/lynx-logo.png";
import reactLynxLogo from "./assets/react-logo.png";
import { MainThread } from "@lynx-js/types";

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(String);
  const logoRef = useMainThreadRef<MainThread.Element>();

  useEffect(() => {
    console.info("Hello, ReactLynx");
  }, []);

  const handleTap = () => {
    console.log("handle bind tap 112233");
    // "main thread";
    // runOnBackground(setAlterLogo)(!alterLogo);
  };

  const onTap = useCallback(() => {
    "main thread";
    runOnBackground(setAlterLogo)(!alterLogo);
  }, [alterLogo]);

  useLynxGlobalEventListener("testEvent", (data) => {
    console.log("testEvent : " + data);
    setAlterLogo(!alterLogo);
  });

  // 接收input回调
  useLynxGlobalEventListener("myLynxInput", (data) => {
    console.log("myLynxInput : " + data);
  });

  const handleInput = (e) => {
    const currentValue = e.detail.value.trim();
    setInputValue(currentValue);
    console.log("setInputValue : " + inputValue);
  };

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
            <text className="Title">MsgHaha1</text>}
          <view className={"inputContainer"}>

            <input className="myInput" placeholder={"test"}
                   style={{
                     color: "red",
                     backgroundColor: "lightgray",
                     fontSize: "40px"
                   }}
              // style={{ color: "red" }}
              // style={{ backgroundColor: "yellow" }}
                   bindinput={(e) => {
                     console.log("input : " + e.detail.value);
                   }}/>

            {/*<hhinput className="myInput" bindinput={handleInput}*/}
            {/*       value={inputValue}/>;*/}
          </view>
          <text className="Title" bindtap={handleTap}>Lynx Game</text>
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
