import { Image } from "antd";
import { useState } from "react";

export const ImageShow = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="modal-photo-container">
      <Image
        preview={{
          visible: false,
        }}
        width={200}
        src="assets/letter.png"
        onClick={() => setVisible(true)}
      />
      <div
        style={{
          display: "none",
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          <Image src="assets/letter.png" />
          <Image src="assets/zhibo.png" />
          <Image src="assets/hezhao.jpg" />
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
