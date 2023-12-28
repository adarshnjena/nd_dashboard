import Lottie from "lottie-react";
import animation_lmkgdorc from "../animation/animation_lmkgdorc.json";

export default function Loading() {
  return (
    <div className="w-[80vw] min-h-[80vh] flex justify-center items-center">
      <Lottie className="w-[50vw]" animationData={animation_lmkgdorc} />
    </div>
  );
}
