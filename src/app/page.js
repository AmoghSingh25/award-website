"use client";

import ResponsiveAppBar from "../components/appBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";
import FAQSection from "src/components/faqSection.js";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

let theme = createTheme();
theme = responsiveFontSizes(theme);

import Grid from "@mui/material/Unstable_Grid2";

function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <ResponsiveAppBar />
        <div className={styles.banner}></div>
        <div
          style={{
            height: "100%",
          }}
        >
          <div className={styles.scrollBg}>
            <Box>
              <Box className={styles.aboutDiv}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "#f1bf60",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  About the awards
                </Typography>
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{
                    color: "white",
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
              <Box
                sx={{
                  backgroundColor: "#f6f7fd",
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
                    color: "#f1bf60",
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
                    backgroundColor: "#F6D9A2",
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
                  backgroundColor: "#101627",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  sx={{
                    color: "#f1bf60",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    paddingTop: "3rem",
                  }}
                >
                  Eligibility
                </Typography>
                <ol
                  style={{
                    color: "white",
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
                  backgroundColor: "white",
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  sx={{
                    color: "#f1bf60",
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
                    color: "#101627",
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "1rem",
                  }}
                >
                  To be revealed
                </Typography>
              </Box>
              <Box sx={{ backgroundColor: "#101627" }}>
                <Typography
                  variant="h4"
                  component="h1"
                  align="center"
                  sx={{
                    color: "#f1bf60",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    paddingTop: "3rem",
                  }}
                >
                  FAQs
                </Typography>
                <FAQSection />
              </Box>
              <Box sx={{ py: 4, backgroundColor: "white" }}>
                <Typography variant="h4" component="h1" align="center">
                  Contact us
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    color="#f1bf60"
                    fontSize="3vh"
                  />
                  <Typography
                    variant="h6"
                    component="h1"
                    sx={{
                      color: "blue",
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
                    color="#f1bf60"
                    fontSize="3vh"
                  />
                  <Typography
                    variant="h6"
                    component="h1"
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      mx: "1rem",
                    }}
                  >
                    <a href="tel:+919962053587">+91 9962053587</a>
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
