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
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

let theme = createTheme();
theme = responsiveFontSizes(theme);

let themeHeader = createTheme({
  typography: {
    fontFamily: ["Roboto", "Copperplate", "Raleway"].join(","),
  },
});

themeHeader = responsiveFontSizes(themeHeader);

import Grid from "@mui/material/Unstable_Grid2";

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
            marginTop: "1rem",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              // paddingTop: "3rem",
            }}
          >
            <div>
              <Carousel autoPlay={false} infiniteLoop={true} showThumbs={false}>
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
                      maxHeight: "90vh",
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
                    src="/static/5.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "90vh",
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
                    src="/static/2.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "90vh",
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
                    src="/static/3.jpg"
                    width={1280}
                    height={800}
                    alt=""
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "90vh",
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
                    alt=""
                    height={800}
                    style={{
                      objectFit: "cover",
                      height: "fit-content",
                      maxHeight: "90vh",
                    }}
                  />
                </div>
              </Carousel>
            </div>

            <Box id="about">
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
                  About Vellore Institute of Technology
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
                  leaders of our society.
                  <br /> VIT was established in 1984 as a self-financing
                  institution called the Vellore Engineering College under
                  Section 3 of the University Grants Commission (UGC) Act, 1956.
                  VIT Chennai was established in 2010. Dr G. Viswanathan, is a
                  former parliamentarian and a profound minister in Tamil Nadu
                  Government. Mr Sankar Viswanathan, Dr Sekar Viswanathan, and
                  Mr G.V Selvam are the Vice Presidents of our institute.
                  <br /> VIT Chennai offers 21 Undergraduate, 19 Postgraduate,
                  02 Integrated M. Tech and Research programmes. In addition,
                  full-time PhD in Engineering, Law, Management, Science and
                  Languages, along with direct PhD programmes are offered. The
                  faculties have exceptional skills in training students. They
                  possess a perfect blend of knowledge, industry experience and
                  research skills.
                  <br /> VIT Chennai, the top engineering college in India, aims
                  to provide a world-class education that imbibes strong ethical
                  values in our students to gain a competitive edge over others.
                  Our mission is to maintain an intellectually stimulating
                  environment for students to learn professional ethics and push
                  them out of their comfort zones to reach heights of success.
                  <br /> At VIT Chennai we believe in fostering an environment
                  that helps to brainstorm creative ideas and be the place where
                  students find their voice. We offer an array of student- led
                  clubs that help to create, nurture and display talent and also
                  serve as a recreational space for students. The club also
                  involves students in important societal causes. to display
                  their talents and get involved with important causes. At
                  present, there are 140 + clubs and chapters present on campus.
                  The infrastructural amenities in the campus are top-notch and
                  will continue to grow immensely in the upcoming years. These
                  constant efforts make VIT the top engineering college in
                  India.
                  <br />
                  <br />{" "}
                  <p style={{ fontWeight: "bold", textAlign: "center" }}>
                    {" "}
                    Placement Opportunities and Counselling
                  </p>
                  <br /> We place students in top-notch reputed companies
                  offering a wide range of exposures which equip them for their
                  future. We hold the records of highest number of recruitments
                  through placements. We offer international internship
                  opportunities as well.
                </Typography>
              </Box>
            </Box>
            <Box id="Partners">
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: "#373f6e ",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Partners
              </Typography>
              <Grid
                container
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mx: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
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
                  sm={6}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/static/TOI.jpg"
                    alt="TOI"
                    width={640}
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
                }}
              >
                <Typography
                  variant="h4"
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
                  height={360}
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
                  paddingBottom: "3rem",
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
                  Categories
                </Typography>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    mx: "5%",
                    border: "1px solid black",
                    mt: "5%",
                    backgroundColor: "white",
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h1"
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          wordWrap: "break-word",
                          color: "black",
                        }}
                      >
                        Segment
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "black",
                          wordWrap: "break-word",
                        }}
                      >
                        Teacher Experience
                        <br />
                        5-15 Years
                        <br />
                        15-25 Years
                        <br />
                        More than 25 Years
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                        Social studies (History, Geography, Civics, and
                        Economics)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                        Physics
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
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
                        Biology
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      border: "1px solid black",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                    </Box>
                  </Grid>
                </Grid>
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
                      The Jury holds the right to disqualify any application
                      which does not meet the eligibility criteria. Jury&apos;s
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
                      The Organizers may modify the eligibility criteria from
                      time to time with retrospective effect.
                    </Typography>
                  </li>
                </ol>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#101627",
                }}
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
                <Typography variant="h2" component="h1" align="center">
                  Contact us
                </Typography>
                <Typography
                  variant="body2"
                  component="h1"
                  align="center"
                  color="red"
                  width="30vh"
                  mb={2}
                >
                  * Management shall take 4-5 working days to respond to queries
                  received
                </Typography>
                <Typography variant="h6" component="h1" align="center">
                  Monday - Friday <br /> 9am to 6pm
                </Typography>
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
                    <a href="tel:+919962053587">+91 9962053587</a>
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
                    icon={faWhatsapp}
                    color="white"
                    fontSize="4vh"
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
                    <a href="whatsapp://send?phone=+919962053587">
                      +91 9962053587
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </>
    </ThemeProvider>
  );
}

export default HomePage;
