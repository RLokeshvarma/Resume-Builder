import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate24 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "Deepal Surve",
        role: "Marketing Manager",
        contact: [
            "+123-456-7890",
            "123 Anywhere St., Any City",
            "hello@reallygreatsite.com"
        ],
        aboutMe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        education: [
            { university: "Rimserio University", period: "2024 - 2027", details: "Lorem ipsum dolor" },
            { university: "Rimserio University", period: "2021 - 2024", details: "Lorem ipsum dolor" }
        ],
        skills: [
            "Budget Management", "Schedule Planning",
            "Administrative", "Team Coordination",
            "Vendor Relations", "Conflict Resolution"
        ],
        experience: [
            {
                period: "2024–Now",
                company: "Aldenaire & Partners",
                role: "Office Manager",
                overview: "Lorem ipsum dolor sit amet...",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "Sed do eiusmod tempor incididunt ut labore",
                    "Ut enim ad minim veniam"
                ]
            },
            {
                period: "2019–2023",
                company: "Thynk Unlimited",
                role: "Office Manager",
                overview: "Lorem ipsum dolor sit amet...",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "Sed do eiusmod tempor incididunt ut labore",
                    "Ut enim ad minim veniam"
                ]
            },
            {
                period: "2018–2019",
                company: "Wardiere Inc.",
                role: "Office Manager",
                overview: "Lorem ipsum dolor sit amet...",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                    "Sed do eiusmod tempor incididunt ut labore"
                ]
            }
        ]
    });

    const resumeRef = useRef();

    const handleChange = (field, e) =>
        setResumeData({ ...resumeData, [field]: e.target.innerText });

    const handleNestedChange = (section, index, key, e) => {
        const updated = [...resumeData[section]];
        updated[index] = { ...updated[index], [key]: e.target.innerText };
        setResumeData({ ...resumeData, [section]: updated });
    };

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
                fontFamily: "Century Gothic, sans-serif",
                padding: "20px",
                backgroundColor: "#f0f0f0",
            }}
        >
            <div
                ref={resumeRef}
                style={{
                    position: "relative",
                    width: "100%",
                    margin: "0 auto",
                    background: "#fff",
                    padding: "40px 0"
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

                {/* Header Section */}
                <div style={{ height: "5px", background: "white" }}></div>
                <div style={{
                    height: "150px",
                    background: "#d0ecf5ff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <h1
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("fullName", e)}
                        style={{ fontSize: "50px", margin: "10px 0", fontWeight: "bold" }}
                    >
                        {resumeData.fullName}
                    </h1>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("role", e)}
                        style={{ fontSize: "18px", margin: 0 }}
                    >
                        {resumeData.role}
                    </p>
                </div>

                {/* Contact Section */}
                <div
                    style={{
                        background: "#acc6d3ff",
                        color: "black",
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "14px",
                        borderBottom: "2px solid black",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                    }}
                >
                    {resumeData.contact.map((c, i) => (
                        <React.Fragment key={i}>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => {
                                    const updated = [...resumeData.contact];
                                    updated[i] = e.target.innerText;
                                    setResumeData({ ...resumeData, contact: updated });
                                }}
                            >
                                {c}
                            </span>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("education", i)}
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        marginLeft: "30px"
                                    }}
                                >
                                    Remove
                                </span>
                            )}
                            {i < resumeData.contact.length - 1 && <span>|</span>}
                        </React.Fragment>
                    ))}
                    {isEditing && (
                        <span
                            onClick={() => addItem("contact", "New Contact")}
                            style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "14px",
                                display: "block",
                                marginTop: "5px"
                            }}
                        >
                            + Add
                        </span>
                    )}
                </div>

                {/* About Me */}
                <div style={{ padding: "0px", marginLeft: "30px", marginRight: "30px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>ABOUT ME</h3>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("aboutMe", e)}
                        style={{ margin: 0 }}
                    >
                        {resumeData.aboutMe}
                    </p>
                    <hr style={{ marginTop: "20px", borderColor: "#ccc" }} />
                </div>

                {/* Education + Skills */}
                <div
                    style={{
                        display: "flex",
                        borderBottom: "2px solid black",
                        padding: "0px", marginLeft: "30px", marginRight: "30px"
                    }}
                >
                    {/* Left Column - Education */}
                    <div
                        style={{
                            width: "50%",
                            paddingRight: "20px",
                            borderRight: "1px solid #ccc",
                        }}
                    >
                        <h3>EDUCATION</h3>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "8px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        marginBottom: "2px",
                                    }}
                                >
                                    <span style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ marginRight: "6px" }}>•</span>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("education", i, "university", e)}
                                        >
                                            {edu.university}
                                        </span>
                                    </span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                    >
                                        {edu.period}
                                    </span>
                                </div>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                    style={{ margin: 0, marginBottom: "20px", marginLeft: "15px" }}
                                >
                                    {edu.details}
                                </p>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("education", i)}
                                        style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                            marginLeft: "00px"
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
                                        university: "New University",
                                        period: "20XX-20XX",
                                        details: "Course details"
                                    })
                                }
                                style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "0px" }}
                            >
                                + Add Education
                            </span>
                        )}
                    </div>

                    {/* Right Column - Skills */}
                    <div style={{ width: "50%", paddingLeft: "20px" }}>
                        <h3>SKILLS</h3>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {resumeData.skills.map((s, i) => (
                                <div
                                    key={i}
                                    style={{ width: "50%", marginBottom: "6px", display: "flex", alignItems: "center" }}
                                >
                                    <span style={{ marginRight: "6px" }}>•</span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => {
                                            const updated = [...resumeData.skills];
                                            updated[i] = e.target.innerText;
                                            setResumeData({ ...resumeData, skills: updated });
                                        }}
                                    >
                                        {s}
                                    </span>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("education", i)}
                                            style={{
                                                color: "red",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                marginLeft: "0px"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isEditing && (
                            <span
                                onClick={() => addItem("skills", "New Skill")}
                                style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "00px" }}
                            >
                                + Add Skill
                            </span>
                        )}
                    </div>
                </div>

                {/* Experience */}
                <div style={{ padding: "0px", marginLeft: "30px", marginRight: "30px" }}>
                    <h3>WORK EXPERIENCE</h3>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ display: "flex", marginBottom: "12px" }}>
                            {/* Left - Period */}
                            <div
                                style={{ width: "40%", fontWeight: "bold" }}
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                            >
                                {exp.period}
                            </div>

                            {/* Right - Details */}
                            <div style={{ width: "60%", marginRight: "30px" }}>
                                <p style={{ margin: "0 0 5px 0", display: "flex", alignItems: "center" }}>
                                    <span style={{ marginRight: "6px" }}>•</span>
                                    <span
                                        style={{ fontWeight: "bold" }}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                    >
                                        {exp.company}
                                    </span>{" "}
                                    <span
                                        style={{ fontStyle: "italic", marginLeft: "6px" }}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                    >
                                        {exp.role}
                                    </span>
                                </p>
                                <p
                                    style={{ margin: "0 0 5px 15px" }}
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "overview", e)}
                                >
                                    {exp.overview}
                                </p>
                                <ul style={{ margin: 0, paddingLeft: "40px" }}>
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
                                    <span
                                        onClick={() => removeItem("education", i)}
                                        style={{
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "13px",
                                            marginLeft: "30px"
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
                                    company: "New Company",
                                    role: "Job Title",
                                    period: "20XX-20XX",
                                    overview: "Overview text...",
                                    details: ["Responsibility 1", "Responsibility 2"]
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "0px" }}
                        >
                            + Add Experience
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate24;
