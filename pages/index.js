import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createWorker } from 'tesseract.js';

export default function Home() {
  const worker = createWorker({
    logger: m => console.log(m),
  });

  const doOCR = async (e) => {
    e.preventDefault()

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('eng_bw.png');
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');

  // useEffect(() => {
  //   doOCR();
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>test tesseract.js</div>
        <div>{ocr}</div>
        <button onClick={doOCR}>{ocr}</button>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
