import SectorTable from "~/Table";

import { useLoaderData } from "react-router";
import LargeChart from "~/Chart";
import ImageGallery from "~/ImageGallery";
import LongTextContent from "~/LongText";
import DynamicList from "~/DynamicList";

export async function loader() {
  let sectorPerfResp = await fetch('https://www.indiainfoline.com/cms-api/v1/public/market/sectorperformance?exchange=BSE')
  let sectorData = await sectorPerfResp.json()
  sectorData = sectorData.response.data.SectorPerformanceList.SectorPerformance
  return sectorData
}
export default function Home() {
  const data = useLoaderData();
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  return (
    <>
      <div className="remix-home">
        <p>CURRENT TIME: {currentDateTime}</p>
        <SectorTable initialSectorRow={data} />
        <LargeChart />
        <ImageGallery />
        <LongTextContent />
        <DynamicList />
      </div>
    </>
  );

}
