import React from "react";
import { Input, QRCode, Space } from "antd";
export default function QrCode({ size, link }: { size: number; link: string }) {
  const [text, setText] = React.useState("https://forms.thedrinkfree.com/abcd");

  return (
    <Space direction="vertical" align="center">
      <QRCode
        value={link || "-"}
        bgColor="#FFFFFF"
        size={size}
        color="#000000"
        type="svg"
      />
      <Input
        placeholder="-"
        maxLength={60}
        value={link}
        contentEditable={false}
      />
    </Space>
  );
}
