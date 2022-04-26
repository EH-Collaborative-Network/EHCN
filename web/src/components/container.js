import React from "react";

import * as styles from "./css/container.module.css";

const Container = ({ children, extra }) => {
  return <div className={styles.root + " " + extra}>{children}</div>;
};

export default Container;
