import clsx from "clsx";
import { forwardRef } from "react";

type WhyUsCardProps = {
  image: string;
  title: string;
  description: string;
  className?: string;
};

const WhyUsCard = forwardRef<HTMLDivElement, WhyUsCardProps>(
  ({ image, title, description, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "w-full flex flex-col justify-between bg-white",
          className
        )}
      >
        <div className="flex flex-col gap-2 p-5">
          <img src={image} alt={title} className="text-primary w-20" />
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="">{description}</p>
        </div>
        <div className="w-full h-5 bg-secondary"></div>
      </div>
    );
  }
);

export default WhyUsCard;
