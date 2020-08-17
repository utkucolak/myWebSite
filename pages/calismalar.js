import React from "react";
import { getPDF } from "../api";

function PDF(name) {
  return {
    name,
    downloadURL: `https://github.com/utkucolak/myWebSite/raw/master/res/${name}`,
  };
}

function Index({ pdfs }) {
  return (
    <div>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            {pdf.name} - <a href={pdf.downloadURL}>İndir</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  let data = [];
  try {
    const raw = await getPDF();
    data = raw?.filename?.entries.map((item) => new PDF(item.name));
  } catch (error) {
    console.log(error);
  }
  return { props: { pdfs: data } };
};

export default Index;
