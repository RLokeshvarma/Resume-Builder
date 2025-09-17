import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Template1UIUX = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    firstName: "MORGAN",
    lastName: "CONNORS",
    title: "UI/UX DESIGNER",
    objective:
      "To obtain a challenging UI/UX Designer position where my creativity, problem-solving skills, and experience in designing engaging and user-friendly interfaces can be utilized to enhance user experiences and drive business objectives.",
    experience: [
      {
        role: "SENIOR UI/UX DESIGNER",
        period: "Jan 20XX - Dec 20XX",
        details:
          "Managed the design team and mentored junior designers to improve design quality and efficiency. Created wireframes, prototypes, and high-fidelity mockups for a variety of web and mobile projects. Worked with clients to understand their needs and goals and translate them into effective design solutions.",
      },
      {
        role: "UI/UX DESIGNER",
        period: "Dec 20XX - Jul 20XX",
        details:
          "Led the redesign of the company's e-commerce platform, resulting in a 25% increase in sales. Conducted user research and usability testing to inform design decisions and improve user experience. Collaborated with development teams to ensure successful implementation of designs.",
      },
      {
        role: "UX DESIGNER",
        period: "Feb 20XX - Oct 20XX ",
        details:
          "Conducted user research and developed user personas to inform product design and development. Designed user flows, wireframes, and prototypes for a mobile app that won several industry awards. Worked closely with the development team to ensure designs were implemented accurately and efficiently.",
      },
    ],
    contact: {
      email: "morgan@example.com",
      phone: "(212) 555-0155",
      website: "www.interstgite.com",
      location: "New York City, NY",
    },
    about:
      "I am passionate about designing digital experiences that are both visually appealing and highly functional. My focus is on creating designs that delight and engage users.",
    education: ["SCHOOL OF FINE ART, 20XX\nBA of Fine Arts, Graphic Design"],
    skills: ["Usability testing", "Project management", "User research"],
  });

  const resumeRef = useRef();

  // Save updates from contentEditable
  const handleContentChange = (field, e) => {
    setResumeData({ ...resumeData, [field]: e.target.innerText });
  };

  const handleNestedContentChange = (section, key, e) => {
    setResumeData({
      ...resumeData,
      [section]: { ...resumeData[section], [key]: e.target.innerText },
    });
  };

  const handleExperienceChange = (index, key, e) => {
    const newExp = [...resumeData.experience];
    newExp[index][key] = e.target.innerText;
    setResumeData({ ...resumeData, experience: newExp });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Updated handleDownload to hide buttons before capturing PDF
  const handleDownload = async () => {
    const element = resumeRef.current;

    // Hide buttons before generating PDF
    const buttons = element.querySelectorAll("button");
    buttons.forEach((btn) => (btn.style.display = "none"));

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("resume.pdf");

    // Show buttons again after PDF is generated
    buttons.forEach((btn) => (btn.style.display = "block"));
  };

  // Add / Remove handlers
  const removeExperience = (index) => {
    const newExp = [...resumeData.experience];
    newExp.splice(index, 1);
    setResumeData({ ...resumeData, experience: newExp });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          role: "New Role",
          period: "Time Period",
          details: "Details about the role...",
        },
      ],
    });
  };

  const removeEducation = (index) => {
    const newEdu = [...resumeData.education];
    newEdu.splice(index, 1);
    setResumeData({ ...resumeData, education: newEdu });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, "New School, Year\nDegree / Course"],
    });
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    setResumeData({ ...resumeData, skills: newSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, "New Skill"],
    });
  };

  // Reusable editable heading with normal font
  const EditableHeading = ({ text, field }) => (
    <h2
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onBlur={(e) => handleContentChange(field, e)}
      style={{
        fontSize: "18px",
        marginBottom: "30px",
        outline: "none",
        fontWeight: "normal",
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
        color: "#003366",
      }}
    >
      {/* Resume */}
      <div
        ref={resumeRef}
        style={{
          position: "relative",
          display: "flex",
          border: "1px solid #ccc",
          width: "100%",
          margin: "0 auto",
          background: "#fff",
        }}
      >
        {/* Edit Button - Top Left */}
        <button
          onClick={toggleEdit}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "8px 16px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#007bff")}
          onMouseLeave={(e) => (e.target.style.background = "black")}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        {/* Download Button - Top Right */}
        <button
          onClick={handleDownload}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "8px 16px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#007bff")}
          onMouseLeave={(e) => (e.target.style.background = "black")}
        >
          Download
        </button>

        {/* Left Column */}
        <div style={{ flex: 2, paddingTop: "80px", paddingLeft: "50px" }}>
          {/* Header */}
          <h1 style={{ margin: "0", fontSize: "40px", outline: "none" }}>
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentChange("firstName", e)}
              style={{ fontWeight: "bold" }}
            >
              {resumeData.firstName}
            </span>{" "}
            <span
              contentEditable={isEditing}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleContentChange("lastName", e)}
              style={{ fontWeight: "normal" }}
            >
              {resumeData.lastName}
            </span>
          </h1>

          <h3
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("title", e)}
            style={{
              marginTop: "5px",
              marginBottom: "50px",
              fontSize: "18px",
              fontWeight: "500",
              outline: "none",
            }}
          >
            {resumeData.title}
          </h3>

          <div
            style={{
              borderBottom: "1px solid black",
              marginBottom: "30px",
              width: "95%",
            }}
          ></div>

          {/* Objective */}
          <EditableHeading text="OBJECTIVE" field="objectiveHeading" />
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("objective", e)}
            style={{
              marginBottom: "50px",
              lineHeight: "1.3",
              fontSize: "14px",
              width: "95%",
              outline: "none",
            }}
          >
            {resumeData.objective}
          </p>

          <div
            style={{
              borderBottom: "1px solid black",
              width: "65%",
              marginBottom: "30px",
            }}
          ></div>

          {/* Experience */}
          <EditableHeading text="EXPERIENCE" field="experienceHeading" />
          {resumeData.experience.map((exp, index) => (
            <div
              key={index}
              style={{
                marginBottom: "40px",
                fontSize: "14px",
                width: "95%",
              }}
            >
              <strong
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleExperienceChange(index, "role", e)}
                style={{ outline: "none" }}
              >
                {exp.role}
              </strong>
              <br />
              <span
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleExperienceChange(index, "period", e)}
                style={{ fontSize: "14px", outline: "none" }}
              >
                {exp.period}
              </span>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleExperienceChange(index, "details", e)}
                style={{
                  fontSize: "14px",
                  marginTop: "10px",
                  lineHeight: "1.3",
                  outline: "none",
                }}
              >
                {exp.details}
              </p>
              {isEditing && (
                <span
                  onClick={() => removeExperience(index)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Remove Job
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <span
              onClick={addExperience}
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              + Add Work
            </span>
          )}
        </div>

        {/* Right Column */}
        <div
          style={{
            flex: 1,
            background: "#e7eff0ff",
            margin: "25px",
            marginTop: "200px",
            padding: "20px",
          }}
        >
          <EditableHeading text="CONTACT" field="contactHeading" />
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleNestedContentChange("contact", "email", e)}
            style={{ margin: "2px 0", fontSize: "14px", outline: "none" }}
          >
            {resumeData.contact.email}
          </p>
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleNestedContentChange("contact", "phone", e)}
            style={{ margin: "2px 0", fontSize: "14px", outline: "none" }}
          >
            {resumeData.contact.phone}
          </p>
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleNestedContentChange("contact", "website", e)}
            style={{ margin: "2px 0", fontSize: "14px", outline: "none" }}
          >
            {resumeData.contact.website}
          </p>
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleNestedContentChange("contact", "location", e)}
            style={{ margin: "2px 0", fontSize: "14px", outline: "none" }}
          >
            {resumeData.contact.location}
          </p>

          <div
            style={{
              marginTop: "30px",
              borderBottom: "1px solid black",
              marginBottom: "30px",
              width: "80%",
            }}
          ></div>

          <EditableHeading text="ABOUT ME" field="aboutHeading" />
          <p
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("about", e)}
            style={{ fontSize: "14px", marginBottom: "30px", outline: "none" }}
          >
            {resumeData.about}
          </p>

          <div
            style={{
              borderBottom: "1px solid black",
              marginBottom: "30px",
              width: "80%",
            }}
          ></div>

          <EditableHeading text="EDUCATION" field="educationHeading" />
          {resumeData.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[i] = e.target.innerText;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
                style={{
                  fontSize: "14px",
                  whiteSpace: "pre-line",
                  lineHeight: "2",
                  outline: "none",
                }}
              >
                {edu}
              </p>
              {isEditing && (
                <span
                  onClick={() => removeEducation(i)}
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Remove Education
                </span>
              )}
            </div>
          ))}
          {isEditing && (
            <span
              onClick={addEducation}
              style={{
                color: "blue",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              + Add Education
            </span>
          )}

          <div
            style={{
              borderBottom: "1px solid black",
              marginBottom: "30px",
              width: "80%",
            }}
          ></div>

          <div style={{ marginBottom: "200px" }}>
            <EditableHeading text="SKILLS" field="skillsHeading" />
            <ul
              style={{
                fontSize: "14px",
                listStyleType: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {resumeData.skills.map((s, i) => (
                <li
                  key={i}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {
                    const newSkills = [...resumeData.skills];
                    newSkills[i] = e.target.innerText;
                    setResumeData({ ...resumeData, skills: newSkills });
                  }}
                  style={{ marginBottom: "4px", outline: "none" }}
                >
                  {s}
                  {isEditing && (
                    <span
                      onClick={() => removeSkill(i)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      Remove
                    </span>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <span
                onClick={addSkill}
                style={{
                  color: "blue",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                + Add Skill
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1UIUX;
