"use client";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/appBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";
import FAQSection from "src/components/faqSection.js";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialIcon } from "react-social-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { Grid } from "@mui/material";
import { faThreads } from "@fortawesome/free-brands-svg-icons";

let theme = createTheme();
theme = responsiveFontSizes(theme);

let themeHeader = createTheme({
  typography: {
    fontFamily: ["Roboto", "Copperplate", "Raleway"].join(","),
  },
});

themeHeader = responsiveFontSizes(themeHeader);

function HomePage() {
  useEffect(() => {
    const url = window.location.href;
    const section = url.split("#")[1];

    if (section) {
      const sectionElement = document.getElementById(section);

      if (sectionElement) {
        sectionElement.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      }
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar />
        <div
          style={{
            zIndex: -1,
            paddingTop: "6rem",
            marginLeft: "1rem",
            marginRight: "1rem",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              // paddingTop: "3rem",
            }}
          >
            <div>
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                interval={4000}
                stopOnHover={false}
              >
                <div
                  style={{
                    width: "100%",
                    maxHeight: "fit-content",
                  }}
                >
                  <Image
                    src="/banner.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "130vh",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    maxHeight: "fit-content",
                  }}
                >
                  <Image
                    src="/static/1.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "140vh",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    maxHeight: "fit-content",
                  }}
                >
                  <Image
                    src="/static/4.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "140vh",
                    }}
                  />
                </div>
              </Carousel>
            </div>
            <Box id="about">
              <Box className={styles.aboutDiv2}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "#373f6e ",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  About VIT Chennai
                </Typography>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    color: "101627",
                    textAlign: "justify",
                  }}
                >
                  {" "}
                  VIT Chennai, one of the leading engineering colleges in India,
                  offers the best exposure in terms of world class education,
                  internship opportunities, top-notch placement opportunities,
                  and infrastructural amenities. We ensure that the graduates
                  walk out with many skills and learning. We provide an
                  environment for attaining technical mastery and honing
                  interpretive and analytical skills, which is the need of the
                  hour. VIT Chennai, fosters holistic growth rooted in ethical
                  and moral principles to achieve its vision and mission of
                  enriching the learning process learning process for the future
                  leaders of our society. For more details, please visit{" "}
                  <a
                    href="https://chennai.vit.ac.in/"
                    target="_blank"
                    style={{ color: "blue" }}
                  >
                    our website.
                  </a>
                </Typography>
              </Box>

              <Box className={styles.aboutDiv}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "#373f6e ",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  About the awards
                </Typography>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    color: "101627",
                    textAlign: "justify",
                  }}
                >
                  In a world where knowledge is the key to progress, teachers
                  are the guiding lights that illuminate the path for
                  generations to come. The Times of India and VIT Chennai
                  Present - &apos; Times Edu Excellence Award &apos; is to
                  recognize and honor the distinctive contributions of some of
                  Tamilnadu&apos;s best teachers. The award winners, under
                  different categories, will be remembered as knowledge fighters
                  who instilled education and fortitude in young people so that
                  they might achieve remarkable things in life despite
                  adversity. This initiative will identify the real doers and
                  motivate them to perform better than before.
                </Typography>
              </Box>
            </Box>

            <Box id="Partners">
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  color: "#373f6e ",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <br /> Brought to you by
              </Typography>
              <Grid container sx={{ mx: 2 }}>
                <Grid
                  item
                  xs={0}
                  sm={3}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/static/VIT.jpeg"
                    alt="VIT"
                    width={640}
                    height={360}
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxWidth: "20vw",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  md={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/static/TOI.jpg"
                    alt="TOI"
                    width={240}
                    height={360}
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxWidth: "20vw",
                    }}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/static/TOI.jpg"
                      alt="TOI"
                      width={1280}
                      height={720}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Image
                    src="/static/EY.png"
                    alt="EY"
                    width={1280}
                    height={720}
                    style={{ objectFit: "scale-down" }}
                  />
                </Grid> */}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    color: "#373f6e ",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingBottom: "1rem",
                  }}
                >
                  Process Advisors
                </Typography>
                <Image
                  src="/static/EY.png"
                  alt="VIT"
                  width={640}
                  height={60}
                  style={{
                    objectFit: "cover",
                    height: "fit-content",
                    maxWidth: "20vw",
                  }}
                />
              </Grid>
            </Box>
            <Box id="category">
              <Box
                sx={{
                  backgroundColor: "#101627",
                  paddingBottom: "1rem",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    paddingTop: "3rem",
                  }}
                >
                  Award Categories
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    mx: "5%",
                    mb: "3%",
                    mt: "2%",
                    backgroundColor: "white",
                    borderRadius: "1rem",
                    width: "90%",
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#4b5ed7",
                      borderRadius: "1rem 0 0 0",
                      borderRight: "2px solid black",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        wordWrap: "break-word",
                        color: "white",
                        justifyContent: "center",
                      }}
                    >
                      Segment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#4b5ed7",
                      borderRadius: "0 1rem 0 0",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "white",
                        wordWrap: "break-word",
                      }}
                    >
                      Teaching Experience <br /> 5-15 Years / 15-25 Years / More
                      than 25 Years
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "2px solid black",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      For Grade 10
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      English
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",

                        color: "black",
                      }}
                    >
                      Regional
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Mathematics
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Science
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Social studies (History, Geography, Civics, and Economics)
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                      borderRight: "2px solid black",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h1"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "black",
                      }}
                    >
                      For Grade 12
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Mathematics
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Physics
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      color="white"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Chemistry
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        textAlign: "center",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Biology
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      pb: "2rem",
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        color: "black",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Computer Science
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                  color: "#373f6e",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  paddingTop: "3rem",
                }}
                id="eligibility"
              >
                Eligibility
              </Typography>
              <ol
                style={{
                  color: "black",
                  marginLeft: "6%",
                }}
              >
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    The awards will be open to teachers teaching in
                    government/private schools across the state of Tamil Nadu
                    only
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    Teachers who are a full-time teaching faculty in any
                    affiliated educational institution in Tamil Nadu as on
                    September 30, 2023, can apply for the Awards
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    Individual should have minimum 5 years of experience as a
                    teacher as on September 30, 2023, to apply for the awards
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    Along with the journey, the teachers should highlight the
                    work done by them as a teacher in the last two-year period
                    i.e., October 01, 2021, to September 30, 2023
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    The teachers must submit a progress report highlight the
                    outcome of the work done by them within the period i.e.,
                    October 01, 2022, to September 30, 2023
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    Educational Administrators, Inspectors of Education, the
                    staff of training Institutes and contractual teachers are
                    not eligible for these awards.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    Employees and immediate family members of BCCL/Organizers,
                    Jury, sponsors, and partners of the awards are not allowed
                    to participate in the Awards
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    The Jury holds the right to disqualify any application which
                    does not meet the eligibility criteria. Jury&apos;s
                    decisions are final and binding on all Participants and
                    cannot be challenged in any manner whatsoever.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ padding: "1rem" }}
                  >
                    The Organizers may modify the eligibility criteria from time
                    to time with retrospective effect.
                  </Typography>
                </li>
              </ol>
            </Box>
            <Box
              sx={{
                backgroundColor: "#101627",
              }}
              id="jury"
            >
              <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  paddingTop: "3rem",
                }}
              >
                Grand Jury
              </Typography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "1rem",
                }}
              >
                To be revealed
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: "white" }} id="faq">
              <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  paddingTop: "3rem",
                }}
              >
                FAQs
              </Typography>
              <FAQSection />
            </Box>
            <Box
              sx={{
                py: 4,
                backgroundColor: "#101627",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              id="contactus"
            >
              <Typography variant="h4" component="h1" align="center">
                Contact us
              </Typography>
              <Typography
                variant="body2"
                component="h1"
                align="center"
                color="red"
                px={2}
                mb={2}
              >
                * Management shall take 4-5 working days to respond to queries
                received
              </Typography>
              <Typography variant="h6" component="h1" align="center">
                Monday - Friday <br /> 9 AM to 6 PM
              </Typography>
              <Box className={styles.contactDiv}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                    mx: "auto",
                    overflowWrap: "anywhere",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="white"
                    fontSize="3vh"
                  />
                  <Typography
                    variant="body1"
                    component="h1"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      mx: "1rem",
                    }}
                  >
                    <a href="mailto:timeseduex2023@gmail.com">
                      timeseduex2023@gmail.com
                    </a>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    color="white"
                    fontSize="3vh"
                  />
                  <Typography
                    variant="body1"
                    component="h1"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      mx: "1rem",
                    }}
                  >
                    <a href="tel:+917305807017">+91 7305807017</a>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <SocialIcon
                    url="https://www.whatsapp.com/"
                    style={{
                      maxWidth: "2rem",
                      maxHeight: "2rem",
                    }}
                  />
                  <Typography
                    variant="body1"
                    component="h1"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      mx: "1rem",
                    }}
                  >
                    <a href="whatsapp://send?phone=+917305807017">
                      +91 7305807017
                    </a>
                  </Typography>
                </Box>
              </Box>
              {/* <Typography variant="h2" component="h6" align="center">
                  VIT Chennai Social Media Handles
                </Typography> */}
            </Box>
            <div className={styles.iconDiv}>
              <SocialMediaLink
                color="black"
                link="https://www.facebook.com/VITCChennai"
                label="VITC Facebook"
              />
              <SocialMediaLink
                color="black"
                link="https://twitter.com/ChennaiVit"
                label="VITC Twitter"
              />
              <SocialMediaLink
                color="black"
                link="https://www.linkedin.com/company/vitchennai"
                label="VITC LinkedIn"
              />
              <SocialMediaLink
                color="black"
                link="https://www.youtube.com/c/VITChennaic"
                label="VITC YouTube"
              />{" "}
              <SocialMediaLink
                color="black"
                link="https://www.instagram.com/vit.chennai/"
                label="VITC Instagram"
              />
              <SocialMediaLink
                color="black"
                link="https://www.threads.net/@vit.chennai"
                label="VITC Threads"
                icon={faThreads}
                fontSize="1.5rem"
              />
              <SocialMediaLink
                color="black"
                link="https://www.whatsapp.com/channel/0029Va7NRhG4inoyNS6z9w28 "
                label="VITC Whatsapp"
              />
            </div>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default HomePage;
const SocialMediaLink = ({ icon, color, fontSize, link }) => (
  <Box
    sx={{
      display: "flex",
      mt: "2%",
      overflowWrap: "anywhere",
      mx: "1%",
    }}
    className={styles.socialMediaDiv}
  >
    {icon && (
      <FontAwesomeIcon
        icon={icon}
        color={color}
        fontSize={fontSize}
        href={link}
      />
    )}
    {!icon && (
      <SocialIcon
        url={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.socialMediaIcon}
      />
    )}
  </Box>
);
