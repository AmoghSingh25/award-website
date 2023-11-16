"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import HideOnScroll from "./HideOnScroll";
import Image from "next/image";

const pages = [
  "Apply",
  "About",
  "Category",
  "Eligibility",
  "Jury",
  "FAQ",
  "Contact Us",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
const links = [
  "/signup",
  "#about",
  "#category",
  "#eligibility",
  "#jury",
  "#faq",
  "#contactus",
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const router = useRouter();
  return (
    <HideOnScroll threshold={400}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#070c22",
          position: "fixed",
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page}>
                    <Typography textAlign="center">
                      <a
                        href={links[pages.indexOf(page)]}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {page}
                      </a>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Image
                src="/images/logo1.jpg"
                alt="Times EduEx Awards"
                width={100}
                height={100}
                style={{
                  margin: "auto",
                }}
              />
            </Box>
            {/* <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "white",
                textDecoration: "none",
              }}
            >
              Times Edu Ex Awards
            </Typography> */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
              }}
            >
              <Image
                src="/images/logo1.jpg"
                alt="Times EduEx Awards"
                width={100}
                height={100}
                style={{
                  marginRight: "1rem",
                }}
              />
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  href={links[pages.indexOf(page)]}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}
export default ResponsiveAppBar;
