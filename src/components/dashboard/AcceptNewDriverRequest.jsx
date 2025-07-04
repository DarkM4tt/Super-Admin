/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";
import BackArrow from "../../assets/leftArrowBlack.svg";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
} from "@mui/material";
import pdfIcon from "../../assets/pdf.png";
import { useCallback, useEffect, useState } from "react";
import LoadingAnimation from "../common/LoadingAnimation";
import CloseIcon from "@mui/icons-material/Close";
import { allDocumentStatus } from "../../utils/enums";
import StatusDropdown from "../common/StatusDropdown";
import RemarksModal from "../common/RemarkModal";
import { useSnackbar } from "../../context/snackbarContext";

const AcceptNewDriverRequest = ({
  entityId,
  selectedOrgId,
  setActiveComponent,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [entityDetails, setEntityDetails] = useState(null);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState({});
  const [open, setOpen] = useState(false);
  const [remarks, setRemarks] = useState("");
  const showSnackbar = useSnackbar();

  const fetchDriverDetails = useCallback(async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_AUTH_URL
        }/super-admin/driver-details/${entityId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        setEntityDetails(result?.data);
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  }, [entityId]);

  const handleOpenDocumentModal = (documentUrl, name) => {
    setSelectedDocument({ url: documentUrl, name });
    setOpenDocumentModal(true);
  };

  const handleEntityStatusChange = useCallback(
    async (status) => {
      setButtonLoading(true);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_AUTH_URL
          }/super-admin/update-driver-status/${entityId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
            credentials: "include",
          }
        );
        const result = await res?.json();
        if (result?.success) {
          showSnackbar(result?.message, "success");
          selectedOrgId
            ? setActiveComponent("Drivers")
            : setActiveComponent("AllDrivers");
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setButtonLoading(false);
      }
    },
    [entityId, selectedOrgId, setActiveComponent]
  );

  const handleAddRemarks = async () => {
    setButtonLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_AUTH_URL
        }/super-admin/update-driver-doc-status/${selectedDocument?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedDocument?.status,
            remarks,
          }),
          credentials: "include",
        }
      );
      const result = await res?.json();
      if (result?.success) {
        showSnackbar(result?.message, "success");
        setSelectedDocument(null);
        setOpen(false);
        fetchDriverDetails();
      } else {
        throw new Error(result?.message);
      }
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setButtonLoading(false);
      setRemarks("");
      setOpen(false);
    }
  };

  const handleDocStatusChange = useCallback(
    async (status, documentId) => {
      if (status !== "APPROVED") {
        const document = entityDetails?.documents?.find(
          (doc) => doc._id === documentId
        );
        document.status = status;
        setSelectedDocument(document);
        setOpen(true);
        return;
      }

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_AUTH_URL
          }/super-admin/update-driver-doc-status/${selectedDocument?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
            credentials: "include",
          }
        );
        const result = await res?.json();
        if (result?.success) {
          showSnackbar(result?.message, "success");
          fetchDriverDetails();
        } else {
          throw new Error(result?.message);
        }
      } catch (error) {
        showSnackbar(error.message, "error");
      }
    },
    [entityDetails?.documents, fetchDriverDetails, selectedDocument?._id]
  );

  useEffect(() => {
    fetchDriverDetails();
  }, [fetchDriverDetails]);

  const DocumentModal = ({ open, onClose, documentUrl, documentName }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (documentUrl) {
        setLoading(true);
        const img = new Image();
        img.src = documentUrl;
        img.onload = () => setLoading(false);
        img.onerror = () => setLoading(false);
      }
    }, [documentUrl]);

    const isPdf = documentUrl?.endsWith(".pdf");

    return (
      <Modal open={open} onClose={onClose}>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center p-4 border-b">
              <p className="font-bold text-lg">{documentName}</p>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="p-4 flex justify-center items-center min-h-[500px]">
              {loading && <CircularProgress />}
              {!loading && isPdf ? (
                <iframe
                  src={documentUrl}
                  className="w-full h-[500px]"
                  title={documentName}
                />
              ) : (
                !loading && (
                  <img
                    src={documentUrl}
                    alt={documentName}
                    className="max-w-full max-h-[500px]"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const EntityInfoCard = () => (
    <div className="px-4 py-8 bg-white rounded-lg mb-4">
      <div className="flex items-center gap-8 border-b-[1px] border-[#e0e0e0] pb-6">
        {entityDetails?.profile_pic ? (
          <img src={entityDetails?.profile_pic} alt="OrgBig" width={70} />
        ) : (
          <Avatar sx={{ width: "5rem", height: "5rem", borderRadius: "50%" }}>
            {entityDetails?.full_name?.charAt(0)}
          </Avatar>
        )}
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-2xl">
            {entityDetails?.full_name || "No name"}
          </p>
          <div className="flex items-center text-gray gap-1">
            <p className="font-normal text-base text-gray">
              {entityDetails?.username}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-14 mt-6 pl-6">
        <p className="font-redhat font-normal text-xl text-gray">Status</p>
        <div className="flex gap-4">
          <Button
            variant="outlined"
            sx={{
              color: "#18C4B8",
              borderColor: "#18C4B8",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              padding: "6px 35px",
              "&:hover": {
                borderColor: "#1AC6CD",
                backgroundColor: "rgba(26, 198, 205, 0.1)",
              },
            }}
            onClick={() => handleEntityStatusChange("APPROVED")}
          >
            {buttonLoading ? (
              <LoadingAnimation width={30} height={30} />
            ) : (
              "Approve and add"
            )}
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#D20B0B",
              borderColor: "#D20B0B",
              textTransform: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              padding: "6px 35px",
              "&:hover": {
                borderColor: "#D20B0B",
                backgroundColor: "rgba(240, 0, 0, 0.1)",
              },
            }}
            onClick={() => handleEntityStatusChange("REJECTED")}
          >
            {buttonLoading ? (
              <LoadingAnimation width={30} height={30} />
            ) : (
              "Reject request"
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const SubmittedDocumentsCard = () => (
    <div className="py-8 px-6 bg-white rounded-lg">
      <p className="font-bold font-redhat text-lg mb-4">Uploaded documents</p>
      {entityDetails?.documents?.length === 0 && (
        <p className="text-lg text-red-400 font-bold">
          No documents uploaded yet!
        </p>
      )}
      {entityDetails?.documents?.map((doc, index) => (
        <Box key={index}>
          <div className="flex justify-between items-center mb-4 pt-4 pb-2">
            <div className="flex items-center">
              <div className="flex gap-2 mt-4">
                <img src={pdfIcon} alt="PDF Icon" className="w-6 h-6 mr-3" />
                <p className="font-semibold">{doc?.name}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="text"
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                    textDecoration: "underline",
                  },
                  textDecoration: "underline",
                }}
                onClick={() =>
                  handleOpenDocumentModal(doc?.document, doc?.name)
                }
              >
                View
              </Button>
              {!(doc?.status === "APPROVED") && (
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#ffffff",
                      textDecoration: "underline",
                    },
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    setSelectedDocument(doc);
                    setOpen(true);
                  }}
                >
                  Remarks
                </Button>
              )}
              <StatusDropdown
                isNew={true}
                allStatus={allDocumentStatus}
                currentStatus={doc?.status}
                documentId={doc?._id}
                onDocStatusChange={handleDocStatusChange}
              />
            </div>
          </div>
          {index < entityDetails?.documents?.length - 1 && <Divider />}
        </Box>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center font-redhat text-base font-semibold ">
        <div className="flex gap-2 text-gray">{"> Partners"}</div>
        <div className="py-3 px-4 bg-[#EEEEEE] flex items-center gap-3 rounded-lg">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none"
          ></input>
        </div>
      </div>
      <img
        src={BackArrow}
        alt="BackArrow"
        className="mb-4 mt-12 cursor-pointer"
        onClick={() =>
          selectedOrgId
            ? setActiveComponent("Drivers")
            : setActiveComponent("AllDrivers")
        }
      />

      <Box className="flex flex-col gap-6 mt-8">
        <EntityInfoCard />
        <SubmittedDocumentsCard />
      </Box>

      <DocumentModal
        open={openDocumentModal}
        onClose={() => {
          setSelectedDocument(null);
          setOpenDocumentModal(false);
        }}
        documentUrl={selectedDocument?.url}
        documentName={selectedDocument?.name}
      />

      <RemarksModal
        selectedDocument={selectedDocument}
        remarks={remarks}
        setRemarks={setRemarks}
        buttonLoading={buttonLoading}
        open={open}
        handleClose={() => {
          setSelectedDocument(null);
          setOpen(false);
        }}
        handleAddRemarks={handleAddRemarks}
      />
    </>
  );
};

export default AcceptNewDriverRequest;
