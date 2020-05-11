import { PageHeader } from "antd";
import React from "react";

const Header = (props) => {
  return (
    <PageHeader
      // onBack={() => null}
      title={props.title}
      subTitle={props.subtitle}
    />
  );
};

export default Header;
