import { PageHeader } from "antd";
import React from "react";

const Header = () => {
  return (
    <PageHeader
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
    />
  );
};

export default Header;
