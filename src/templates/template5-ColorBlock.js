import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate5 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    firstName: "IAN",
    lastName: "HANSSON",
    roles: [
      "Graphic Designer",
      "UI/UX Engineer",
      "Developer"
    ],

    profileHeading: "PROFILE",
    profileContent: "Enthusiastic and creative graphic designer with a passion for creating beautiful and functional designs. Strong experience in both print and digital mediums. I thrive on bringing concepts to life through innovative and impactful designs.",

    contactHeading: "CONTACT",
    contact: {
      phone: { value: "816-555-0146", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBpZD0ibWV0ZW9yLWljb24ta2l0X19zb2xpZC1waG9uZSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuNDU3MDggMTYuNTM2OEMxMS4zMzYxIDIwLjQxNTEgMTQuMjYzNiAyMi4yMzcxIDE2LjQ0MjcgMjMuMDE2OUMxOC42NzIyIDIzLjgxNDggMjAuMDc2NyAyMy41MDU3IDIwLjgxMSAyMy4yNTgyQzIxLjIzMDYgMjMuMTE2NyAyMS41NTc3IDIyLjgzMTMgMjEuNzg5OSAyMi41ODNDMjIuMDM0NyAyMi4zMjExIDIyLjI1MzkgMjIuMDEzIDIyLjQ0MzIgMjEuNzEwN0MyMi44MjI0IDIxLjEwNTEgMjMuMTQ1OCAyMC40MTg5IDIzLjM2NTEgMTkuOTEzNUMyMy43Nzk4IDE4Ljk1NzUgMjMuMzc4NCAxNy44OTk0IDIyLjU0MDIgMTcuMzk2NUwxOC40OTkgMTQuOTcxN0MxNy42ODg5IDE0LjQ4NTcgMTYuNjUxOSAxNC42MTMzIDE1Ljk4MzkgMTUuMjgxNEwxNS4yMzAxIDE2LjAzNTFDMTQuNDU1NyAxNS42NDU5IDEyLjkzOTEgMTQuNzM5MSAxMS4wOTQ3IDEyLjg5NTJDOS4yNTA3OCAxMS4wNTA4IDguMzQ0MDMgOS41MzQxOCA3Ljk1NDc5IDguNzU5ODNMOC43MDg1NSA4LjAwNjA3QzkuMzc2NiA3LjMzODAyIDkuNTA0MjYgNi4zMDEwNCA5LjAxODE4IDUuNDkwOTFMNi41OTM0NSAxLjQ0OTY5QzYuMDkwNTcgMC42MTE1NSA1LjAzMjM5IDAuMjEwMTQ5IDQuMDc2NDUgMC42MjQ4NjhDMy41NzEwMyAwLjg0NDE0IDIuODg0ODYgMS4xNjc1MSAyLjI3OTI1IDEuNTQ2NzVDMS45NzY5MyAxLjczNjA3IDEuNjY4ODIgMS45NTUyMiAxLjQwNjk1IDIuMjAwMDNDMS4xNTg2MiAyLjQzMjE3IDAuODczMjIyIDIuNzU5MjkgMC43MzE3NyAzLjE3ODkxQzAuNDg0MjM1IDMuOTEzMjQgMC4xNzUxNTMgNS4zMTc2NyAwLjk3MzAxNCA3LjU0NzI2QzEuNzUyOCA5LjcyNjM0IDMuNTc0ODEgMTIuNjUzOCA3LjQ1MzA3IDE2LjUzMjhMNy40NTcwOCAxNi41MzY4WiIgZmlsbD0iIzc1OENBMyIvPjwvc3ZnPg==" },
      account: { value: "ian_hansson", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iLTEgMCAyMiAyMiIgaWQ9Im1ldGVvci1pY29uLWtpdF9fc29saWQtdXNlciIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwIDBDMTMuMzEzNyAwIDE2IDIuNjg2MjkgMTYgNkMxNiA5LjMxMzcgMTMuMzEzNyAxMiAxMCAxMkM2LjY4NjI5IDEyIDQgOS4zMTM3IDQgNkM0IDIuNjg2MjkgNi42ODYyOSAwIDEwIDB6TTEgMjIuMDk5QzAuNDQ3NzIgMjIuMDk5IDAgMjEuNjUxMyAwIDIxLjA5OVYxOUMwIDE2LjIzODYgMi4yMzg1OCAxNCA1IDE0SDE1LjAwMDdDMTcuNzYyMSAxNCAyMC4wMDA3IDE2LjIzODYgMjAuMDAwNyAxOVYyMS4wOTlDMjAuMDAwNyAyMS42NTEzIDE5LjU1MyAyMi4wOTkgMTkuMDAwNyAyMi4wOTlDMTguNDQ4NCAyMi4wOTkgMS41NTIyOCAyMi4wOTkgMSAyMi4wOTl6IiBmaWxsPSIjNzU4Q0EzIi8+PC9zdmc+" },
      email: { value: "hansson@example.com", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTIxIDRIM0MyLjE3MTU3IDQgMS41IDQuNjcxNTcgMS41IDUuNVYxOC41QzEuNSAxOS4zMjg0IDIuMTcxNTcgMjAgMyAyMEgyMUMyMS44Mjg0IDIwIDIyLjUgMTkuMzI4NCAyMi41IDE4LjVWNS41QzIyLjUgNC42NzE1NyAyMS44Mjg0IDQgMjEgNFoiIHN0cm9rZT0iIzcxNzE3QSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPHBhdGggZD0iTTIgNC41TDkuOTgzMTEgMTEuMjY0QzEwLjU2MTQgMTEuNzA4OSAxMS4yNzA1IDExLjk1MDEgMTIuMDAwMSAxMS45NTAxQzEyLjcyOTcgMTEuOTUwMSAxMy40Mzg4IDExLjcwODkgMTQuMDE3MSAxMS4yNjRMMjEuODA1NSA0LjY2NDc4IiBzdHJva2U9IiM3MTcxN0EiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjwvc3ZnPg==" },
      website: { value: "www.example.com", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDQ5MS41MiA0OTEuNTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojRUJGMEYzOyIgY3g9IjI0NS43NiIgY3k9IjI0NS43NiIgcj0iMjMwLjA3NyIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzY0Nzk4QTsiIGQ9Ik0yNDUuNzYsMEMxMTAuMjQ4LDAsMCwxMTAuMjQ5LDAsMjQ1Ljc2czExMC4yNDgsMjQ1Ljc2LDI0NS43NiwyNDUuNzYNCgljMTM1LjUxMSwwLDI0NS43Ni0xMTAuMjQ5LDI0NS43Ni0yNDUuNzZTMzgxLjI3MSwwLDI0NS43NiwweiBNMTcuNDY1LDI1NC4zODNoMTA1Ljc4NmMwLjYxLDM3LjE3OCw1LjE1LDcyLjAwMiwxMi44NDIsMTAyLjkzMQ0KCWgtODkuNjZDMjkuMjA0LDMyNi42NTIsMTguODU3LDI5MS42NTIsMTcuNDY1LDI1NC4zODN6IE0yNTQuMzgzLDExNi45NlYxOC4xMTRjMzEuODE4LDUuOTA0LDYwLjEzNSw0NC4wMTYsNzcuNzg2LDk4Ljg0NkgyNTQuMzgzeg0KCSBNMzM3LjIxMiwxMzQuMjA2YzguMTgyLDMwLjgzOCwxMy4xNDUsNjUuOTEyLDEzLjgxNSwxMDIuOTMxaC05Ni42NDRWMTM0LjIwNkgzMzcuMjEyeiBNMjM3LjEzNywxOC4xMTR2OTguODQ2aC03Ny43ODMNCglDMTc3LjAwNCw2Mi4xMywyMDUuMzE5LDI0LjAxNywyMzcuMTM3LDE4LjExNHogTTIzNy4xMzcsMTM0LjIwNnYxMDIuOTMxaC05Ni42NDFjMC42NzEtMzcuMDE5LDUuNjM0LTcyLjA5MywxMy44MTUtMTAyLjkzMUgyMzcuMTM3DQoJeiBNMTIzLjI1MSwyMzcuMTM3SDE3LjQ2NWMxLjM5Mi0zNy4yNjksMTEuNzM5LTcyLjI3LDI4Ljk2Ny0xMDIuOTMxaDg5LjY2QzEyOC40MDEsMTY1LjEzNSwxMjMuODYxLDE5OS45NTksMTIzLjI1MSwyMzcuMTM3eg0KCSBNMTQwLjQ5NiwyNTQuMzgzaDk2LjY0MXYxMDIuOTMxaC04Mi44MjZDMTQ2LjEzLDMyNi40NzUsMTQxLjE2NywyOTEuNDAyLDE0MC40OTYsMjU0LjM4M3ogTTIzNy4xMzcsMzc0LjU2djk4Ljg0Ng0KCWMtMzEuODE4LTUuOTA0LTYwLjEzMy00NC4wMTYtNzcuNzgzLTk4Ljg0NkgyMzcuMTM3eiBNMjU0LjM4Myw0NzMuNDA2VjM3NC41Nmg3Ny43ODYNCglDMzE0LjUxOCw0MjkuMzksMjg2LjIwMSw0NjcuNTAyLDI1NC4zODMsNDczLjQwNnogTTI1NC4zODMsMzU3LjMxM1YyNTQuMzgzaDk2LjY0NGMtMC42NywzNy4wMTktNS42MzQsNzIuMDkzLTEzLjgxNSwxMDIuOTMxDQoJSDI1NC4zODN6IE0zNjguMjczLDI1NC4zODNoMTA1Ljc4MWMtMS4zOTIsMzcuMjY5LTExLjc0LDcyLjI3LTI4Ljk2NywxMDIuOTMxaC04OS42NTcNCglDMzYzLjEyMiwzMjYuMzg1LDM2Ny42NjIsMjkxLjU2MSwzNjguMjczLDI1NC4zODN6IE0zNjguMjczLDIzNy4xMzdjLTAuNjExLTM3LjE3OC01LjE1MS03Mi4wMDItMTIuODQzLTEwMi45MzFoODkuNjU3DQoJYzE3LjIyNywzMC42NjEsMjcuNTc1LDY1LjY2MiwyOC45NjcsMTAyLjkzMUgzNjguMjczeiBNNDM0LjM5NSwxMTYuOTZoLTgzLjY2NmMtMTIuMjE4LTQwLjUxOS0zMC4xMzYtNzMuMDE4LTUxLjY4OS05My4zNzgNCglDMzU0LjkwMiwzNi45OCw0MDIuODUxLDcwLjkwOCw0MzQuMzk1LDExNi45NnogTTE5Mi40ODIsMjMuNTgyYy0yMS41NTMsMjAuMzYxLTM5LjQ3LDUyLjg1OS01MS42ODcsOTMuMzc4SDU3LjEyNQ0KCUM4OC42NjgsNzAuOTA4LDEzNi42MTgsMzYuOTgsMTkyLjQ4MiwyMy41ODJ6IE01Ny4xMjUsMzc0LjU2aDgzLjY2OWMxMi4yMTcsNDAuNTE5LDMwLjEzNSw3My4wMTcsNTEuNjg3LDkzLjM3OA0KCUMxMzYuNjE4LDQ1NC41NCw4OC42NjgsNDIwLjYxMiw1Ny4xMjUsMzc0LjU2eiBNMjk5LjA0LDQ2Ny45MzhjMjEuNTU0LTIwLjM2LDM5LjQ3MS01Mi44NTksNTEuNjg5LTkzLjM3OGg4My42NjYNCglDNDAyLjg1MSw0MjAuNjExLDM1NC45MDIsNDU0LjU0LDI5OS4wNCw0NjcuOTM4eiIvPg0KPC9zdmc+" }
    },

    experienceHeading: "EXPERIENCE",
    experience: [
      {
        company: "Adatum Corporation",
        period: "2014-2016",
        details: "Developed and evolved brand identities, created compelling collateral, brochure and board presentation materials, implemented design solutions. Contributed to award-winning projects, and maintained good designs."
      },
      {
        company: "Prosaware, Inc.",
        period: "2012-2014",
        details: "Actively participated in the development and evaluation of brand identities, was involved in client follow-up. Created compelling collateral, contributed to projects that received awards."
      },
      {
        company: "Relecloud",
        period: "2009-2012",
        details: "As an intern I actively learned and contributed to the development of various designs for a set of tasks that were either individually or collaboratively done. I gained lots of experience and professional."
      }
    ],

    skillsHeading: "SKILLS",
    skills: [
      "Design software",
      "Typography",
      "UI/UX design",
      "Print design",
      "Project management",
      "Creative problem solving",
      "Communication skills"
    ],

    educationHeading: "EDUCATION",
    education: [
      {
        school: "Graphic Design Institute",
        period: "2007-2009",
        degree: "Associate Degree in Graphic Design"
      },
      {
        school: "Jasper University",
        period: "2004-2008",
        degree: "Bachelor's Degree, Graphic Design"
      }
    ]
  });

  const resumeRef = useRef();

  const handleChange = (field, e) =>
    setResumeData({ ...resumeData, [field]: e.target.innerText });

  const handleContactChange = (key, e) => {
    setResumeData({
      ...resumeData,
      contact: {
        ...resumeData.contact,
        [key]: { ...resumeData.contact[key], value: e.target.innerText }
      }
    });
  };

  const handleNestedChange = (section, index, key, e) => {
    const updated = [...resumeData[section]];
    const value = e?.target?.innerText ?? e;
    updated[index] = { ...updated[index], [key]: value };
    setResumeData({ ...resumeData, [section]: updated });
  };

  const handleRoleChange = (index, e) => {
    const updated = [...resumeData.roles];
    updated[index] = e.target.innerText;
    setResumeData({ ...resumeData, roles: updated });
  };

  const handleSkillChange = (index, e) => {
    const updated = [...resumeData.skills];
    updated[index] = e.target.innerText;
    setResumeData({ ...resumeData, skills: updated });
  };

  const addItem = (field, newItem) =>
    setResumeData({ ...resumeData, [field]: [...resumeData[field], newItem] });

  const removeItem = (field, index) =>
    setResumeData({ ...resumeData, [field]: resumeData[field].filter((_, i) => i !== index) });

  const handleDownload = () => {
    const buttons = document.querySelectorAll(".no-print");
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");

      buttons.forEach((btn) => (btn.style.display = "block"));
    });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <div ref={resumeRef} style={{ position: "relative", border: "1px solid #ccc", width: "100%", margin: "0 auto", background: "#fff" }}>
        {/* Buttons */}
        <button className="no-print" onClick={() => setIsEditing(!isEditing)} style={{
          position: "absolute", top: "20px", left: "20px",
          padding: "10px 20px", backgroundColor: "#01040aff", color: "white",
          border: "none", borderRadius: "50px", cursor: "pointer"
        }}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button className="no-print" onClick={handleDownload} style={{
          position: "absolute", top: "20px", right: "20px",
          padding: "10px 20px", backgroundColor: "#03050aff", color: "white",
          border: "none", borderRadius: "50px", cursor: "pointer"
        }}>
          Download
        </button>

        {/* Header Section */}
        <div style={{ display: "flex", height: "250px" }}>
          <div style={{
            width: "71%", backgroundColor: "#333", color: "white",
            display: "flex", alignItems: "center", paddingLeft: "30px"
          }}>
            {/* Left Column - Name */}
            <div style={{ width: "35%", textAlign: "left", marginLeft: "40px", marginTop: "40px" }}>
              <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("firstName", e)} style={{ margin: 0, fontSize: "50px", fontFamily: "Rockwell, sans-serif" }}>
                {resumeData.firstName}
              </p>
              <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("lastName", e)} style={{ margin: 0, fontSize: "50px", fontFamily: "Rockwell, sans-serif", color: "grey" }}>
                {resumeData.lastName}
              </p>
            </div>
          </div>

          <div style={{
            width: "30%", backgroundColor: "#00a4b4", color: "white",
            display: "flex", flexDirection: "column", justifyContent: "center",
            paddingLeft: "20px", paddingTop: "40px"
          }}>
            {resumeData.roles.map((role, i) => (
              <div key={i} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleRoleChange(i, e)}
                  style={{
                    fontSize: "18px",
                    paddingLeft: "30px",
                    fontWeight: role === "UI/UX Engineer" || role === "Developer" ? "bold" : "normal",
                    color: role === "UI/UX Engineer" || role === "Developer" ? "#003366" : "white"
                  }}
                >
                  {role}
                </span>
                {isEditing && (
                  <span onClick={() => removeItem("roles", i)} style={{ marginLeft: "10px", fontSize: "12px", color: "red", cursor: "pointer" }}>
                    Remove
                  </span>
                )}
              </div>
            ))}
            {isEditing && (
              <span onClick={() => addItem("roles", "New Role")} style={{ marginTop: "5px", fontSize: "12px", color: "yellow", cursor: "pointer", paddingLeft: "30px" }}>
                + Add Role
              </span>
            )}
          </div>
        </div>

        {/* Profile/Contact Section */}
        <div style={{ display: "flex", minHeight: "100px" }}>
          <div style={{ width: "70%", backgroundColor: "white" }}>
            <h3 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("profileHeading", e)} style={{
              backgroundColor: "#00a4b4", color: "white", margin: 0, paddingLeft: "70px",
              fontSize: "22px", fontWeight: "normal", height: "50px", display: "flex",
              alignItems: "center", fontFamily: "Rockwell, sans-serif"
            }}>
              {resumeData.profileHeading}
            </h3>
            <div style={{ paddingLeft: "70px", height: "150px", width: "90%", display: "flex" }}>
              <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("profileContent", e)} style={{
                fontSize: "14px", lineHeight: "1.5", margin: 0, color: "#333", display: "flex", alignItems: "center"
              }}>
                {resumeData.profileContent}
              </p>
            </div>
          </div>

          <div style={{ width: "30%", backgroundColor: "white" }}>
            <h3 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("contactHeading", e)} style={{
              backgroundColor: "#333", color: "white", margin: 0, paddingLeft: "50px",
              fontSize: "22px", fontWeight: "normal", height: "50px", display: "flex",
              alignItems: "center", fontFamily: "Rockwell, sans-serif"
            }}>
              {resumeData.contactHeading}
            </h3>
            <div style={{ paddingLeft: "50px", paddingTop: "20px", backgroundColor: "#f5f5f5" }}>
              {Object.entries(resumeData.contact).map(([key, { value, icon }]) => (
                <p key={key} style={{ fontSize: "16px", margin: "8px 0", color: "#333", display: "flex", alignItems: "center" }}>
                  <img src={icon} alt={key} style={{ width: "18px", height: "18px", marginRight: "8px" }} />
                  <span contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleContactChange(key, e)}>
                    {value}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div style={{ display: "flex", minHeight: "400px" }}>
          {/* Experience Column */}
          <div style={{ width: "70%", backgroundColor: "white" }}>
            <h3 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("experienceHeading", e)} style={{
              backgroundColor: "#00a4b4", color: "white", margin: 0, paddingLeft: "70px",
              fontSize: "22px", fontWeight: "normal", display: "flex",
              alignItems: "center", height: "50px", fontFamily: "Rockwell, sans-serif"
            }}>
              {resumeData.experienceHeading}
            </h3>
            <div style={{ paddingLeft: "70px", paddingTop: "30px", width: "90%" }}>
              {resumeData.experience.map((exp, i) => (
                <div key={i} style={{
                  marginBottom: "20px",
                  paddingBottom: "15px",
                  borderBottom: i < resumeData.experience.length - 1 ? "1px solid #00a4b4" : "none"
                }}>
                  <h4 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("experience", i, "company", e)} style={{ fontSize: "18px", fontWeight: "bold", margin: 0, color: "#333" }}>
                    {exp.company}
                  </h4>
                  <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("experience", i, "period", e)} style={{ fontSize: "12px", color: "#00a4b4", fontWeight: "bold", margin: "4px 0 8px 0" }}>
                    {exp.period}
                  </p>
                  <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("experience", i, "details", e)} style={{ fontSize: "14px", lineHeight: "1.5", margin: "8px 0 0 0", paddingBottom: "20px", color: "#333" }}>
                    {exp.details}
                  </p>
                  {isEditing && (
                    <div style={{ marginTop: 6 }}>
                      <span onClick={() => removeItem("experience", i)} style={{ color: "red", fontSize: "12px", cursor: "pointer" }}>Remove</span>
                    </div>
                  )}
                </div>
              ))}
              {isEditing && (
                <span onClick={() => addItem("experience", { company: "Company Name", period: "Year-Year", details: "Description of role and achievements..." })} style={{ color: "#00a4b4", cursor: "pointer", fontSize: "12px" }}>+ Add Experience</span>
              )}
            </div>
          </div>

          {/* Skills & Education Column */}
          <div style={{ width: "30%", backgroundColor: "white" }}>
            {/* Skills */}
            <h3 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("skillsHeading", e)} style={{
              backgroundColor: "#333", color: "white", margin: 0, paddingLeft: "50px",
              fontSize: "22px", fontWeight: "normal", display: "flex", alignItems: "center",
              height: "50px", fontFamily: "Rockwell, sans-serif"
            }}>
              {resumeData.skillsHeading}
            </h3>
            <div style={{ paddingLeft: "50px", paddingTop: "40px", paddingBottom: "20px", backgroundColor: "#f5f5f5" }}>
              {resumeData.skills.map((skill, i) => (
                <div key={i} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                  <span style={{ width: "4px", height: "4px", backgroundColor: "#00a4b4", borderRadius: "50%", marginRight: "8px" }}></span>
                  <span contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleSkillChange(i, e)} style={{ fontSize: "16px", color: "#00a4b4" }}>
                    {skill}
                  </span>
                  {isEditing && (
                    <span onClick={() => removeItem("skills", i)} style={{ marginLeft: "10px", fontSize: "10px", color: "red", cursor: "pointer" }}>Remove</span>
                  )}
                </div>
              ))}
              {isEditing && <span onClick={() => addItem("skills", "New Skill")} style={{ color: "#00a4b4", cursor: "pointer", fontSize: "12px", marginTop: "10px", display: "block" }}>+ Add Skill</span>}
            </div>

            {/* Education */}
            <h3 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("educationHeading", e)} style={{
              backgroundColor: "#333", color: "white", margin: 0, paddingLeft: "50px",
              fontSize: "22px", fontWeight: "normal", display: "flex", alignItems: "center",
              height: "50px", fontFamily: "Rockwell, sans-serif"
            }}>
              {resumeData.educationHeading}
            </h3>
            <div style={{ paddingLeft: "50px", paddingTop: "30px", backgroundColor: "#f5f5f5" }}>
              {resumeData.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <h4 contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("education", i, "school", e)} style={{ fontSize: "16px", fontWeight: "bold", margin: 0, color: "#333" }}>
                    {edu.school}
                  </h4>
                  <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("education", i, "period", e)} style={{ fontSize: "12px", color: "#00a4b4", margin: "2px 0", fontWeight: "bold" }}>
                    {edu.period}
                  </p>
                  <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleNestedChange("education", i, "degree", e)} style={{ fontSize: "12px", color: "#333", margin: "2px 0", paddingBottom: "15px" }}>
                    {edu.degree}
                  </p>
                  {isEditing && <div style={{ marginTop: 6 }}><span onClick={() => removeItem("education", i)} style={{ color: "red", fontSize: "10px", cursor: "pointer" }}>Remove</span></div>}
                </div>
              ))}
              {isEditing && <span onClick={() => addItem("education", { school: "New School", period: "Year-Year", degree: "Degree Name" })} style={{ color: "#00a4b4", cursor: "pointer", fontSize: "12px" }}>+ Add Education</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate5;
