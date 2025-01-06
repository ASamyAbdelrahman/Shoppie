import img from "../../public/hightlightimg.png";

const FlexContent = () => {
  return (
    <>
      <div className="flex items-center justify-between sm:flex-col lg:justify-center nike-container lg:flex-row-reverse mt-10 py-2  xsm:flex-col">
        <div className="max-w-lg lg:max-w-none w-full md:text-center grid items-center lg:justify-items-center">
          <h1 className="text-4xl sm:text-3xl font-bold text-gradient">
            HIGHLIGHTS
          </h1>
          <h1 className="text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-900 filter drop-shadow-lg">
            NIKE AIR WITH LIMITLESS CHOICES
          </h1>
          <p className="xl:text-sm my-5 text-slate-900">
            Our Purpose is to move the world forward. We take action by building
            community, protecting our planet and increasing access to sport.
          </p>
          <a
            href="https://www.nike.com/launch/t/nocta-hot-step-black-gold"
            className="flex items-center"
            target={"_blank"}
            role="button"
          ></a>
        </div>
        <div className="flex items-center justify-center max-w-xl relative lg:max-w-none w-full">
          <img
            src={img}
            alt={"img/HIGHLIGHTS"}
            className="w-auto object-fill transitions-theme h-72 lg:h-64 md:h-60 sm:h-48 xsm:h-24 rotate-[19deg] hover:rotate-12"
          />
        </div>
      </div>
    </>
  );
};

export default FlexContent;
