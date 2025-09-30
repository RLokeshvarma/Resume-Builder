import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate2ATSHR = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "Janna Gardner",
    contact:
      "4567 Main Street, Chicago, Illinois 98052 • (715) 555-0100 • janna@example.com",
    summary:
      "Human Resources Generalist with 6+ years of experience assisting with all HR staffing needs and requirements. A proven track record of using excellent personal, communication and organization skills to lead HR departments, conduct accurate recruitment, and improve department efficiencies. Team player with excellent communication skills, high quality of work, and highly self-motivated. Strong negotiating skills and business acumen and able to work independently.",
    experience: [
      {
        date: "20XX – PRESENT",
        title: "Human Resources Generalist | Luma Healthcare Company | Chicago, Illinois",
        description:
          "Review, update, and enforce company hiring policies, vision, and other HR policies to ensure compliance with OSHA and local, state, and federal labor regulations. By conducting performance evaluations and designing an annual HR plan, reduced turnover rates by 30% and increased employee satisfaction over a 2-year period. Developed recruitment programs to successfully increase minority employment within the organization. Led diversity training programs to build and deploy a dedicated recruitment team that increased minority hires by 40%."
      },
      {
        date: "JUNE 20XX – AUGUST 20XX",
        title: "Human Resources Intern | Wholeness Healthcare | Boomtown, Ohio",
        description:
          "Assisted HR manager with the employee grievance process. Organized and conducted several seminars for hospital teams on corporate compliance, employee engagement, and conflict management. Assisted HR team to develop onboarding materials for new employees that made the process more efficient and helped new employees adapt quickly. Helped HR team resolve employment law issues and workplace discrimination and harassment complaints."
      }
    ],
    skills: [
      "Type 55 words per minute",
      "Proficient with project management software",
      "Team player",
      "Excellent time management skills",
      "Conflict management",
      "Public speaking",
      "Data analytics"
    ],
    education: [
      "MAY 20XX\nBachelor of Arts Human Resources Management | Jasper University | Ft. Lauderdale, FL\n3.9 GPA • Member of University’s Honor Society"
    ],
    activities: [
      "Literature",
      "Environmental conservation",
      "Art",
      "Yoga",
      "Skiing",
      "Travel"
    ]
  });

  const resumeRef = useRef();

  // Generic handlers
  const handleChange = (field, e) => {
    setResumeData({ ...resumeData, [field]: e.target.innerText });
  };

  const handleArrayChange = (arrayName, index, e) => {
    const updatedArray = [...resumeData[arrayName]];
    updatedArray[index] = e.target.innerText;
    setResumeData({ ...resumeData, [arrayName]: updatedArray });
  };

  const addItem = (arrayName, newItem) => {
    setResumeData({ ...resumeData, [arrayName]: [...resumeData[arrayName], newItem] });
  };

  const removeItem = (arrayName, index) => {
    const updatedArray = [...resumeData[arrayName]];
    updatedArray.splice(index, 1);
    setResumeData({ ...resumeData, [arrayName]: updatedArray });
  };

  const handleDownload = async () => {
    const element = resumeRef.current;
    const buttons = element.querySelectorAll("button");
    buttons.forEach((btn) => (btn.style.display = "none"));

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");

    buttons.forEach((btn) => (btn.style.display = "block"));
  };

  // Editable heading component like Code 1
  const EditableHeading = ({ text, onBlur }) => (
    <h2
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onBlur={onBlur}
      style={{
        fontSize: "18px",
        marginBottom: "10px",
        outline: "none",
        backgroundColor: "#f2f2f2",
        padding: "5px 10px",
        color: "black",
        fontFamily: "'Speak Pro', sans-serif",
      }}
    >
      {text}
    </h2>
  );

  return (
    <div
      style={{
        fontFamily: "Century Gothic, sans-serif",
        padding: "20px",
        color: "#01060cff",
      }}
    >
      {/* Resume */}
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
                        top: "10px",
                        left: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#333",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        zIndex: 10
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
                        zIndex: 10
                    }}
                >
                    Download
                </button>

        {/* Name */}
        <h1
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("name", e)}
          style={{
            textAlign: "center",
            backgroundColor: "#f2f2f2",
            padding: "20px",
            marginLeft: "30px",
            marginRight: "30px",
            marginTop: "70px",
            fontSize: "40px",
            fontFamily: "'Speak Pro', sans-serif",
            color: "black"
          }}
        >
          {resumeData.name}
        </h1>

        {/* Contact */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("contact", e)}
          style={{ textAlign: "center", fontSize: "14px", marginBottom: "30px" }}
        >
          {resumeData.contact}
        </p>

        {/* Summary */}
        <p
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("summary", e)}
          style={{ fontSize: "14px", marginBottom: "0px", padding: "30px 30px 10px 30px" }}
        >
          {resumeData.summary}
        </p>

        {/* Experience */}
        <h2
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("experienceHeading", e)}
          style={{
            display: "block",
            width: "20%",
            backgroundColor: "#f2f2f2",
            padding: "10px 5px",
            fontSize: "22px",
            marginLeft: "30px",
            fontFamily: "'Speak Pro', sans-serif",
            color: "black",
            outline: "none",
          }}
        >
          {resumeData.experienceHeading || "Experience"}
        </h2>

        {resumeData.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: "50px" }}>
            {/* Date */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                const updatedExp = [...resumeData.experience];
                updatedExp[i] = { ...updatedExp[i], date: e.target.innerText || "-" };
                setResumeData({ ...resumeData, experience: updatedExp });
              }}
              style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "30px" }}
            >
              {exp.date}
            </p>

            {/* Title */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                const updatedExp = [...resumeData.experience];
                updatedExp[i] = { ...updatedExp[i], title: e.target.innerText || "-" };
                setResumeData({ ...resumeData, experience: updatedExp });
              }}
              style={{ fontSize: "14px", fontWeight: "bold", marginLeft: "30px" }}
            >
              {exp.title}
            </p>

            {/* Description */}
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                const updatedExp = [...resumeData.experience];
                updatedExp[i] = { ...updatedExp[i], description: e.target.innerText || "-" };
                setResumeData({ ...resumeData, experience: updatedExp });
              }}
              style={{ fontSize: "14px", marginLeft: "30px" }}
            >
              {exp.description}
            </p>

            {isEditing && (
              <span
                onClick={() => removeItem("experience", i)}
                style={{ color: "red", cursor: "pointer", fontSize: "12px", marginLeft: "30px" }}
              >
                Remove
              </span>
            )}
          </div>
        ))}
        {isEditing && (
          <span
            onClick={() =>
              addItem("experience", { date: "New Date", title: "New Title", description: "New description..." })
            }
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
          >
            + Add Experience
          </span>
        )}


        {/* Skills */}
        <h2
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("skillsHeading", e)}
          style={{
            display: "block",
            width: "20%",
            width: "10%",
            backgroundColor: "#f2f2f2",
            padding: "10px 5px",
            fontSize: "18px",
            marginLeft: "30px",
            fontFamily: "'Speak Pro', sans-serif",
            color: "black",
            outline: "none",
          }}
        >
          {resumeData.skillsHeading || "Skills"}
        </h2>
        <ul style={{ fontSize: "14px", marginBottom: "20px", marginLeft: "30px", paddingLeft: "20px" }}>
          {resumeData.skills.map((s, i) => (
            <li key={i} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleArrayChange("skills", i, e)}>
              {s}
              {isEditing && (
                <span onClick={() => removeItem("skills", i)} style={{ color: "red", cursor: "pointer", fontSize: "12px", marginLeft: "10px" }}>
                  Remove
                </span>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <span
            onClick={() => addItem("skills", "New Skill")}
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
          >
            + Add Skill
          </span>
        )}

        {/* Education */}
        <h2
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("educationHeading", e)}
          style={{
            display: "block",
            width: "20%",
            backgroundColor: "#f2f2f2",
            padding: "10px 5px",
            fontSize: "22px",
            marginLeft: "30px",
            fontFamily: "'Speak Pro', sans-serif",
            color: "black",
            outline: "none",
          }}
        >
          {resumeData.educationHeading || "Education"}
        </h2>
        {resumeData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: "20px", marginLeft: "30px" }}>
            <p
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleArrayChange("education", i, e)}
              style={{ fontSize: "14px", whiteSpace: "pre-line" }}
            >
              {edu}
            </p>
            {isEditing && (
              <span
                onClick={() => removeItem("education", i)}
                style={{ color: "red", cursor: "pointer", fontSize: "12px" }}
              >
                Remove
              </span>
            )}
          </div>
        ))}
        {isEditing && (
          <span
            onClick={() => addItem("education", "Year\nDegree / Course\nCGPA")}
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
          >
            + Add Education
          </span>
        )}


        {/* Activities */}
        <h2
          contentEditable={isEditing}
          suppressContentEditableWarning={true}
          onBlur={(e) => handleChange("activitiesHeading", e)}
          style={{
            display: "block",
            width: "20%",
            backgroundColor: "#f2f2f2",
            padding: "10px 5px",
            fontSize: "22px",
            marginLeft: "30px",
            fontFamily: "'Speak Pro', sans-serif",
            color: "black",
            outline: "none",
          }}
        >
          {resumeData.activitiesHeading || "Activities"}
        </h2>

        <ul style={{ fontSize: "14px", marginBottom: "20px", marginLeft: "30px", paddingLeft: "20px" }}>
          {resumeData.activities.map((a, i) => (
            <li key={i} contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleArrayChange("activities", i, e)}>
              {a}
              {isEditing && (
                <span onClick={() => removeItem("activities", i)} style={{ color: "red", cursor: "pointer", fontSize: "12px", marginLeft: "10px" }}>
                  Remove
                </span>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <span
            onClick={() => addItem("activities", "New Activity")}
            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
          >
            + Add Activity
          </span>
        )}
      </div>
    </div>
  );
};

export default ResumeTemplate2ATSHR;
