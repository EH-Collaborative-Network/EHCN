import sketch from "./utils/sketchMap";
import { ReactP5Wrapper } from "react-p5-wrapper";
import React from "react";
import * as styles from "./css/map.module.css";

const Map = ({partners}) => {
  return (
      <div className={styles.root}>
        <ReactP5Wrapper sketch={sketch} />
        <div className={styles.partners}>
          <ul>
            <li>one</li>
            <li>two</li>
          </ul>
        </div>
      </div>
  )
};

export default Map;


