import "./ItemView.css";

export default function ItemIcon(props: {
  url: string,
}) {

  const { url } = props;

  console.log(url);

  return (
    <view className={"item-icon"}>
      <image src={url} className="item-icon-bg"/>
    </view>
  );
}
