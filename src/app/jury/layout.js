"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loading from "./loading";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "./layout.module.css";
import Button from "@mui/material/Button";

function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authenticated, setAuthenticated] = useState(false);
  const [errorMessage, setError] = useState("");

  useEffect(() => {
    if (!searchParams.has("id")) {
      setError("Please login to continue");
      router.replace("/login");
    } else {
      if (!authenticated) {
        const id = searchParams.get("id");
        fetch("/api/checkAdmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (!res.error) {
              if (res.type === "j") {
                setAuthenticated(true);
                setIsLoading(false);
              } else {
                setError("You are not an admin");
                router.replace("/login");
              }
            } else {
              setError("Error in checking authentication");
              router.replace("/login");
            }
          })
          .catch((err) => {
            setError("Error in checking authentication");
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
            backgroundColor: "#313d8b",
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
