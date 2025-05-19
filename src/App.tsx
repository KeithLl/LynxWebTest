import {
  runOnBackground,
  useCallback,
  useEffect,
  useInitData,
  useLynxGlobalEventListener,
  useMainThreadRef,
  useRef,
  useState
} from "@lynx-js/react";

import "./App.css";
import medalHeadBg from "@/assets/all_medal_head_bg.png";
import medalHeadIconBg from "@/assets/all_medal_head_icon_bg.png";
import {
  type ListScrollEvent,
  MainThread,
  type NodesRef
} from "@lynx-js/types";
import ItemView from "@/component/ItemView.js";
import AppConsts from "@/const/AppConsts.js";

export function App() {

  const initData = useInitData();
  console.log("initAppData", initData, initData.pageName);

  const [headerIcon, setHeaderIcon] = useState("");
  const [scrollTop, setScrollTop] = useState(0);

  const listRef = useRef<NodesRef>(null);

  useEffect(() => {
    console.info("Hello, ReactLynx");

    // 自动滚动
    // listRef.current?.invoke({
    //   method: "autoScroll",
    //   params: {
    //     rate: 60,
    //     start: true
    //   }
    // }).exec();

  }, []);

  return (
    <view>
      <view className="App">
        <view className="Content">
          <view className="header">
            <image src={medalHeadBg} className="headerBg"/>
            <image src={medalHeadIconBg} className="headerIconBg"/>
            <image src={headerIcon} className="headerIcon"/>
            <text className="headerText">
              快去点亮勋章吧
            </text>
          </view>
          <view className="titleContainer">
            <text className="title">全部勋章</text>
            <text className="titleFlag">(</text>
            <text className="titleProgress">0</text>
            <text className="titleFlag">/</text>
            <text className="titleTotal">6</text>
            <text className="titleFlag">)</text>
          </view>
          {/*<ItemView*/}
          {/*  index={0}*/}
          {/*  url={AppConsts.picUrl}*/}
          {/*  name="全部"*/}
          {/*></ItemView>*/}
          <list
            ref={listRef}
            className="list"
            span-count={3}
            list-type="flow"
            scroll-orientation="vertical"
            // bindscrolltoupper={() => {
            //   // 滚动到顶部
            //   console.log("scrolltoupper 111");
            //   NativeModules.NativeScrollHelperModule.setCanRefresh(true);
            // }}
            // bindscrolltolower={() => {
            //   // 滚动到底部
            //   console.log("scrolltolower 222");
            // }}
            bindscroll={(e: ListScrollEvent) => {
              let currentScroll = e.detail.scrollTop;
              if (scrollTop > 0 && currentScroll == 0) {
                console.log("scrolltolower 31 can refresh", e.detail.scrollTop);
                NativeModules.NativeScrollHelperModule.setCanRefresh(initData.pageName, true);
              } else if (scrollTop == 0 && currentScroll > 0) {
                console.log("scrolltoupper 32 can not refresh ", e.detail.scrollTop);
                NativeModules.NativeScrollHelperModule.setCanRefresh(initData.pageName, false);
              }
              setScrollTop(e.detail.scrollTop);
            }}
          >
            {Array.from({ length: 50 }).map((item, index) => {
              return (
                <list-item
                  item-key={`list-item-${index}`}
                  key={`list-item-${index}`}
                >
                  <ItemView index={index}
                            url={AppConsts.picUrl}
                            name={"全部" + index}
                  />
                </list-item>
              );
            })}
          </list>
        </view>
      </view>
    </view>
  );
}
