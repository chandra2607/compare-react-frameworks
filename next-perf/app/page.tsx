import Image from "next/image";
import styles from "./page.module.css";
import SectorTable from "./Table";
import LargeChart from "./Chart";
import ImageGallery from "./ImageGallery";
import LongTextContent from "./LongText";
import DynamicList from "./DynamicList";
export const dynamic = "force-dynamic"; // ensures SSR every time

 async function Home() {
  let sectorPerfResp=await fetch('http://localhost:4005/cms-api/v1/private/section/sector-performance-bse',{
    cache: "no-store",
  })
  let sectorData=await sectorPerfResp.json()
  return (
   <div className="nextjs-home">
    <SectorTable initialSectorRow={sectorData.data}/>
    <LargeChart />
    <ImageGallery />
    <LongTextContent />
    <DynamicList/>
   </div>
  );
}
export default Home;