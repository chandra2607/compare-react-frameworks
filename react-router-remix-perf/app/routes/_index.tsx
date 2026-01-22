import AthleteTable from "~/Table";

import { useLoaderData } from "react-router";
import LargeChart from "~/Chart";
import ImageGallery from "~/ImageGallery";
import LongTextContent from "~/LongText";
import DynamicList from "~/DynamicList";

export async function loader() {
  let olympicsResp = await fetch('http://localhost:3001/dummy-table-data')
  let olympicsData = await olympicsResp.json()
  return olympicsData.data
}
export default function Home() {
  const data = useLoaderData();
  const now = new Date();
  const currentDateTime = now.toLocaleString();
  return (
    <>
      <div className="remix-home">
        <p>CURRENT TIME: {currentDateTime}</p>
        <AthleteTable initialSectorRow={data} />
        <LargeChart />
        <ImageGallery />
        <LongTextContent />
        <DynamicList />
      </div>
    </>
  );

}
