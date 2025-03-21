import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#141414] overflow-hidden relative py-10">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center pt-20">
        <div className="text-center mb-14">
          <h1 className="text-3xl font-semibold font-['Sono']">
            <span className="text-[#ff4400]">수학,</span>{" "}
            <span className="text-white">무엇이든 질문해보세요!</span>
          </h1>
        </div>

        <div className="w-full max-w-2xl relative mb-10">
          <div className="w-full h-16 bg-[#1a1a1a] rounded-[54.50px] border border-[#4a4a4a] flex items-center px-6">
            <input
              type="text"
              placeholder="질문을 입력하거나 파일을 업로드해보세요"
              className="w-full bg-transparent text-[white]] text-lg font-['Gothic_A1'] focus:outline-none"
            />
            <div className="ml-3 flex-shrink-0">
              <Image
                className="w-7 h-7"
                src="https://cdn-icons-png.flaticon.com/512/7109/7109313.png"
                alt="이미지 없음"
                width={28}
                height={28}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl mb-10">
          <div className="bg-[#222222] rounded-[15px] p-4">
            <div className="text-white text-base font-normal font-['Gothic_A1'] flex items-center">
              <span className="mr-2">📌</span>
              수학
            </div>
            <div className="text-white text-base font-light font-['Gothic_A1'] mt-2">
              중등_도형의 성질.pdf
            </div>
          </div>

          <div className="bg-[#222222] rounded-[15px] p-4">
            <div className="text-white text-base font-normal font-['Gothic_A1'] flex items-center">
              <span className="mr-2">📌</span>
              사회
            </div>
            <div className="text-white text-base font-light font-['Gothic_A1'] mt-2">
              사회가 왜이래.png
            </div>
          </div>

          <div className="bg-[#222222] rounded-[15px] p-4">
            <div className="text-white text-base font-normal font-['Gothic_A1'] flex items-center">
              <span className="mr-2">📌</span>
              국어
            </div>
            <div className="text-white text-base font-light font-['Gothic_A1'] mt-2">
              마법의 소라고둥.jpg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
