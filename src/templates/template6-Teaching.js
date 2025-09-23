import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate6 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    firstName: "Tonnie",
    lastName: "Thomson",
    objectiveHeading: "OBJECTIVE",
    objectiveContent: "My primary objective is to provide a safe and challenging learning environment that encourages student growth and development. I aim to facilitate engaging and developmentally appropriate instruction that promotes student learning, critical thinking, and problem-solving skills.",

    referencesHeading: "REFERENCES",
    referencesContent: "Available upon request",

    address: "987 6th Ave\nSanta Fe, NM 87454\nUSA",
    phone: "706.555.0123",
    email: "tonnie@example.com",
    website: "www.tonnieexample.com",

    experienceHeading: "EXPERIENCE",
    experience: [
      {
        period: "JAN 20XX - AUG 20XX",
        details: "Teacher | Holsum Elementary School | Santa Fe, NM"
      },
      {
        period: "OCT 20XX - MAY 20XX",
        details: "Teacher's Aide | Holsum Elementary School | Santa Fe, NM"
      },
      {
        period: "SEP 20XX - JUN 20XX",
        details: "Teacher's Aide | Holsum Elementary School | Santa Fe, NM"
      }
    ],
    experienceDescription: "Key responsibilities: planning and delivering effective instructional activities across various subjects and grade levels; assessing and monitoring student progress; and providing educational support and intervention as needed.",

    educationHeading: "EDUCATION",
    education: [
      {
        school: "Holsum College Santa Fe, NM",
        degree: "Bachelor's Degree in Elementary Education"
      }
    ],

    communicationHeading: "COMMUNICATION",
    communicationContent: "Collaborating with colleagues, parents, and community members to support student learning and achievement - as essential responsibility of an elementary school teacher.",

    leadershipHeading: "LEADERSHIP",
    leadershipContent: "As a teacher, I maintain a positive classroom environment that promotes student engagement, behavior management, and social emotional development."
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
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
        }}
      >
        {/* Buttons */}
        <button
          className="no-print"
          onClick={() => setIsEditing(!isEditing)}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px 20px",
            backgroundColor: "#01040aff",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer"
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="no-print"
          onClick={handleDownload}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#03050aff",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer"
          }}
        >
          Download
        </button>

        {/* Name Header - With Background Split */}
        <div style={{ display: "flex" }}>
          <div style={{
            width: "33.3%",
            backgroundColor: "rgb(230, 245, 240)",
            padding: "80px 0 30px 40px",
            fontFamily: "Georgia, sans-serrif"
          }}>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("firstName", e)}
              style={{ margin: 0, fontSize: "70px", color: "rgb(74, 154, 130)" }}
            >
              {resumeData.firstName}
            </p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("lastName", e)}
              style={{ margin: 0, fontSize: "70px", color: "rgb(74, 154, 130)" }}
            >
              {resumeData.lastName}
            </p>
          </div>
          <div style={{
            width: "70%",
            backgroundColor: "white",
            padding: "60px 40px 30px 0"
          }}>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <div style={{ display: "flex", minHeight: "800px" }}>
          {/* Left Column - 30% */}
          <div style={{
            width: "30%",
            backgroundColor: "rgb(230, 245, 240)",
            padding: "30px 50px"
          }}>
            {/* Objective */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("objectiveHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.objectiveHeading}
            </p>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("objectiveContent", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 30px 0"
              }}
            >
              {resumeData.objectiveContent}
            </p>

            {/* References */}
            <h3
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("referencesHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.referencesHeading}
            </h3>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("referencesContent", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 30px 0"
              }}
            >
              {resumeData.referencesContent}
            </p>

            {/* Address */}
            <h3
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("addressHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.addressHeading || "ADDRESS"}
            </h3>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("address", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 20px 0",
                whiteSpace: "pre-line"
              }}
            >
              {resumeData.address}
            </p>

            {/* Phone */}
            <h3
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("phoneHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.phoneHeading || "PHONE"}
            </h3>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("phone", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 20px 0"
              }}
            >
              {resumeData.phone}
            </p>

            {/* Email */}
            <h3
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("emailHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.emailHeading || "EMAIL"}
            </h3>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("email", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 20px 0"
              }}
            >
              {resumeData.email}
            </p>

            {/* Website */}
            <h3
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("websiteHeading", e)}
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "black",
                margin: "0 0 15px 0",
                fontFamily: "Georgia, sans-serrif"
              }}
            >
              {resumeData.websiteHeading || "WEBSITE"}
            </h3>

            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("website", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                margin: "0 0 20px 0"
              }}
            >
              {resumeData.website}
            </p>
          </div>

          {/* Right Column - 70% */}
          <div style={{
            width: "70%",
            backgroundColor: "white",
            padding: "30px 40px"
          }}>
            {/* Experience */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px"
            }}>
              <h3
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange("experienceHeading", e)}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "rgb(74, 154, 130)",
                  margin: 0,
                  marginRight: "20px",
                  fontFamily: "Georgia, sans-serrif"
                }}
              >
                {resumeData.experienceHeading}
              </h3>
              <div style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgb(74, 154, 130)"
              }}></div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              {resumeData.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                        marginBottom: "5px", // spacing between lines
                        fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                      }}
                    >
                      {exp.period}
                    </div>
                    <div
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                      style={{
                        fontSize: "14px",
                        color: "rgb(74, 154, 130)",
                        lineHeight: "1.4",
                        fontWeight: "bolder",
                        fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                      }}
                    >
                      {exp.details}
                    </div>
                    {isEditing && (
                      <span
                        onClick={() => removeItem("experience", i)}
                        style={{
                          marginLeft: "10px",
                          fontSize: "12px",
                          color: "red",
                          cursor: "pointer",

                        }}
                      >
                        Remove
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <span
                  onClick={() =>
                    addItem("experience", {
                      period: "XXX 20XX - XXX 20XX",
                      details: "New Position | Company | Location"
                    })
                  }
                  style={{
                    color: "rgb(74, 154, 130)",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "block",
                    marginTop: "10px"
                  }}
                >
                  + Add Experience
                </span>
              )}

              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange("experienceDescription", e)}
                style={{
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "black",
                  margin: "15px 0 0 0",
                  fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                }}
              >
                {resumeData.experienceDescription}
              </p>
            </div>

            {/* Education */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px"
            }}>
              <h3
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange("educationHeading", e)}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "rgb(74, 154, 130)",
                  margin: 0,
                  marginRight: "20px",
                  fontFamily: "Georgia, sans-serrif"
                }}
              >
                {resumeData.educationHeading}
              </h3>
              <div style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgb(74, 154, 130)"
              }}></div>
            </div>

            <div style={{ marginBottom: "30px" }}>
              {resumeData.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleNestedChange("education", i, "school", e)}
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      color: "black",
                      margin: "0 0 5px 0",
                      fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                    }}
                  >
                    {edu.school}
                  </p>
                  <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                    style={{
                      fontSize: "14px",
                      color: "black",
                      margin: 0,
                      fontFamily: "Avenir Next LT Pro Light, sans-serrif",
                    }}
                  >
                    {edu.degree}
                  </p>
                  {isEditing && (
                    <span
                      onClick={() => removeItem("education", i)}
                      style={{
                        fontSize: "12px",
                        color: "red",
                        cursor: "pointer",
                        display: "block",
                        marginTop: "5px"
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
                      school: "School Name, Location",
                      degree: "Degree Name"
                    })
                  }
                  style={{
                    color: "rgb(74, 154, 130)",
                    cursor: "pointer",
                    fontSize: "12px"
                  }}
                >
                  + Add Education
                </span>
              )}
            </div>

            {/* Communication */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px"
            }}>
              <h3
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange("communicationHeading", e)}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "rgb(74, 154, 130)",
                  margin: 0,
                  marginRight: "20px",
                  fontFamily: "Georgia, sans-serrif"
                }}
              >
                {resumeData.communicationHeading}
              </h3>
              <div style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgb(74, 154, 130)"
              }}></div>
            </div>

            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("communicationContent", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                color: "black",
                margin: "0 0 30px 0",
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
              }}
            >
              {resumeData.communicationContent}
            </p>

            {/* Leadership */}
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "25px"
            }}>
              <h3
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleChange("leadershipHeading", e)}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "rgb(74, 154, 130)",
                  margin: 0,
                  marginRight: "20px",
                  fontFamily: "Georgia, sans-serrif"
                }}
              >
                {resumeData.leadershipHeading}
              </h3>
              <div style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgb(74, 154, 130)"
              }}></div>
            </div>

            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleChange("leadershipContent", e)}
              style={{
                fontSize: "14px",
                lineHeight: "1.4",
                color: "black",
                margin: 0,
                fontFamily: "Avenir Next LT Pro Light, sans-serrif",
              }}
            >
              {resumeData.leadershipContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate6;