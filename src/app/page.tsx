"use client"
import Image from "next/image";
import homeImage from "../assets/home.jpg"
import { useEffect ,useState} from 'react';
import axios from "axios";
import YouTube from "@/components/TopicSkeleton";


export default function Home() {

  const [topicApiData, setTopicApiData] = useState()

  useEffect(()=>{
    (async ()=>{
      const data = await axios.get("/api/topic")

      setTopicApiData(data.data.data);


    })()
   

  },[])


  return (
    <div>
      <div className="relative h-[600px]">
        <Image
          src={homeImage}
          alt=""
          className="h-full w-full "
        />
        <div className="absolute inset-0 flex flex-col items-start justify-center ps-12 bg-black bg-opacity-30">
          
          <h1 className="text-4xl text-center font-bold mt-2 text-blue-600 leading-10">
          AI & Meta-Verse Course
          </h1>
          <p className="text-white">Explore AI and the Metaverse in our course. <br /> Transform industries, create immersive experiences, and develop practical skills. <br /> Perfect for tech enthusiasts and professionals.</p>
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center font-bold mt-3">
          {"All Topic & Video's"}
        </h1>
        <YouTube data={topicApiData}/>
      </div>
    </div>
  );
}
