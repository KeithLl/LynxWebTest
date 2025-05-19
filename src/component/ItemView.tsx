import "./ItemView.css";
import ItemIcon from "@/component/ItemIcon.js";

export default function ItemView(props: {
  index: number,
  url: string,
  name: string,
}) {

  const { index, url, name } = props;

  return (
    <view className={"item-container"}>

      <ItemIcon
        url={url}></ItemIcon>
      <text className={"item-text"}>
        {name}
      </text>
    </view>
  );
}
