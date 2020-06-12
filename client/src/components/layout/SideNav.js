import React from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import styled from "styled-components";

const SideNavBar = () => {
  const history = useHistory();
  const location = useLocation();

  const StyledSideNav = styled(SideNav)`
    background-color: #272727;
  `;

  StyledSideNav.defaultProps = SideNav.defaultProps;

  // Toggle
  const StyledToggle = styled(Toggle)`
    background-color: #141414;
  `;
  StyledToggle.defaultProps = Toggle.defaultProps;

  // Nav
  const StyledNav = styled(Nav)`
    background-color: #141414;
    &&[class*="expanded--"] {
      [class*="sidenav-subnav--"] {
        > [class*="sidenav-subnavitem--"],
        > [class*="sidenav-subnavitem--"]:hover {
          > [class*="navitem--"] {
            color: #222;
          }
        }
        > [class*="sidenav-subnavitem--"]:hover {
          > [class*="navitem--"] {
            background-color: #eee;
          }
        }
        > [class*="sidenav-subnavitem--"][class*="selected--"] {
          > [class*="navitem--"] {
            color: #db3d44;
          }
          > [class*="navitem--"]::before {
            border-left: 2px solid #db3d44;
          }
        }
      }
    }
    && > [class*="sidenav-navitem--"] {
      > [class*="navitem--"] {
        background-color: inherit;
        color: #222;
      }
    }
    && > [class*="sidenav-navitem--"]:hover {
      > [class*="navitem--"] {
        background-color: #65a0e4;
      }
    }
    && > [class*="sidenav-navitem--"],
    && > [class*="sidenav-navitem--"]:hover {
      > [class*="navitem--"] {
        [class*="navicon--"] {
          &,
          > * {
            color: white;
          }
        }
        [class*="sidenav-nav-text--"] {
          &,
          > * {
            color: white;
          }
        }
      }
    }
    && > [class*="sidenav-navitem--"][class*="highlighted--"],
    && > [class*="sidenav-navitem--"][class*="highlighted--"]:hover {
      > [class*="navitem--"] {
        [class*="navicon--"],
        [class*="navtext--"] {
          &,
          > * {
            color: #db3d44;
          }
        }
        [class*="sidenav-nav-text--"] {
          font-weight: 700;
        }
      }
    }
  `;
  StyledNav.defaultProps = Nav.defaultProps;

  // NavItem
  const StyledNavItem = styled(NavItem)`
    margin-top: 9px;
    &&&:hover {
      [class*="navtext--"] {
        color: #222;
      }
    }
  `;
  StyledNavItem.defaultProps = NavItem.defaultProps;

  // NavIcon
  const StyledNavIcon = styled(NavIcon)``;
  StyledNavIcon.defaultProps = NavIcon.defaultProps;

  // NavText
  const StyledNavText = styled(NavText)`
    color: #222;
  `;
  StyledNavText.defaultProps = NavText.defaultProps;

  return (
    <SideNav
      style={{ backgroundColor: "#141414" }}
      onSelect={(selected) => {
        const to = "/" + selected;
        if (location.pathname !== to) {
          history.push(to);
        }
      }}
    >
      <StyledToggle />
      <StyledNav defaultSelected="home">
        <StyledNavItem style={{}} eventKey="">
          <StyledNavIcon>
            <i className="fa fa-fw fa-home " style={{ fontSize: "1.5rem" }} />
          </StyledNavIcon>
          <StyledNavText style={{ color: "white", fontSize: "17.5px" }}>
            Home
          </StyledNavText>
        </StyledNavItem>
        <StyledNavItem style={{}} eventKey="allCoins">
          <StyledNavIcon>
            <i className="fab fa-bitcoin" style={{ fontSize: "1.5rem" }} />
          </StyledNavIcon>
          <StyledNavText
            style={{
              fontSize: "17.5px",
              color: "white",
            }}
          >
            Coins
          </StyledNavText>
        </StyledNavItem>
        <StyledNavItem style={{}} eventKey="chart/default">
          <StyledNavIcon>
            <i className="fas fa-chart-line " style={{ fontSize: "1.5rem" }} />
          </StyledNavIcon>
          <StyledNavText
            style={{
              fontSize: "17.5px",
              color: "white",
            }}
          >
            Chart
          </StyledNavText>
        </StyledNavItem>
        <StyledNavItem style={{}} eventKey="news">
          <StyledNavIcon>
            <i className="fas fa-newspaper " style={{ fontSize: "1.5rem" }} />
          </StyledNavIcon>
          <StyledNavText
            style={{
              fontSize: "17.5px",
              color: "white",
            }}
          >
            News
          </StyledNavText>
        </StyledNavItem>

        <StyledNavItem style={{}} eventKey="education">
          <StyledNavIcon>
            <i
              className="fas fa-graduation-cap"
              style={{ fontSize: "1.5rem" }}
            />
          </StyledNavIcon>
          <StyledNavText
            style={{
              fontSize: "17.5px",
              color: "white",
            }}
          >
            Education
          </StyledNavText>
        </StyledNavItem>
        <StyledNavItem style={{}} eventKey="connect">
          <StyledNavIcon>
            <i className="fas fa-comment-dots" style={{ fontSize: "1.5rem" }} />
          </StyledNavIcon>
          <StyledNavText
            style={{
              fontSize: "17.5px",
              color: "white",
            }}
          >
            Connect
          </StyledNavText>
        </StyledNavItem>
      </StyledNav>
    </SideNav>
  );
};

export default SideNavBar;
