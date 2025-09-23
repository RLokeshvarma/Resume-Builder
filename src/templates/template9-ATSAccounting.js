import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate9 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "DONNA ROBBINS",
        address: "4567 Main Street, Detroit, MI 48127",
        phone: "(313) 555-0100",
        email: "donna@example.com",
        website: "www.greataddress.com",

        summary:
            "Analytical, organized and detail-oriented accountant with GAAP expertise and experience in the full spectrum of public accounting. Collaborative team player with ownership mentality and a track record of delivering the highest-quality strategic solutions to resolve challenges and propel business growth.",

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                period: "20XX – Present",
                role: "Accountant",
                company: "Trey Research",
                location: "San Francisco, CA",
                details: [
                    "Working in a mid-sized public accounting firm to provide professional accounting services for individuals and business clients.",
                    "Provide full range of services, include income tax preparation, audit support, preparation of financial statements, pro forma budgeting, general ledger accounting, and bank reconciliation."
                ]
            },
            {
                period: "20XX – 20XX",
                role: "Bookkeeper",
                company: "Bander Real Estate",
                location: "Berkeley, CA",
                details: [
                    "Inhouse bookkeeper for a real estate development company.",
                    "Maintained financial books, tracked expenses, prepared, and submitted invoices, and oversaw payroll."
                ]
            },
            {
                period: "December 20XX – April 20XX",
                role: "Accounting Intern",
                company: "Olson Harris Ltd.",
                location: "Vallejo, CA",
                details: [
                    "Assisted with payroll and pensions service management for 150+ employees.",
                    "Prepared invoices for more than 200 clients.",
                    "Assisted with bill payments, records organization and preparation, and other office duties to support financial and accounting operations."
                ]
            }
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                period: "June 20XX",
                degree: "Bachelor of Science in Accounting, Minor in Business Administration",
                college: "Bellows College",
                details: [
                    "Distinguished member of university’s Accounting Society",
                    "Relevant coursework: Advanced Financial Accounting and Reporting",
                    "GPA: 3.8"
                ]
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            "Microsoft NAV Dynamics",
            "Bookkeeping",
            "CashFlow Management",
            "Exceptional communication",
            "State & Federal Tax Compliance",
            "Fluent in German"
        ]
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
            [field]: resumeData[field].filter((_, i) => i !== index)
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
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f0f0", padding: "20px" }}>
            <div
                ref={resumeRef}
                style={{
                    display: "flex",
                    border: "1px solid #ccc",
                    width: "100%",
                    background: "#fff",
                    position: "relative"
                }}
            >
                {/* Orange Sidebar */}
                <div style={{ backgroundColor: "rgb(241 85 51)", width: "5%" }}></div>

                {/* Content Area */}
                <div style={{ width: "90%", padding: "40px" }}>
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
                            backgroundColor: "#01040aff",
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
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: "15px"
                        }}
                    >
                        {resumeData.fullName}
                    </h1>

                    {/* Contact */}
                    <p style={{ fontSize: "14px", marginBottom: "25px", fontWeight: "bold" }}>
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("address", e)}
                        >
                            {resumeData.address}
                        </span>{" "}
                        |{" "}
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("phone", e)}
                        >
                            {resumeData.phone}
                        </span>{" "}
                        |{" "}
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("email", e)}
                        >
                            {resumeData.email}
                        </span>{" "}
                        |{" "}
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("website", e)}
                        >
                            {resumeData.website}
                        </span>
                    </p>

                    {/* Summary */}
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("summary", e)}
                        style={{ fontSize: "14px", marginBottom: "30px", lineHeight: "1.5" }}
                    >
                        {resumeData.summary}
                    </p>

                    {/* Experience */}
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                        >
                            {resumeData.experienceHeading}
                        </span>
                    </h3>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "30px" }}>
                            {/* Period in one line */}
                            <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                >
                                    {exp.period}
                                </span>
                            </p>

                            {/* Role, Company, Location in next line */}
                            <p style={{ fontSize: "16px", fontWeight: "normal", marginBottom: "15px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                >
                                    {exp.role}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                >
                                    {exp.company}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "location", e)}
                                >
                                    {exp.location}
                                </span>
                            </p>

                            {/* Details */}
                            <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                {exp.details.map((d, j) => (
                                    <li
                                        key={j}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleListChange("experience", i, "details", j, e)}
                                        style={{ fontSize: "14px", marginBottom: "5px" }}
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("experience", i)}
                                    style={{ color: "red", cursor: "pointer", fontSize: "14px" }}
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
                                    period: "20XX – 20XX",
                                    role: "Job Title",
                                    company: "Company",
                                    location: "Location",
                                    details: ["Achievement or responsibility..."]
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
                        >
                            + Add Experience
                        </span>
                    )}

                    {/* Education */}
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                        >
                            {resumeData.educationHeading}
                        </span>
                    </h3>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "30px" }}>
                            {/* Period in one line */}
                            <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "0px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                >
                                    {edu.period}
                                </span>
                            </p>

                            {/* Degree + College in next line */}
                            <p style={{ fontSize: "16px", fontWeight: "", marginBottom: "15px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                                >
                                    {edu.degree}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                >
                                    {edu.college}
                                </span>
                            </p>

                            {/* Details */}
                            <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                {edu.details.map((d, j) => (
                                    <li
                                        key={j}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleListChange("education", i, "details", j, e)}
                                        style={{ fontSize: "14px", marginBottom: "5px" }}
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("education", i)}
                                    style={{ color: "red", cursor: "pointer", fontSize: "14px" }}
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
                                    period: "20XX",
                                    degree: "Degree",
                                    college: "College",
                                    details: ["Detail about education..."]
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
                        >
                            + Add Education
                        </span>
                    )}

                    {/* Skills */}
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
                        <span
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                        >
                            {resumeData.skillsHeading}
                        </span>
                    </h3>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "6px",
                            marginBottom: "30px"
                        }}
                    >
                        {resumeData.skills.map((skill, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                <span
                                    style={{
                                        width: "5px",
                                        height: "5px",
                                        backgroundColor: "black",
                                        borderRadius: "50%",
                                        marginRight: "8px",
                                        display: "inline-block"
                                    }}
                                ></span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleSkillChange(i, e)}
                                    style={{ fontSize: "14px" }}
                                >
                                    {skill}
                                </span>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{ marginLeft: "8px", fontSize: "14px", color: "red", cursor: "pointer" }}
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
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
                        >
                            + Add Skill
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate9;
