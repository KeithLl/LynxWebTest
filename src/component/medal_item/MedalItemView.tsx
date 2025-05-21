import "./MedalItemView.css";
import ItemIcon from "@/component/medal_item/ItemIcon.js";
import type { Medal } from "@/beans/Medal.js";

export default function MedalItemView(props: {
  medalItem: Medal,
  handleItemClick: (medalItem: Medal) => void,
}) {

  const { medalItem, handleItemClick } = props;

  return (
    <view className={"item-container"} bindtap={() => {
      handleItemClick(medalItem);
    }}>
      <ItemIcon
        url={!medalItem.isGranted ? medalItem.icon : medalItem.activeIcon}></ItemIcon>
      <text className={"item-text"}>
        {medalItem.name}
      </text>
    </view>
  );
}
