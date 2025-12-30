import Image from "next/image";
import styles from "./page.module.css";
import SectorTable from "./Table";
import LargeChart from "./Chart";
import ImageGallery from "./ImageGallery";
import LongTextContent from "./LongText";
import DynamicList from "./DynamicList";
export const dynamic = "force-dynamic"; // ensures SSR every time

async function Home() {
  let sectorPerfResp = await fetch('https://www.indiainfoline.com/cms-api/v1/public/market/sectorperformance?exchange=BSE', {
    cache: "no-store",
  })
  let sectorData = await sectorPerfResp.json()
  sectorData = sectorData.response.data.SectorPerformanceList.SectorPerformance
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  return (
    <div className="nextjs-home">
      <p suppressContentEditableWarning>CURRENT TIME: {currentDateTime}</p>
      <SectorTable initialSectorRow={sectorData} />
      <LargeChart />
      <ImageGallery />
      <LongTextContent />
      <DynamicList />
    </div>
  );
}
export default Home;