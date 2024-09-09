import { IconButton, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Carousel, { CarouselRef } from "../../../components/Carousel";
import Title from "../../../components/Title";
import {
  getAllTestimonials,
  selectAllTestimonials,
} from "../../../store/slices/testimonial.slice";

const Testimonials = () => {
  const dispatch = useDispatch<any>();
  const testimonials = useSelector(selectAllTestimonials);
  const [loading, setLoading] = useState<boolean>(true);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    dispatch(getAllTestimonials({ skip: 0, limit: 10 })).then(() => {
      setLoading(false);
    });
  }, [dispatch]);
  return (
    <div id="testimonials" className="">
      <div className="max-w-[1440px] mx-auto py-8">
        <Title title="TESTIMONIALS" color="common.black" className="mx-auto" />
        <div className="size-full xl:h-[521px] xs:h-[600px] h-[760px] relative md:p-4">
          {loading && (
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="100%"
              width="100%"
              className="flex items-center justify-center font-bold text-3xl text-secondary"
            >
              Fetching Testimonials...
            </Skeleton>
          )}
          {!loading && testimonials?.length > 0 && (
            <>
              <Carousel ref={carouselRef} slideDelay={5} slideDuration={1}>
                {testimonials.slice(0, 10).map((testimonial) => (
                  <TestimonialCard
                    key={testimonial._id}
                    testimonial={testimonial}
                  />
                ))}
              </Carousel>
              <IconButton
                onClick={() => carouselRef.current?.onPreviousClick()}
                className="absolute top-1/2 left-4 bg-white hover:bg-zinc-100 shadow-lg transform -translate-y-1/2 !z-10 md:block hidden"
              >
                <MdOutlineChevronLeft className="text-dark text-2xl" />
              </IconButton>
              <IconButton
                onClick={() => carouselRef.current?.onNextClick()}
                className="absolute top-1/2 right-4 bg-white hover:bg-zinc-100 shadow-lg transform -translate-y-1/2 !z-10 md:block hidden"
              >
                <MdOutlineChevronRight className="text-dark text-2xl" />
              </IconButton>
            </>
          )}
          {!loading && !(testimonials?.length > 0) && (
            <div className="size-full flex items-center justify-center">
              <div className="text-center max-w-[900px] px-8 py-16 mx-auto col-span-full ">
                <h3 className="text-primary-foreground font-medium text-xl md:text-3xl mb-2">
                  No testimonials found!
                </h3>
                <p className="text-dark text-sm md:text-base">
                  Be the first to share your experience with us.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Testimonials;

const TestimonialCard = ({
  testimonial: { names, role, message, company, image, companyLogo, siteImage },
}: {
  testimonial: Testimonial;
}) => {
  return (
    <div className="size-full flex flex-row">
      <div className="size-full full flex flex-row relative">
        <div className="px-4 py-8 grow flex flex-col justify-between gap-4 text-white">
          <div className="flex items-stretch max-w-[1200px] mx-auto bg-white rounded-lg shadow-lg">
            {companyLogo && (
              <div
                className={`h-full bg-muted w-[300px] flex-none md:flex hidden items-center justify-center rounded-l-lg px-6`}
              >
                <img
                  src={companyLogo}
                  alt={names}
                  className="object-contain w-full h-full"
                />
              </div>
            )}
            {siteImage && !companyLogo && (
              <div
                className={`h-full bg-muted w-[300px] flex-none md:flex hidden items-center justify-center rounded-l-lg`}
                style={{
                  backgroundImage: `url(${siteImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
            <div
              className={`sm:p-12 p-4 bg-white text-white rounded-r-lg  
              ${
                !companyLogo && !siteImage
                  ? "rounded-l-lg"
                  : "md:rounded-l-0 rounded-l-lg"
              }
              `}
            >
              <div className="flex items-center">
                <img
                  src={image}
                  alt={names}
                  className="w-20 h-20 rounded-full"
                />
                <div className="ml-4">
                  <p className="font-bold text-lg text-dark">{names}</p>
                  <p className="text-sm text-secondary">
                    {role}{" "}
                    {company && (
                      <span className="text-dark-foreground">@{company}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="relative bg-pink-500/0 pt-4">
                <FaQuoteRight className="absolute text-7xl text-black/10 top-0 left-0 rotate-180" />
                <div className="text-dark z-50 p-6 line-clamp-[8] min-h-44 flex flex-col items-center justify-center md:text-base text-sm">
                  {message}
                </div>
                <FaQuoteRight className="absolute text-7xl text-black/10 bottom-0 right-0 z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Testimonial = {
  names: string;
  role: string;
  company: string;
  message: string;
  image: string;
  companyLogo: string;
  siteImage: string;
};
