import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate10 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "Andree Rocher",
        title: "PROFESSIONAL TITLE",
        contact: "Philadelphia, PA | 705.555.0121 | andree@example.com",

        objectiveHeading: "Objective",
        objective:
            "To obtain a challenging data scientist position in a dynamic and innovative organization where I can use my technical and analytical skills.",

        experienceHeading: "Experience",
        experience: [
            {
                company: "FluorGen",
                role: "Data Scientist",
                period: "20XX – 20XX",
                details: [
                    "Increased customer retention by 20%",
                    "Reduced fraudulent charges by 50%",
                    "Improved product recommendations and increased sales",
                    "Drove business decisions and reduced operational costs",
                ],
            },
            {
                company: "Pantheros Labs",
                role: "Junior Data Scientist",
                period: "20XX – 20XX",
                details: [
                    "Cleaned and preprocessed data",
                    "Conducted statistical tests for decision support",
                    "Developed machine learning models for prediction",
                    "Collaborated on A/B tests, increased click-through",
                ],
            },
        ],

        educationHeading: "Education",
        education: [
            {
                period: "20XX",
                degree: "Jasper University, MS Data Science",
                details: ["Major: Data Science | Minor: Machine Learning"],
            },
            {
                period: "20XX",
                degree: "Bellows College, BS Mathematics",
                details: ["Major: Mathematics | Minor: Computer Science"],
            },
        ],

        skillsHeading: "Skills & Abilities",
        skills: ["Management", "Problem solving", "Communication", "Leadership"],
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

    const handleListChange = (section, index, listKey, listIndex, e) => {
        const updated = [...resumeData[section]];
        const list = [...(updated[index][listKey] || [])];
        list[listIndex] = e.target.innerText;
        updated[index] = { ...updated[index], [listKey]: list };
        setResumeData({ ...resumeData, [section]: updated });
    };

    const handleSkillChange = (index, e) => {
        const updated = [...resumeData.skills];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, skills: updated });
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

                {/* Name */}
                <h1
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("fullName", e)}
                    style={{
                        fontSize: "50px",
                        fontWeight: "900",
                        marginTop: "80px",
                        marginLeft: "70px",
                        marginRight: "70px",
                        marginBottom: "5px",
                    }}
                >
                    {resumeData.fullName}
                </h1>

                {/* Title */}
                <h2
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("title", e)}
                    style={{
                        fontSize: "18px",
                        fontWeight: "normal",
                        marginLeft: "70px",
                        marginRight: "70px",
                        marginBottom: "5px",
                    }}
                >
                    {resumeData.title}
                </h2>

                {/* Contact */}
                <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("contact", e)}
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginLeft: "70px",
                        marginRight: "70px",
                        marginBottom: "50px",
                    }}
                >
                    {resumeData.contact}
                </p>

                {/* Objective */}
                <h3 style={{
                    fontSize: "20px", fontWeight: "bold", marginBottom: "5px", marginLeft: "70px",
                    marginRight: "70px",
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("objectiveHeading", e)}
                    >
                        {resumeData.objectiveHeading}
                    </span>
                </h3>
                <hr style={{
                    border: "1px solid black", marginBottom: "10px", marginLeft: "70px",
                    marginRight: "70px",
                }} />
                <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("objective", e)}
                    style={{
                        fontSize: "16px", marginBottom: "30px", lineHeight: "1.5", marginLeft: "70px",
                        marginRight: "70px",
                    }}
                >
                    {resumeData.objective}
                </p>

                {/* Experience */}
                <h3 style={{
                    fontSize: "20px", fontWeight: "bold", marginBottom: "5px", marginLeft: "70px",
                    marginRight: "70px",
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("experienceHeading", e)}
                    >
                        {resumeData.experienceHeading}
                    </span>
                </h3>
                <hr style={{
                    border: "1px solid black", marginBottom: "10px", marginLeft: "70px",
                    marginRight: "70px",
                }} />
                {resumeData.experience.map((exp, i) => (
                    <div key={i} style={{
                        marginBottom: "20px", marginLeft: "70px",
                        marginRight: "70px",
                    }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            <span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                >
                                    {exp.company}
                                </span>{" "}
                                |{" "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                >
                                    {exp.role}
                                </span>
                            </span>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                            >
                                {exp.period}
                            </span>
                        </div>

                        <ul style={{ margin: "5px 0 0 20px", padding: 0 }}>
                            {exp.details.map((d, j) => (
                                <li
                                    key={j}
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleListChange("experience", i, "details", j, e)}
                                    style={{ fontSize: "16px", marginBottom: "5px" }}
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>
                        {isEditing && (
                                <span
                                    onClick={() => removeItem("experience", i)}
                                    style={{ marginLeft: "8px", fontSize: "14px", color: "red", cursor: "pointer" }}
                                >
                                    Remove
                                </span>
                            )}
                    </div>
                ))}
                {isEditing && (
                        <span
                            onClick={() => addItem("experience", {
                                    period : "period",
                                    company: "Company",
                                    role: "role",
                                    details: ["Achievement or responsibility..."]
                                })}
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px", marginRight: "70px" }}
                        >
                            + Add Experience
                        </span>
                    )}

                {/* Education */}
                <h3 style={{
                    fontSize: "20px", fontWeight: "bold", marginBottom: "5px", marginLeft: "70px",
                    marginRight: "70px",
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("educationHeading", e)}
                    >
                        {resumeData.educationHeading}
                    </span>
                </h3>
                <hr style={{
                    border: "1px solid black", marginBottom: "10px", marginLeft: "70px",
                    marginRight: "70px",
                }} />
                {resumeData.education.map((edu, i) => (
                    <div key={i} style={{
                        marginBottom: "20px", marginLeft: "70px",
                        marginRight: "70px",
                    }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "16px",
                                fontWeight: "bold",
                            }}
                        >
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                            >
                                {edu.degree}
                            </span>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("education", i, "period", e)}
                            >
                                {edu.period}
                            </span>
                        </div>

                        <ul style={{ margin: "5px 0 0 20px", padding: 0 }}>
                            {edu.details.map((d, j) => (
                                <li
                                    key={j}
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleListChange("education", i, "details", j, e)}
                                    style={{
                                        fontSize: "16px", marginBottom: "5px",
                                    }}
                                >
                                    {d}
                                </li>
                            ))}
                        </ul>
                        {isEditing && (
                                <span
                                    onClick={() => removeItem("education", i)}
                                    style={{ marginLeft: "8px", fontSize: "14px", color: "red", cursor: "pointer" }}
                                >
                                    Remove
                                </span>
                            )}
                    </div>
                ))}
                {isEditing && (
                        <span
                            onClick={() => addItem("education", {
                                    degree: "Degree",
                                    period: "20XX",
                                    details: ["Detail about education..."]
                                })}
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px", marginRight: "70px" }}
                        >
                            + Add Education
                        </span>
                    )}

                {/* Skills */}
                <h3 style={{
                    fontSize: "20px", fontWeight: "bold", marginBottom: "5px", marginLeft: "70px",
                    marginRight: "70px",
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("skillsHeading", e)}
                    >
                        {resumeData.skillsHeading}
                    </span>
                </h3>
                <hr style={{
                    border: "1px solid black", marginBottom: "10px", marginLeft: "70px",
                    marginRight: "70px",
                }} />
                <ul style={{ marginBottom: "30px", paddingLeft: "20px" }}>
                    {resumeData.skills.map((skill, i) => (
                        <li
                            key={i}
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleSkillChange(i, e)}
                            style={{
                                fontSize: "16px", marginBottom: "5px", marginLeft: "70px",
                                marginRight: "70px",
                            }}
                        >
                            {skill}
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("skills", i)}
                                    style={{ marginLeft: "8px", fontSize: "14px", color: "red", cursor: "pointer" }}
                                >
                                    Remove
                                </span>
                            )}
                        </li>

                    ))}
                </ul>
                {isEditing && (
                        <span
                            onClick={() => addItem("skills", "New Skill")}
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "70px", marginRight: "70px" }}
                        >
                            + Add Skill
                        </span>
                    )}
            </div>
        </div>
    );
};

export default ResumeTemplate10;
