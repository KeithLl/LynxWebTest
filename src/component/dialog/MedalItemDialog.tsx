import type { Medal } from "@/beans/Medal.js";
import "./MedaltemDialog.css";

export default function MedalItemDialog(props: {
  medalItem: Medal,
  handleBgClick: (medalItem: Medal) => void,
}) {
  const { medalItem, handleBgClick } = props;
  const onViewClick = () => {
    handleBgClick(medalItem);
  };
  return (
    <view className="medalItemDialog" bindtap={onViewClick}>
      <image src={medalItem.activeIcon} className="medalItemIcon"/>
      <text style={{fontSize: "24px", color: "white"}}>{medalItem.name}</text>
    </view>
  );
}
