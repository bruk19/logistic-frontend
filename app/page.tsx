import Front from "./Front";
import Head from 'next/head';

 export default function Home() {
  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon" sizes="any" />
      </Head>
    <div>
      <Front />
    </div>
    </main>
  )
}
