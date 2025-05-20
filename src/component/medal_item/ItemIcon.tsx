import "./ItemIcon.css";

export default function ItemIcon(props: {
  url: string,
}) {

  const { url } = props;

  return (
    <view className={"item-icon"}>
      <image src={url} className="item-icon-bg"/>
    </view>
  );
}
