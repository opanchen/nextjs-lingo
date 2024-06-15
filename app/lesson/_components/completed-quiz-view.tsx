import Image from "next/image";
import Confetti from "react-confetti";
import { useAudio, useWindowSize } from "react-use";
import { useRouter } from "next/navigation";

import { Footer } from "./footer";
import { ResultCard } from "./result-card";

type Props = {
  lessonId: number;
  points: number;
  hearts: number;
};

export const CompletedQuizView = ({ lessonId, hearts, points }: Props) => {
  const router = useRouter();

  const { width, height } = useWindowSize();

  const [finishAudio] = useAudio({
    src: "/audio/finish.mp3",
    autoPlay: true,
  });

  return (
    <>
      {finishAudio}

      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />

      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
        <Image
          src="/icons/finish.svg"
          alt="Finish"
          className="hidden lg:block"
          height={100}
          width={100}
        />
        <Image
          src="/icons/finish.svg"
          alt="Finish"
          className="block lg:hidden"
          height={50}
          width={50}
        />

        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job! <br /> You&apos;ve completed the lesson.
        </h1>

        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={points} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>

      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => router.push("/learn")}
      />
    </>
  );
};
