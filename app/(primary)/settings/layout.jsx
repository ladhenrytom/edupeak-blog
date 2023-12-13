import Sidebar from "@/components/Sidebar";
import {Container} from "@mui/material";

export default function SettingsLayout({children}) {
  return (
    <div className="bg-neutral-100 min-h-screen">
      <Container>
        <div className="flex xs:flex-col md:flex-row justify-between">
          <div className="md:w-3/12">
            <Sidebar />
          </div>
          <div className="md:w-8/12">{children}</div>
        </div>
      </Container>
    </div>
  );
}
