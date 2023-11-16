import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import ResponsiveAppBar from "@/components/appBar";

export default function TermsAndConditions() {
  return (
    <>
      <ResponsiveAppBar />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Terms & Conditions - Times Edu Excellence Awards 2023
        </h1>

        <section>
          <h2>Definition</h2>
          <p>
            <strong>Awards:</strong> Times Edu Excellence Awards 2023
          </p>
          <p>
            <strong>Awards Management/Management:</strong> Bennett Coleman &
            Company Ltd (BCCL) and/or Organizers who are responsible for the
            overall conduct of the Awards
          </p>
          <p>
            <strong>Participant:</strong> Any individual teacher applying for
            the awards
          </p>
          <p>
            <strong>Jury:</strong> A group of varied panellists identified by
            BCCL/Organizers for evaluation/review of the entries on pre-defined
            evaluation parameters.
          </p>
          <p>
            <strong>
              Terms and conditions (&quot;T&C&quot; or &quot;Terms&quot;):
            </strong>{" "}
            The terms governing the Awards, as may be amended from time to time
            by the awards management committee/Jury and made available on the
            website
          </p>
          <p>
            <strong>Participant:</strong> Any individual teacher applying for
            the awards
          </p>
          <br></br>
          <ol>
            <li>
              These Terms may be modified by the Organizers without any prior
              notification. Participant is advised to review these Terms
              regularly and refrain from his/her participation in case of any
              disagreement with any of the Terms and any
              amendments/modifications thereto.
            </li>
            <li>
              The awards/may be changed / modified / split / merged / increased
              / decreased or cancelled by the Organizers based on the number and
              quality of entries received.
            </li>
          </ol>
        </section>
        <br />
        <section>
          <h2>Objective</h2>
          <ol>
            <li>
              <p>
                To recognize teachers for their unique contribution in the field
                of education and reward them for their achievements
              </p>
            </li>
            <li>
              <p>Entries are invited in the categories as mentioned below:</p>
              <Grid
                container
                spacing={2}
                sx={{
                  border: "1px solid black",
                  backgroundColor: "white",
                  width: "90%",
                  mt: "2%",
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
                      Teacher Experience <br/> 
                      5-15 Years / 
                      15-25 Years /
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
                      Social studies (History, Geography, Civics, and Economics)
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
            </li>
            <li>
              The Management reserves the right to offer or withdraw any of the
              prizes/rewards/gratification/awards as provided herein, at any
              point of time, including after they have been announced.
            </li>
          </ol>
        </section>
        <br />
        <section
          style={{
            marginLeft: "0%",
            paddingLeft: "0%",
          }}
        >
          <h2>Eligibility criteria</h2>
          <ol>
            <li>
              <p>
                The awards will be open to teachers teaching in
                government/private schools across the state of Tamil Nadu only
              </p>
            </li>
            <li>
              <p>
                Teachers who are a full-time teaching faculty in any affiliated
                educational institution in Tamil Nadu as on September 30, 2023,
                can apply for the Awards
              </p>
            </li>
            <li>
              <p>
                Individual should have minimum 5 years of experience as a
                teacher as on September 30, 2023, to apply for the awards
              </p>
            </li>
            <li>
              <p>
                Along with the journey, the teachers should highlight the work
                done by them as a teacher in the last two-year period i.e.,
                October 01, 2021, to September 30, 2023
              </p>
            </li>
            <li>
              <p>
                The teachers must submit a progress report highlight the outcome
                of the work done by them within the period i.e., October 01,
                2022, to September 30, 2023
              </p>
            </li>
            <li>
              <p>
                Educational Administrators, Inspectors of Education, the staff
                of training Institutes and contractual teachers are not eligible
                for these awards
              </p>
            </li>
            <li>
              <p>
                Employees and immediate family members of BCCL/Organizers, Jury,
                sponsors, and partners of the awards are not allowed to
                participate in the Awards
              </p>
            </li>
            <li>
              <p>
                The Jury holds the right to disqualify any application which
                does not meet the eligibility criteria. Jury&apos;s decisions
                are final and binding on all Participants and cannot be
                challenged in any manner whatsoever.
              </p>
            </li>
            <li>
              <p>
                The Organizers may modify the eligibility criteria from time to
                time with retrospective effect
              </p>
            </li>
          </ol>
        </section>

        <br />

        <section>
          <h2>Winner selection process</h2>
          <ol>
            <li>
              <p>Entries once submitted cannot be withdrawn.</p>
            </li>
            <li>
              <p>
                The Organizers shall screen or display the Entries for the Jury
              </p>
            </li>
            <li>
              <p>
                The Entries shortlisted by the organizer&apos;s shall be
                presented to the Jury for evaluation and award process. The
                decision by the Jury shall be final and binding
              </p>
            </li>
            <li>
              <p>
                The shortlisted entries as well as the winning entries may be
                featured or covered for publishing or brief thereof may be
                featured on the website at the sole discretion of the
                organizer&apos;s
              </p>
            </li>
            <li>
              <p>
                No correspondence of whatsoever nature relating to shortlisting
                or otherwise of Entries or selection of winning Entries shall be
                entertained
              </p>
            </li>
            <li>
              <p>
                The Jury shall select the top finalists and winners from the
                respective segment basis the eligibility criteria and other
                parameters set out for the Award
              </p>
            </li>
          </ol>
        </section>
        <br />

        <section>
          <h2>Declaration</h2>
          <ol>
            <li>
              <p>
                Participants declare that the details furnished in the
                application form and supporting documents submitted for the
                awards are true, correct, and complete and, wherever required,
                provided after thorough and due diligence and inquiry. In case
                any of the said information is found to be false or untrue or
                misleading or misrepresenting, the participant will be excluded
                for consideration of the Award and shall be liable and
                accountable for any consequences resulting thereto including
                indemnifying the Management for any expenses, costs, losses,
                damages incurred on account of any third-party claims.
              </p>
            </li>
            <li>
              <p>
                The Participant authorizes the organizers to use the content
                submitted as part of my/our nomination/ participation, in whole
                or in part and use and display such content and entry, which
                shall include trade publications, press releases, electronic or
                social media posting to any website, electronic hyperlinks to
                the website of the Participant, and/or any other display format
                during the awards ceremony or at a later point in time as it may
                deem fit.
              </p>
            </li>
            <li>
              <p>
                Organizers may, at its sole discretion, exclude a participant
                from participating in the Awards on various grounds, which may
                include without limitation (i) circumstances which, in its view,
                renders the participant unfit to participate therein; (ii)
                inability to produce documentation specified proving the
                identity of the participant or his/her innovative contribution
                (iii) any other reason that, at their sole discretion, would
                adversely impact the organizer&apos;s and the Award. At no point
                of time will Management be obliged to notify unsuccessful
                Participants of its decision
              </p>
            </li>
            <li>
              <p>
                Organizer shall not be responsible and held accountable, if a
                call to a winner is not successful due to: a. Line being busy b.
                Congestion c. No answer received d. Poor call conditions /
                unclear reception e. Number engaged f. Call drop g. Other
                reasons that could render a call unsuccessful or terminate it
              </p>
            </li>
            <li>
              <p>
                Organizers further reserve the right to replace, at its
                discretion, any winner(s) who for any reason fails or is
                disqualified from or is unable to participate in the Award, with
                another eligible Participant
              </p>
            </li>
            <li>
              <p>
                Organizer will reach out to the winners within 30 days from
                declaration by the jury to obtain details and documentation, if
                any, to initiate the registration process for the prize, if
                applicable. Organizers will make a maximum of 3 attempts to get
                in touch with such winner/s. Failure to contact the winner
                including on the alternate number if any that is provided by the
                Participant, may result in forfeiture of the prize by such
                winner/s and Organizers may proceed to award the same to the
                next eligible participant with highest score
              </p>
            </li>
            <li>
              <p>
                Organizers shall have the liberty, but not the obligation, to
                publish information with respect to the submissions made by the
                participants
              </p>
            </li>
          </ol>
        </section>
        <br />

        <section>
          <h2>Phases and Dates of the Award</h2>
          <ol>
            <li>
              <p>
                The above-mentioned schedule could be added to, modified or
                cancelled based on technical requirements and in case the Award
                is for any reason rescheduled, extended, cancelled or terminated
                early at the absolute sole discretion of the Organizers All
                applications received will be evaluated based on pre-defined
                evaluation criteria determined by the Organizers in its sole and
                absolute discretion
              </p>
            </li>
            <li>
              <p>
                The decision of the Organizers based upon the observation &
                recommendations of Jury with respect to the
                evaluation/disqualification/qualification shall be final and
                binding on all Participants. No claims/queries raised with
                respect to the same will be entertained in this regard
              </p>
            </li>
          </ol>
        </section>
        <br />

        <section>
          <h2>Limitations and Disclaimers</h2>
          <ol>
            <li>
              <p>
                The Organizers will not be responsible for Late/ incomplete/
                corrupted/ defective entries and/or which cannot be read or
                viewed for any reason, and such Entries shall stand
                automatically disqualified. The Organizer shall not be
                responsible if for any technical, physical or other reasons, the
                Entry is not received or cannot be read/ viewed/ judged.
              </p>
            </li>
            <li>
              <p>
                The Organizers reserve their right to suspend, cancel or modify,
                add to, or truncate these Terms & Conditions or Award and/or
                terms relating thereto at any time without prior
                notice/communication. Participants shall periodically check this
                page for updating of these Terms & Conditions.
              </p>
            </li>
          </ol>
        </section>

        <br />
        <section>
          <h2>General</h2>
          <ol>
            <li>
              <p>
                Participant agrees that the Participant is legally capable of
                entering and, if selected, participating in the Awards and agree
                to the T& C as may be amended from time to time.
              </p>
            </li>
            <li>
              <p>
                Participant understands and agrees that merely participating in
                this Awards does not entitle the Participant to a prize or to
                any other form of consideration
              </p>
            </li>
            <li>
              <p>
                Participant warrants and represents to the organizers that all
                information including any communications, software, photos,
                text, video, graphics, music, sounds, images and other material
                submitted or recorded in any manner by the Participant, do not
                infringe upon any third-party individual or organizational
                rights (including, without limitation, intellectual property
                rights). Participant shall solely be responsible for handling
                any infringement or alleged infringement and shall indemnify the
                organizers from any claims, costs or damages arising out of such
                infringement or alleged infringement of the contents, logo or
                trademark or the defines of a claim or any costs payable
                thereof.
              </p>
            </li>
            <li>
              <p>
                Participant shall participate voluntarily at his/her own free
                will and consent and the Organizers shall not in any way be
                obligated or liable for any loss or costs that the Participant
                may suffer or incur. Participants shall not be entitled for any
                payment of allowances in cash or in kind for participating in
                the Awards or any event prior to or following the Awards
              </p>
            </li>
            <li>
              <p>
                Participants for the purpose of entering the Awards,
                automatically grants BCCL/organizers a royalty-free,
                irrevocable, worldwide, non-transferable, non-exclusive right
                and license to use and display such entry, for participation in
                the Awards, and any intellectual property in relation to and
                arising out of such participation in the Awards and footage
                thereof, which shall include trade publications, press releases,
                electronic posting to the Website, the website in any display
                format selected during the Awards as it deems fit.
              </p>
            </li>
            <li>
              <p>
                The organizers reserve the right to, at its discretion, withdraw
                or amend or add to the Terms & Conditions of the Awards at any
                time, with prospective or retrospective effect, and does not
                take responsibility for any loss or damage that any individual
                or organization may suffer as a result of participating or
                attempting to participate in the Awards, the Awards being
                withdrawn, or its terms amended
              </p>
            </li>
            <li>
              <p>
                Should a participant wish to withdraw from the Awards, the same
                shall be informed to the organizers in writing at any time up to
                one week prior to the final awards ceremony
              </p>
            </li>
            <li>
              <p>
                All disputes relating to or arising out of the Awards shall be
                subject to the laws of India and shall be subject to the
                exclusive jurisdiction of the courts of competent jurisdiction
                at Chennai.
              </p>
            </li>
            <li>
              <p>
                In the event these terms and conditions do not cover any
                question or complaint in relation to the Awards, the same will
                be concluded by the Organizers (for all other issues) or an
                independent body or legal team as appointed by the Organizers
                and deemed necessary
              </p>
            </li>
          </ol>
        </section>
        <br />

        <section>
          <h2>Website</h2>
          <ol>
            <li>
              <p>
                The website - ……………………………is only an informational website (the
                “Website”) for the Awards. BCCL/Organizers shall not be liable
                or responsible for any action or decision taken by the
                Participant or anyone acting on behalf of or under employment or
                under contract with Participant. BCCL/Organizers shall not be
                under any obligation to Participant and Participant shall have
                no obligation or rights in relation to the Awards and shall have
                no claims whatsoever against the BCCL/organizers relating to the
                selection process or the running of the Awards
              </p>
            </li>
            <li>
              <p>
                BCCL/Organizers shall not be responsible for: i. any delivery,
                failures relating to the registration or uploading
                videos/presentations. ii. any SPAM generated messages as result
                of Participant accessing the Website. iii. not receiving or
                rejecting any data. iv. any lost, late, or misdirected computer
                transmission or network, electronic failures of any kind or any
                failure to receive entries owing to transmission failures or due
                to any technical reasons and v. Other conditions/situations or
                failures beyond its control.
              </p>
            </li>
          </ol>
        </section>
        <br />

        <section>
          <h2>Disclaimers</h2>
          <ol>
            <li>
              <p>
                BCCL/Organizers has no obligation to screen the entry material
                in advance and shall not be responsible for monitoring entries
                for the purpose of preventing violation of intellectual property
                ownership rights, or violations of any law, rule, or regulation.
                If BCCL/organizers are notified of submissions or materials that
                may not conform to the Terms, it may investigate the allegation
                and determine in good faith and in its sole discretion, to
                eliminate such an entry from considering for the Award. The
                BCCL/Organizers has no liability or responsibility to
                Participants or other users of the Website for performance or
                non-performance of such activities.
              </p>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
