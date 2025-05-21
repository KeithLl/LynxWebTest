import {
  useEffect,
  useInitData,
  useRef,
  useState
} from "@lynx-js/react";

import "./App.css";
import medalHeadBg from "@/assets/all_medal_head_bg.png";
import medalHeadIconBg from "@/assets/all_medal_head_icon_bg.png";
import {
  type ListScrollEvent,
  type NodesRef
} from "@lynx-js/types";
import MedalItemView from "@/component/medal_item/MedalItemView.js";
import FetchUtils from "@/api/FetchUtils.js";
import {
  Medal,
  MedalResponse
} from "@/beans/Medal.js";
import type { PageInitData } from "@/beans/PageInitData.js";
import MedalItemDialog from "@/component/dialog/MedalItemDialog.js";

export function App() {

  const initData = useInitData() as PageInitData;

  const [scrollTop, setScrollTop] = useState(0);// 滚动距离

  const [isFetching, setFetching] = useState(true);
  const [medalList, setMedalList] = useState([]);
  const [medalResult, setMedalResult] = useState<MedalResponse | null>(null);
  const [clickedMedal, setClickedMedal] = useState<Medal | null>(null);

  const listRef = useRef<NodesRef>(null);

  useEffect(() => {
    console.info("Hello, ReactLynx");
    console.log("initAppData", initData, initData.pageName);

    // 自动滚动
    // listRef.current?.invoke({
    //   method: "autoScroll",
    //   params: {
    //     rate: 60,
    //     start: true
    //   }
    // }).exec();

    getPageData();

  }, []);

  const getPageData = async () => {
    try {
      const resposeData = await FetchUtils.post(initData.url, initData.params);
      console.log("resposeData", resposeData, resposeData.data);
      setMedalResult(new MedalResponse(resposeData.data.medalList, resposeData.data.commentH5url));
      setMedalList(resposeData.data.medalList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFetching(false);
    }
  };

  const onItemTap = (medalItem: Medal) => {
    setClickedMedal(medalItem);
  };

  const handleBgClick = () => {
    setClickedMedal(null);
  };

  return (
    <view>
      <view className="App">
        <view className="Content">
          <view className="header">
            <image src={medalHeadBg} className="headerBg"/>
            <image src={medalHeadIconBg} className="headerIconBg"/>
            <image src={medalResult?.wearingMedal?.activeIcon || ""}
                   className="headerIcon"/>
            <text className="headerText">
              {medalResult?.wearingMedal?.name || "快去点亮勋章吧"}
            </text>
          </view>
          <view className="titleContainer">
            <text className="title">全部勋章</text>
            <text className="titleFlag">(</text>
            <text
              className="titleProgress">{medalResult?.grantedCount || 0}</text>
            <text className="titleFlag">/</text>
            <text className="titleTotal">{medalResult?.totalCount || 0}</text>
            <text className="titleFlag">)</text>
          </view>
          {/*是否加载中*/}
          {isFetching ? <text>Loading...</text> : <view></view>}
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
            {medalList.map((item, index) => {
              return (
                <list-item
                  item-key={`list-item-${index}`}
                  key={`list-item-${index}`}
                >
                  <MedalItemView medalItem={item} handleItemClick={onItemTap}
                  />
                </list-item>
              );
            })}
          </list>
        </view>
        {clickedMedal != null && <MedalItemDialog medalItem={clickedMedal}
                                                  handleBgClick={handleBgClick}/>}
      </view>
    </view>
  );
}
