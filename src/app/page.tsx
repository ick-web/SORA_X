import MainDescCard from "@/components/mainpage/MainDescCard";
import MainSearchBar from "@/components/mainpage/MainSearchBar";
import MainTitle from "@/components/mainpage/MainTitle";
import {
  NO1CARD_DESC,
  NO1CARD_TITLE,
  NO2CARD_DESC,
  NO2CARD_TITLE,
  NO3CARD_DESC,
  NO3CARD_TITLE,
} from "@/constants/mainpage/cardComment";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#141414] overflow-hidden relative py-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center pt-20">
        <MainTitle title="수학" />

        <MainSearchBar />
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-10">
          <MainDescCard title={NO1CARD_TITLE} desc={NO1CARD_DESC} />

          <MainDescCard title={NO2CARD_TITLE} desc={NO2CARD_DESC} />

          <MainDescCard title={NO3CARD_TITLE} desc={NO3CARD_DESC} />
        </div>
      </div>
    </div>
  );
}
