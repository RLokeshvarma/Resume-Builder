import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate4 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    fullName: "Full Name",
    email: "yourname@example.com",
    phone: "(123) 456-7890",
    website: "www.example.com",

    educationHeading: "EDUCATION",
    // education entries are objects now with gradYear
    education: [
      {
        college: "College, Location",
        degree: "Bachelor of Arts, Degree, GPA",
        gradYear: "Graduation Year",
        details: "Relevant course work"
      }
    ],

    experienceHeading: "PROFESSIONAL EXPERIENCE",
    // experience entries already had date, kept as top-right
    experience: [
      {
        company: "Company, Location",
        role: "Role",
        date: "Month Year",
        details: ["Describe what you did and what your impact was",
          "Remember to be concise"
        ]
      },
      {
        company: "Company, Location",
        role: "Role",
        date: "Month Year",
        details: ["Describe what you did and what your impact was"]
      },
      {
        company: "Company, Location",
        role: "Role",
        date: "Month Year",
        details: ["Describe what you did and what your impact was"]
      },
      {
        company: "Company, Location",
        role: "Role",
        date: "Month Year",
        details: ["Describe what you did and what your impact was"]
      }
    ],

    projectsHeading: "PROJECTS & EXTRACURRICULAR",
    projects: [
      {
        title: "Project/Club",
        date: "Month Year",
        details: ["Describe what you did/built etc."]
      },
      {
        title: "Activity",
        date: "Month Year",
        details: [
          "Describe what you did/built etc.",
          "Accomplishments"
        ]
      },
      {
        title: "Leadership Experience",
        date: "Month Year",
        details: ["Describe what you did/built etc."]
      }
    ],

    skillsHeading: "SKILLS",
    skills: [
      "Programming Languages: List programming languages or skills",
      "Applications/Frameworks: Microsoft office, Adobe Photoshop, Maple, Git, React, jQuery",
      "Languages: Portuguese (advanced), French (advanced)"
    ]
  });

  const resumeRef = useRef();

  const handleChange = (field, e) =>
    setResumeData({ ...resumeData, [field]: e.target.innerText });

  const handleNestedChange = (section, index, key, e) => {
    const updated = [...resumeData[section]];
    // e can be an event or text (we expect event here)
    const value = e?.target?.innerText ?? e;
    updated[index] = { ...updated[index], [key]: value };
    setResumeData({ ...resumeData, [section]: updated });
  };

  // For array-of-strings inside objects (like details lists)
  const handleListChange = (section, index, listKey, listIndex, e) => {
    const updated = [...resumeData[section]];
    const list = [...(updated[index][listKey] || [])];
    list[listIndex] = e.target.innerText;
    updated[index] = { ...updated[index], [listKey]: list };
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
        fontFamily: "Franklin Gothic Book, sans-serif",
        padding: "20px",
        color: "black",
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
        {/* Header */}
        <h1
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("fullName", e)}
          style={{ fontSize: "46px", marginBottom: "5px", marginTop: "70px", marginLeft: "70px", fontFamily: "Franklin Gothic Book, sans-serif" }}
        >
          {resumeData.fullName}
        </h1>
        <p style={{ fontSize: "14px", marginBottom: "50px", marginLeft: "70px", fontWeight: "bold" }}>
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("email", e)}
          >
            {resumeData.email}
          </span>{" "}
          •{" "}
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("phone", e)}
          >
            {resumeData.phone}
          </span>{" "}
          •{" "}
          <span
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleChange("website", e)}
          >
            {resumeData.website}
          </span>
        </p>

        {/* Education */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("educationHeading", e)}
          style={{ borderBottom: "1px solid black", fontSize: "16px", marginLeft: "70px", width: "90%", paddingBottom: "6px" }}
        >
          {resumeData.educationHeading}
        </p>
        {resumeData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "15px", fontSize: "14px", marginLeft: "70px" }}>
            {/* college left / gradYear right on same line */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "95%" }}>
              <div style={{ flex: 1 }}>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("education", i, "college", e)}
                  style={{ margin: 0, fontWeight: 600, marginBottom: "10px" }}
                >
                  {edu.college}
                </p>
              </div>
              <div style={{ marginLeft: "10px", whiteSpace: "nowrap", fontWeight: "bold" }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("education", i, "gradYear", e)}
                  style={{ fontSize: "14px" }}
                >
                  {edu.gradYear}
                </span>
              </div>
            </div>

            {/* degree */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleNestedChange("education", i, "degree", e)}
              style={{ margin: "3px 0", marginLeft: "20px" }}
            >
              {edu.degree}
            </p>

            {/* details */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleNestedChange("education", i, "details", e)}
              style={{ margin: 0, whiteSpace: "pre-line", marginLeft: "20px" }}
            >
              {edu.details}
            </p>

            {isEditing && (
              <div style={{ marginTop: 6 }}>
                <span
                  onClick={() => removeItem("education", i)}
                  style={{ color: "red", fontSize: "14px", cursor: "pointer" }}
                >
                  Remove
                </span>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <span
            onClick={() =>
              addItem("education", {
                college: "College, Location",
                degree: "Degree, GPA",
                gradYear: "Graduation Year",
                details: "Relevant course work",
              })
            }
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px" }}
          >
            + Add Education
          </span>
        )}

        {/* Experience */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("experienceHeading", e)}
          style={{ borderBottom: "1px solid black", fontSize: "16px", marginTop: "20px", marginLeft: "70px", width: "90%", paddingBottom: "6px" }}
        >
          {resumeData.experienceHeading}
        </p>
        {resumeData.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "30px", fontSize: "14px", marginLeft: "70px" }}>
            {/* company left / date right on same line */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "95%" }}>
              <div style={{ flex: 1 }}>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                  style={{ margin: 0, fontWeight: 600 }}
                >
                  {exp.company}
                </p>
              </div>
              <div style={{ marginLeft: "10px", whiteSpace: "nowrap", fontWeight: "bold" }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("experience", i, "date", e)}
                  style={{ fontSize: "12px" }}
                >
                  {exp.date}
                </span>
              </div>
            </div>

            {/* role below */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleNestedChange("experience", i, "role", e)}
              style={{ margin: "3px 0 6px 0" }}
            >
              {exp.role}
            </p>

            {/* bullet details */}
            <ul style={{ marginTop: 0 }}>
              {exp.details.map((d, j) => (
                <li
                  key={j}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleListChange("experience", i, "details", j, e)}
                >
                  {d}
                </li>
              ))}
            </ul>

            {isEditing && (
              <div style={{ marginTop: 6 }}>
                <span
                  onClick={() => removeItem("experience", i)}
                  style={{ color: "red", fontSize: "14px", cursor: "pointer" }}
                >
                  Remove
                </span>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <span
            onClick={() =>
              addItem("experience", {
                company: "Company, Location",
                role: "Role",
                date: "Month Year",
                details: ["Describe what you did and what your impact was"],
              })
            }
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px" }}
          >
            + Add Experience
          </span>
        )}

        {/* Projects */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("projectsHeading", e)}
          style={{ borderBottom: "1px solid black", fontSize: "16px", marginTop: "20px", marginLeft: "70px", width: "90%", paddingBottom: "6px" }}
        >
          {resumeData.projectsHeading}
        </p>
        {resumeData.projects.map((proj, i) => (
          <div key={i} style={{ marginBottom: "15px", fontSize: "14px", marginLeft: "70px" }}>
            {/* title left / date right */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", width: "95%" }}>
              <div style={{ flex: 1 }}>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("projects", i, "title", e)}
                  style={{ margin: 0, fontWeight: 600 }}
                >
                  {proj.title}
                </p>
              </div>
              <div style={{ marginLeft: "10px", whiteSpace: "nowrap", fontWeight: "bold" }}>
                <span
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleNestedChange("projects", i, "date", e)}
                  style={{ fontSize: "14px" }}
                >
                  {proj.date}
                </span>
              </div>
            </div>

            <ul style={{ marginTop: 6 }}>
              {proj.details.map((d, j) => (
                <li
                  key={j}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleListChange("projects", i, "details", j, e)}
                >
                  {d}
                </li>
              ))}
            </ul>

            {isEditing && (
              <div style={{ marginTop: 6 }}>
                <span
                  onClick={() => removeItem("projects", i)}
                  style={{ color: "red", fontSize: "14px", cursor: "pointer" }}
                >
                  Remove
                </span>
              </div>
            )}
          </div>
        ))}
        {isEditing && (
          <span
            onClick={() =>
              addItem("projects", {
                title: "Project/Club",
                date: "Month Year",
                details: ["Describe what you did/built etc."],
              })
            }
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px" }}
          >
            + Add Project
          </span>
        )}


        {/* Skills */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("skillsHeading", e)}
          style={{
            borderBottom: "1px solid black",
            fontSize: "16px",
            marginTop: "20px",
            marginLeft: "70px",
            width: "90%",
            paddingBottom: "6px"
          }}
        >
          {resumeData.skillsHeading}
        </p>

        <div style={{ marginLeft: "70px", fontSize: "14px", marginTop: "5px" }}>
          {resumeData.skills.map((skill, i) => {
            const [title, ...rest] = skill.split(":");
            const content = rest.join(":").trim();
            return (
              <div key={i} style={{ marginBottom: "5px" }}>
                <p
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const updated = [...resumeData.skills];
                    updated[i] = e.target.innerText;
                    setResumeData({ ...resumeData, skills: updated });
                  }}
                  style={{ display: "inline" }}
                >
                  <strong>{title}:</strong> {content}
                </p>

                {isEditing && (
                  <span
                    onClick={() => removeItem("skills", i)}
                    style={{ color: "red", fontSize: "14px", cursor: "pointer", marginLeft: "10px" }}
                  >
                    Remove
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {isEditing && (
          <span
            onClick={() => addItem("skills", "New Skill")}
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px" }}
          >
            + Add Skill
          </span>
        )}


      </div>
    </div>
  );
};

export default ResumeTemplate4;
