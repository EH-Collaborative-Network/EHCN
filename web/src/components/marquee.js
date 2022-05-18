import React from "react";
import BlockContent from "./block-content";
// import MediaItem from "./MediaItem";
import * as styles from "./css/marquee.module.css";

const Marquee = ({marqueeContent, globalLanguages, languagePhrases}) => {
if(marqueeContent){


  return(
    <div aria-hidden="true" className={styles.marquee}>
      <ul class={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
      </ul>
      <ul class={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
      </ul>
      <ul class={styles.listInline}>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
        <li><BlockContent blocks={marqueeContent} languagePhrases={languagePhrases} globalLanguages={globalLanguages} /> ⟡ </li>
      </ul>
    </div>
  )
}
};

export default Marquee;
