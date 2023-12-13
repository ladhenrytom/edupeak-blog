"use client";

import {createContext, useEffect, useState} from "react";
import {Snackbar, Alert, Backdrop} from "@mui/material";
import SigninBtn from "./SigninBtn";
import {getProviders} from "next-auth/react";

export const GetFunctionsContext = createContext();

export default function FunctionsProvider({children}) {
  const [providers, setProviders] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarTextSeverity, setSnackbarTextSeverity] = useState("success");
  const [openModal, setOpenModal] = useState(false);

  async function fetchProviders() {
    const res = await getProviders();
    setProviders(res);
  }

  function getDate(dateString) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = new Date(dateString).getDate();
    const month = new Date(dateString).getMonth();
    const year = new Date(dateString).getFullYear();

    return {day, month: months[month], year};
  }

  function giveFeedback(text, severity) {
    setSnackbarText(text);
    setSnackbarTextSeverity(severity);
    setOpenSnackbar(true);
  }

  function openSigninModal() {
    setOpenModal(true);
  }

  const value = {
    getDate,
    giveFeedback,
    openSigninModal,
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <GetFunctionsContext.Provider value={value}>
      {/* feedback */}
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarTextSeverity} className="w-full">
          {snackbarText}
        </Alert>
      </Snackbar>

      {/* sign in modal */}
      <Backdrop open={openModal} className="z-50" onClick={() => setOpenModal(false)}>
        <div className=" bg-neutral-100 w-96 h-fit space-y-3">
          <h4 className="flex justify-center text-neutral-100 bg-slate-800 py-2">Signin to continue</h4>
          <div className="pb-3 flex justify-center items-center">
            <SigninBtn providers={providers} />
          </div>
        </div>
      </Backdrop>
      {children}
    </GetFunctionsContext.Provider>
  );
}
