import {Backdrop, CircularProgress} from "@mui/material";

const Loading = () => {
  return (
    <Backdrop open className="text-white z-50">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
