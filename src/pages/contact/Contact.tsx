import { Button, TextField } from "@mui/material";
import { CiMail } from "react-icons/ci";
import { FiMapPin, FiPhone } from "react-icons/fi";
import BackButton from "../../components/BackButton";
import Footer, { mediaLinks } from "../../components/Footer";
import NavBar from "../../components/NavBar";

const Contact = () => {
  return (
    <>
      <NavBar fixNavBar={false} />
      <div id="home" className="min-h-[1440px] relative bg-background">
        <div className="relative md:h-[calc(100vh_-_64px)] h-screen contact-container flex flex-col">
          <div className="z-50 flex-1 w-full md:w-auto md:text-center text-left absolute md:left-[150px] left-1/2 msd:top-1/3 top-[15%] transform md:translate-x-0 -translate-x-1/2 -translate-y-1/2">
            <div className="">
              <BackButton />
            </div>
          </div>
          <div className="z-50 flex-1 w-full md:w-auto text-center md:text-left absolute md:left-[150px] left-1/2 md:top-1/2 sm:top-[60%] top-[25%] transform md:translate-x-0 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white xs:text-6xl text-4xl font-bold uppercase">Contact Us</h1>
            <p className="text-white/90 md:block xs:hidden block">Twegere tuguhe ibyo ushaka byose</p>
          </div>
          <img
            src="/images/secretary.png"
            className="w-auto md:h-[500px] h-auto absolute md:bottom-[60px] xs:bottom-[150px] bottom-[25%] right-0"
          />
        </div>
        <div className="z-10 relative">
          <div className="lg:w-[80%] xs:w-[90%] w-[98%] max-w-[1150px] min-h-[600px] absolute -top-[1px] left-1/2 -translate-x-1/2 -translate-y-[30%] flex items-stretch shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[40px] z-10 bg-white">
            <div className="bg-white w-2/5 min-w-[300px] h-full rounded-l-[40px] lg:px-6 px-3  py-10 md:block hidden">
              <h1 className="font-bold text-3xl text-center">Get in touch</h1>
              <div className="flex gap-2 mt-8">
                <div className="flex items-center justify-center w-14 h-14 p-3 bg-primary rounded-full">
                  <FiMapPin className="text-white text-3xl" />
                </div>
                <div className="">
                  <h1 className="text-[20px] font-bold">Head Office</h1>
                  <h1 className="">Remera - Gisimenti/ Ikaze House F2-22; Kigali - Rwanda</h1>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="flex items-center justify-center w-14 h-14 p-3 bg-primary rounded-full">
                  <CiMail className="text-white text-4xl" />
                </div>
                <div className="">
                  <h1 className="text-[20px] font-bold">Email Us</h1>
                  <h1 className="">meperictric40@gmail.com</h1>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <div className="flex items-center justify-center w-14 h-14 p-3 bg-primary rounded-full">
                  <FiPhone className="text-white text-3xl" />
                </div>
                <div className="">
                  <h1 className="text-[20px] font-bold">Call Us </h1>
                  <h1 className="">
                    <span className="font-semibold">Phone 01:</span>
                    +250785920279{" "}
                  </h1>
                  <h1 className="">
                    <span className="font-semibold">Phone 02:</span>
                    +250781175264{" "}
                  </h1>
                </div>
              </div>
              <div className="w-full h-[0.5px] bg-dark/50 my-10" />
              <div className="px-4">
                <h1 className="text-[18px] font-bold">Follow our social media</h1>
                <div className="flex flex-row flex-wrap gap-2 items-center mt-3">
                  {mediaLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      className="text-white p-3 rounded-full bg-primary hover:bg-primary/80 transition-colors duration-200"
                    >
                      <link.component size="20px" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-primary rounded-r-[40px] md:rounded-l-none rounded-l-[40px] flex-1 py-10">
              <h1 className="sm:text-4xl text-2xl font-bold text-center text-white">Send us a message</h1>
              <div className="sm:px-8 px-4 pt-8">
                <div className="">
                  <h1 className="text-white mb-2">Names</h1>
                  <TextField
                    sx={{
                      input: {
                        color: "#fff",
                      },
                    }}
                    inputProps={{ style: { height: 36 } }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    size="medium"
                    className="text-xs bg-white/20 text-white rounded-md ring-0 border-none pl-4"
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-white mb-2">Email</h1>
                  <TextField
                    sx={{
                      input: {
                        color: "#fff",
                      },
                    }}
                    inputProps={{ style: { height: 36 } }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    size="medium"
                    className="text-xs bg-white/20 text-white rounded-md ring-0 border-none pl-4"
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-white mb-2">Subject</h1>
                  <TextField
                    sx={{
                      input: {
                        color: "#fff",
                      },
                    }}
                    inputProps={{ style: { height: 36 } }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    size="medium"
                    className="text-xs bg-white/20 text-white rounded-md ring-0 border-none pl-4"
                  />
                </div>
                <div className="mt-4">
                  <h1 className="text-white mb-2">Message</h1>
                  <TextField
                    id="outlined-multiline-flexible"
                    sx={{
                      input: {
                        color: "#fff",
                      },
                    }}
                    inputProps={{ style: { height: 36 } }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    multiline
                    rows={3}
                    size="medium"
                    className="text-xs bg-white/20 text-white rounded-md ring-0 border-none pl-4"
                  />
                </div>
                <Button
                  variant="contained"
                  className="mt-8 w-full bg-secondary text-white hover:bg-secondary/50 hover:text-white h-[45px] capitalize font-semibold text-xl"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 left-0 h-[300px] w-full bg-black/0 md:pt-0 pt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.482461408577!2d30.105876074588245!3d-1.960674798021562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca65447effcd3%3A0xd265fb1830816643!2sIKAZE%20Internet%20Cafe%20and%20photo%20studio%20Kismenti%20Remera!5e0!3m2!1sen!2srw!4v1725787049666!5m2!1sen!2srw"
            style={{ border: 0 }}
            loading="lazy"
            className="w-full h-full"
          ></iframe>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Contact;
