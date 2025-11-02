import SectorTable from "~/Table";

import { useLoaderData } from "react-router";
import LargeChart from "~/Chart";
import ImageGallery from "~/ImageGallery";
import LongTextContent from "~/LongText";
import DynamicList from "~/DynamicList";

export async function loader() {
  let sectorPerfResp=await fetch('http://localhost:4005/cms-api/v1/private/section/sector-performance-bse')
  let sectorData=await sectorPerfResp.json()
  return sectorData
}
export default function Home() {
  const data = useLoaderData();
  return (
    <>
      <div className="remix-home">
        <SectorTable initialSectorRow={data.data}/>
        <LargeChart />
        <ImageGallery />
        <LongTextContent />
        <DynamicList />
      </div>
    </>
  );

}
