import React from "react";

import * as styles from "./container.module.css";

const Container = ({ children, extra }) => {
  return <div className={extra ? styles.root + " container " + extra : styles.root + " container"}>{children}</div>;
};

export default Container;
