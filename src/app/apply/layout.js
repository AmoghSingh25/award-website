"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../../components/sectionHeader";
import Box from "@mui/material/Box";
import Loading from "./loading";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "./layout.module.css";
import Button from "@mui/material/Button";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const req = {
    1: true,
    2: false,
    3: false,
    4: true,
    5: false,
    6: true,
  };
  const subText = {
    1: "Personal Details",
    2: "Teaching Experience",
    3: "Awards and Achievements",
    4: "Case Study",
    5: "Uploading Documents",
    6: "Declaration",
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname().split("/").pop();
  const page = path.charAt(path.length - 1);
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    if (!searchParams.has("id")) {
      setError("Please login to continue");
      router.replace("/login");
    } else {
      if (!authenticated) {
        const id = searchParams.get("id");
        fetch("/api/checkAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res.error) {
              if (res.message === "true" && !res.completed) {
                setAuthenticated(true);
                setIsLoading(false);
              }
              if (res.message === "true" && res.completed) {
                setError("You have already applied");
                router.replace("/");
              }
              if (res.last_unsaved_section < page) {
                setError("Please fill the previous sections");
                router.replace(
                  `/apply/sec${res.last_unsaved_section}?id=${id}`
                );
              }
            } else {
              setError("Error in checking user");
              router.replace("/login");
            }
          })
          .catch((err) => {
            setError("Error in checking user");
            router.replace("/login");
          });
      }
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main
          style={{
            backgroundColor: "transparent",
            marginTop: "2%",
            marginRight: "2%",
            marginLeft: "2%",
          }}
        >
          {errorMessage !== "" && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.7)",
                zIndex: "1000",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "20vw",
                  height: "20vh",
                  top: "30vh",
                  left: "40vw",
                  backgroundColor: "#ffefb6",
                  zIndex: "1000",
                  textAlign: "center",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {errorMessage}
                <Button
                  onClick={() => {
                    setError("");
                  }}
                  className={styles.okButton}
                >
                  Ok
                </Button>
              </Box>
            </Box>
          )}
          {children}
        </main>
      )}
    </>
  );
}

export default Layout;
