import V1 from "../assets/video.mp4";
import Button from "../components/Button";
import Navbar from '../components/Navbar';
export default function Home() {
  return (
    <div className="">
      <title>Testify | Landing</title>
      {/* Hero Section Added */}
      <Navbar logo="Testify"/>
      <section>
        <video
          src={V1}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        ></video>

        <div className="absolute top-0 left-0 w-full h-full flex flex-wrap flex-col justify-center items-center text-purple-100 z-10 ">
          <h1 className="text-4xl font-bold">Welcome to Testify</h1>
          <p className="text-2xl font-bold m-3">
            A Streamlined Test Management WebSite
          </p>

          <Button text="Get Started" link="/signup" />
        </div>
      </section>
    </div>
  );
}
