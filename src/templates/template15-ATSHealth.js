import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate15 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    fullName: "Sheetal Parmar",
    title: "PHLEBOTOMIST",

    contact: {
      phone: "316.555.0136",
      email: "sheetal@example.com",
    },

    experienceHeading: "PROFESSIONAL EXPERIENCE",
    experience: [
      {
        period: "Jan 20XX — Present",
        role: "Phlebotomist",
        company: "Lamna Healthcare",
        details:
          "This is the place for a summary of your key responsibilities and most stellar accomplishments",
      },
      {
        period: "Feb 20XX — Jan 20XX",
        role: "Phlebotomist",
        company: "Wholesness Healthcare",
        details:
          "This is the place for a summary of your key responsibilities and most stellar accomplishments",
      },
      {
        period: "Dec 20XX — Jul 20XX",
        role: "Phlebotomist",
        company: "Swan Sonia Healthcare",
        details:
          "This is the place for a summary of your key responsibilities and most stellar accomplishments",
      },
    ],

    educationHeading: "EDUCATION",
    education: [
      {
        period: "Aug 20XX — May 20XX",
        degree: "Associates in Phlebotomy",
        college: "Bellows College",
        details:
          "Completed courses in Introduction to Phlebotomy, Venipuncture Techniques, Capillary Puncture Techniques, Laboratory Procedures and Equipment, and Medical Law and Ethics as part of associate degree in Phlebotomy program.",
      },
    ],

    skillsHeading: "SKILLS & ABILITIES",
    skills: [
      "Performing venipuncture and capillary puncture procedures",
      "Processing blood samples according to established laboratory protocols",
      "Familiar with medical terminology and patient privacy regulations",
    ],

    awardsHeading: "AWARDS",
    awards: [
      "Recognized by supervisors and colleagues for excellent patient care and attention to detail",
      "Successfully completed certification in phlebotomy from a national board",
    ],
  });

  const resumeRef = useRef();

  const handleChange = (field, e) =>
    setResumeData({ ...resumeData, [field]: e.target.innerText });

  const handleNestedChange = (section, index, key, e) => {
    const updated = [...resumeData[section]];
    const value = e?.target?.innerText ?? e;
    updated[index] = { ...updated[index], [key]: value };
    setResumeData({ ...resumeData, [section]: updated });
  };

  const handleListChange = (section, index, e) => {
    const updated = [...resumeData[section]];
    updated[index] = e.target.innerText;
    setResumeData({ ...resumeData, [section]: updated });
  };

  const addItem = (field, newItem) =>
    setResumeData({ ...resumeData, [field]: [...resumeData[field], newItem] });

  const removeItem = (field, index) =>
    setResumeData({
      ...resumeData,
      [field]: resumeData[field].filter((_, i) => i !== index),
    });

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
    <div
      style={{
        fontFamily: "Aptos, sans-serif",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        ref={resumeRef}
        style={{
          position: "relative",
          border: "1px solid #ccc",
          width: "100%",
          margin: "0 auto",
          background: "#fff",
          display: "flex",
          color: "white"
        }}
      >
        {/* Buttons */}
        <button
          className="no-print"
          onClick={() => setIsEditing(!isEditing)}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            padding: "8px 16px",
            backgroundColor: "rgb(150 150 150)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="no-print"
          onClick={handleDownload}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 16px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Download
        </button>

        {/* Left Column (90%) */}
        <div style={{ width: "90%", backgroundColor: "rgb(46 41 70)" }}>
          {/* Header */}
          <h1
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("fullName", e)}
            style={{
              fontSize: "70px",
              fontWeight: "bold",
              margin: "0 0 5px 0",
              marginTop: "70px",
              marginLeft: "90px"
            }}
          >
            {resumeData.fullName}
          </h1>
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("title", e)}
            style={{
              fontSize: "30px",
              margin: "0 0 5px 0",
              marginLeft: "90px"
            }}
          >
            {resumeData.title}
          </p>
          <p style={{ fontSize: "14px", margin: 0, marginLeft: "90px" }}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                setResumeData({
                  ...resumeData,
                  contact: {
                    ...resumeData.contact,
                    phone: e.target.innerText,
                  },
                })
              }
            >
              {resumeData.contact.phone}
            </span>{" "}
            |{" "}
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                setResumeData({
                  ...resumeData,
                  contact: {
                    ...resumeData.contact,
                    email: e.target.innerText,
                  },
                })
              }
            >
              {resumeData.contact.email}
            </span>
          </p>
          <div
            style={{
              borderBottom: "2px solid rgb(150 150 150)",
              margin: "30px 0 30px 0",
            }}
          ></div>

          {/* Professional Experience */}
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("experienceHeading", e)}
            style={{
              fontSize: "20px",
              margin: "0 0 15px 0",
              marginLeft: "90px",
            }}
          >
            {resumeData.experienceHeading}
          </p>
          {resumeData.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0, marginLeft: "90px"}}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleNestedChange("experience", i, "period", e)
                  }
                >
                  {exp.period}
                </span>{" "}
                |{" "}
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                >
                  {exp.role}
                </span>
              </p>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                style={{ fontSize: "14px", margin: 0, marginLeft: "90px", marginRight: "90px", fontWeight: "bold"  }}
              >
                {exp.company}
              </p>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                style={{ fontSize: "14px", margin: 0, marginLeft: "90px", marginRight: "90px"  }}
              >
                {exp.details}
              </p>
              {isEditing && (
                <span
                  onClick={() => removeItem("experience", i)}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "90px"
                  }}
                >
                  Remove
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <span
              onClick={() =>
                addItem("experience", {
                  period: "Month 20XX — Month 20XX",
                  role: "Job Title",
                  company: "Company Name",
                  details: "Job description...",
                })
              }
              style={{
                color: "#4472C4",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "90px"
              }}
            >
              + Add Experience
            </span>
          )}

          {/* Education */}
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("educationHeading", e)}
            style={{
              fontSize: "20px",
              margin: "30px 0 15px 0",
              marginLeft: "90px"
            }}
          >
            {resumeData.educationHeading}
          </p>
          {resumeData.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <p style={{ fontSize: "14px", margin: 0, marginLeft: "90px", fontWeight: "bold" }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleNestedChange("education", i, "period", e)
                  }
                >
                  {edu.period}
                </span>{" "}
                |{" "}
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    handleNestedChange("education", i, "degree", e)
                  }
                >
                  {edu.degree}
                </span>
              </p>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleNestedChange("education", i, "college", e)}
                style={{ fontSize: "14px", margin: 0, fontWeight: "bold", marginLeft: "90px", marginRight: "90px" }}
              >
                {edu.college}
              </p>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleNestedChange("education", i, "details", e)
                }
                style={{ fontSize: "14px", margin: 0, marginLeft: "90px", marginRight: "90px"  }}
              >
                {edu.details}
              </p>
              {isEditing && (
                <span
                  onClick={() => removeItem("education", i)}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "90px"
                  }}
                >
                  Remove
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <span
              onClick={() =>
                addItem("education", {
                  period: "Month 20XX — Month 20XX",
                  degree: "Degree Name",
                  college: "College Name",
                  details: "Details...",
                })
              }
              style={{
                color: "#4472C4",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "90px"
              }}
            >
              + Add Education
            </span>
          )}

          {/* Skills & Abilities */}
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("skillsHeading", e)}
            style={{
              fontSize: "20px",
              margin: "20px 0 15px 0",
              marginLeft: "90px"
            }}
          >
            {resumeData.skillsHeading}
          </p>
          {resumeData.skills.map((skill, i) => (
            <p
              key={i}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleListChange("skills", i, e)}
              style={{ fontSize: "14px", margin: 0, marginLeft: "90px", marginRight: "90px"  }}
            >
              {skill}
              {isEditing && (
                <span
                  onClick={() => removeItem("skills", i)}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "30px"
                  }}
                >
                  Remove
                </span>
              )}

            </p>
          ))}
          {isEditing && (
            <span
              onClick={() => addItem("skills", "New Skill")}
              style={{
                color: "#4472C4",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "90px"
              }}
            >
              + Add Skill
            </span>
          )}

          {/* Awards */}
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("awardsHeading", e)}
            style={{
              fontSize: "20px",
              margin: "20px 0 15px 0",
              marginLeft: "90px"
            }}
          >
            {resumeData.awardsHeading}
          </p>
          {resumeData.awards.map((award, i) => (
            <p
              key={i}
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleListChange("awards", i, e)}
              style={{ fontSize: "14px", margin: 0, marginLeft: "90px", marginRight: "90px"  }}
            >
              {award}
              {isEditing && (
                <span
                  onClick={() => removeItem("awards", i)}
                  style={{
                    color: "red",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginLeft: "30px"
                  }}
                >
                  Remove
                </span>
              )}

            </p>
          ))}
          {isEditing && (
            <span
              onClick={() => addItem("awards", "New Award")}
              style={{
                color: "#4472C4",
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "90px"
              }}
            >
              + Add Award
            </span>
          )}

          <div style={{marginBottom: "100px"}}></div>
        </div>

        {/* Right Column (10%) - Light Purple */}
        <div style={{ width: "10%", backgroundColor: "rgb(150 150 150)" }}></div>
      </div>
    </div>
  );
};

export default ResumeTemplate15;
