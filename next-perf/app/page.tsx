import Image from "next/image";
import styles from "./page.module.css";
import AthleteTable from "./Table";
import LargeChart from "./Chart";
import ImageGallery from "./ImageGallery";
import LongTextContent from "./LongText";
import DynamicList from "./DynamicList";
export const dynamic = "force-dynamic"; // ensures SSR every time

async function Home() {
  let olympicsResp = await fetch('http://localhost:3001/dummy-table-data', {
    cache: "no-store",
  })
  let olympicsData = await olympicsResp.json()
  const athleteData = olympicsData.data
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  return (
    <div className="nextjs-home">
      <p suppressContentEditableWarning>CURRENT TIME: {currentDateTime}</p>
      <AthleteTable initialSectorRow={athleteData} />
      <LargeChart />
      <ImageGallery />
      <LongTextContent />
      <DynamicList />
    </div>
  );
}
export default Home;