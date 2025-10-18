import Image from "next/image";
import notFound from "@/assets/svgs/404.png";


const NotFound= () => {
  return(
    <div className="flex items-center justify-center min-h-screen px-40">
      <Image src={notFound} alt=""></Image>
    </div>
  )
}

export default NotFound;