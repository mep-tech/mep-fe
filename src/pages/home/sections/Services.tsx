import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import Title from "../../../components/Title";

gsap.registerPlugin(ScrollTrigger);

const servicesImages = [
  { name: "service image 1", class: "service_image_1", url: "/images/service-1.png" },
  { name: "service image 2", class: "service_image_2", url: "/images/service-2.png" },
  { name: "service image 3", class: "service_image_3", url: "/images/service-3.png" },
  // { name: "service_image_4", class: "service_image_4", url: "/images/service-1.png" },
].reverse();

const servicesDetails = [
  {
    title: "Electrical services",
    detail:
      "Electrical systems design and installation ensure efficient energy transmission and distribution. Proper planning is crucial for reliable, safe, and energy-efficient infrastructure that supports industries, businesses, and homes.\nLighting and power systems enhance energy efficiency, often using LED and smart grids for optimized performance.\nRenewable energy systems like solar and wind power reduce carbon emissions and require careful grid integration.",
    class: "service_detail_1",
  },
  {
    title: "Mechanical Services",
    detail:
      "Vivamus pulvinar dolor a libero rhoncus dapibus. Sed malesuada convallis massa, ut bibendum lectus blandit vitae. In vel tincidunt neque. Phasellus ornare erat ac egestas maximus.",
    class: "service_detail_2",
  },
  {
    title: "Plumbing services",
    detail:
      "Maecenas dignissim lectus at nulla congue, et efficitur risus tempor. Pellentesque ullamcorper ligula eu erat finibus egestas. Quisque non imperdiet magna. Sed tincidunt sagittis odio, a laoreet purus elementum non. In vel pretium libero.\n Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi laoreet, nibh quis fringilla maximus, risus neque luctus sem, id feugiat neque odio tempus purus. Aenean vel placerat ante, eu tincidunt nisi. Aliquam erat volutpat. Vestibulum consectetur ullamcorper arcu in vehicula. Donec ac sem et sem dictum pellentesque nec at justo. Integer at ligula gravida, fermentum erat id, pellentesque est. Donec ac tellus a nisl interdum fermentum eget sit amet ligula. In euismod lobortis nunc a eleifend.",
    class: "service_detail_3",
  },
  // {
  //   title: "Electrical transmission construction",
  //   detail:
  //     "Ut placerat facilisis enim, ut sodales ex elementum vitae. Praesent vitae dolor posuere, congue enim in, vehicula lectus.\n Sed convallis magna ac luctus lobortis. Proin eu nibh elit. Vestibulum leo velit, imperdiet eu eleifend id, tincidunt ut sem.",
  //   class: "service_detail_4",
  // },
];

const Services = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      servicesDetails.forEach((service, index) => {
        gsap.set("." + service.class, {
          display: index === 0 ? "block" : "none",
        });
      });
      const middle = Math.floor(servicesImages.length / 2);
      servicesImages.forEach((image, index) => {
        gsap.to("." + image.class, {
          scrollTrigger: "#services",
          delay: 0.5,
          duration: 1,
          ease: "circ",
          x: () => -(middle - index) * 20,
          y: () => (middle - index) * 20,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#services",
          scrub: 1,
          pin: true,
          snap: {
            snapTo: 1 / (servicesImages.length - 1),
            // duration: { min: 0.2, max: 0.5 },
            delay: 0,
            directional: true,
          },
          start: "top top",
          end: () => `+=${(servicesImages.length - 1) * 2}00%`,
        },
      });

      [...servicesImages].reverse().forEach((image, index, arr) => {
        if (index === arr.length - 1) return;
        tl.to(
          "." + image.class,
          {
            y: "-=100%",
            opacity: 0,
            delay: 0,
            ease: "power1.in",
          },
          index
        );
      });
      servicesDetails.forEach((service, index, arr) => {
        if (index === arr.length - 1) return;
        const nextService = arr[index + 1];
        tl.fromTo(
          "." + service.class,
          {
            position: "absolute",
            top: "0%",
            left: 0,
          },
          {
            display: "none",
            opacity: 0,
            delay: 0,
            duration: 0.5,
            ease: "power1.in",
          },
          index
        );
        if (nextService) {
          tl.fromTo(
            "." + nextService.class,
            {
              opacity: 0,
            },
            {
              display: "block",
              opacity: 1,
              delay: 0,
              ease: "power1.in",
            },
            index
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="services" className="h-screen px-5 py-8 md:p-16 flex flex-col overflow-y-auto overflow-x-hidden">
      <Title title="SERVICES" color="common.black" className="mx-auto my-8" />
      <div className="min-h-max w-full grow flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16">
        <div className="aspect-[16/10] max-w-[600px] w-full md:size-auto md:grow md:w-1/2 bg-transparent mx-auto md:mx-0 md:my-auto relative">
          {servicesImages.map((image) => (
            <img
              key={image.name}
              src={image.url}
              alt={image.name}
              className={clsx(
                "w-full max-w-[90%] aspect-[16/10] bg-gray-200 absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 border-background border-2 text-lg flex items-center justify-center object-cover",
                image.class
              )}
            />
          ))}
        </div>

        <div className="max-w-[500px] w-full md:w-1/2 mx-auto md:mx-0 *:text-justify md:*:text-left relative">
          {servicesDetails.map((service) => (
            <div
              key={service.title}
              className={clsx("flex flex-col md:origin-center md:-translate-y-1/2 md:absolute", service.class)}
            >
              <h2 className="font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none mb-3">{service.title}</h2>
              {service.detail.split("\n").map((detail, index) => (
                <p key={service.title + index} className="mt-2 text-sm md:text-base">
                  {detail}
                </p>
              ))}
            </div>
          ))}
          {/* <h2 className="font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none">Electrical Services</h2>
					<p className="mt-2 text-sm md:text-base">
						Electrical systems design and installation ensure efficient energy transmission and distribution. Proper
						planning is crucial for reliable, safe, and energy-efficient infrastructure that supports industries,
						businesses, and homes.
					</p>
					<p className="mt-2 text-sm md:text-base">
						Lighting and power systems enhance energy efficiency, often using LED and smart grids for optimized
						performance.
					</p>
					<p className="mt-2 text-sm md:text-base">
						Renewable energy systems like solar and wind power reduce carbon emissions and require careful grid
						integration.
					</p> */}
        </div>
      </div>
    </div>
  );
};

export default Services;
