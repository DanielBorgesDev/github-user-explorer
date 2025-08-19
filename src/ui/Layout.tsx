import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Container } from "./Container";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const COLORS = {
    bg: "#0D1117",
    text: "#C9D1D9",
    headerBorder: "#30363d",
    link: "#C9D1D9",
    linkActive: "#2F81F7",
  } as const;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          borderBottom: `1px solid ${COLORS.headerBorder}`,
          backgroundColor: COLORS.bg,
        }}
      >
        <Container>
          <nav className="flex my-20 justify-around ml-10 text-sm py-4">
            <h1>
              <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                  color: isActive ? COLORS.linkActive : COLORS.link,
                  fontWeight: isActive ? 600 : 400,
                })}
                className="no-underline"
              >
                Início
              </NavLink>
            </h1>

            <h1>
              <NavLink
                to="/history"
                style={({ isActive }) => ({
                  color: isActive ? COLORS.linkActive : COLORS.link,
                  fontWeight: isActive ? 600 : 400,
                })}
                className="no-underline"
              >
                Histórico
              </NavLink>
            </h1>
          </nav>
        </Container>
      </header>

      <main style={{ flex: 1 }}>
        <Container>{children}</Container>
      </main>
    </div>
  );
}
