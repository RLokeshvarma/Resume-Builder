import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate12 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        initials: "JM",
        fullName: "Jordan Mitchell",
        summary:
            "Experienced woodworker with 5+ years of expertise in designing and creating custom furniture and cabinetry. Proficient in a wide variety of woodworking tools and techniques, with a focus on precision and attention to detail.",

        contact: {
            location: { contentHeading: "Contact", value: "Boston, MA" },
            phone: { contentHeading: "Phone", value: "020 555 0122" },
            email: { contentHeading: "Email", value: "jordan@example.com" },
            website: { contentHeading: "Website", value: "www.created4wood.com" },
        },

        experienceHeading: "Experience",
        experience: [
            {
                period: "20XX – present",
                role: "Woodworker",
                company: "Sand + Polish Contractors",
                location: "Boston, MA",
                details: [
                    "Collaborated with clients to design and build custom furniture pieces, including chairs, tables, and cabinets.",
                    "Operated various woodworking tools and machinery to cut, shape, and assemble wood pieces.",
                    "Maintained safe and organized work environment.",
                    "Demonstrated strong attention to detail and precision in all aspects of woodworking.",
                ],
            },
            {
                period: "20XX – 20XX",
                role: "Woodworker",
                company: "Demo and Build Construction, LLC",
                location: "Boston, MA",
                details: [
                    "Assisted senior woodworkers in building and installing custom cabinets and furniture.",
                    "Operated woodworking tools and machinery under supervision.",
                    "Maintained an organized and clean work environment.",
                    "Gained knowledge of different types of wood and their characteristics.",
                ],
            },
        ],

        educationHeading: "Education",
        education: [
            {
                college: "Clover College of the Arts",
                location: "Boston, MA",
                period: "June 20XX",
                details: ["Certification in Woodworking"],
            },
            {
                college: "Clover College of the Arts",
                location: "Boston, MA",
                period: "June 20XX",
                details: ["Associates of Applied Science in Wood Technology"],
            },
        ],

        skillsHeading: "Key skills and characteristics",
        skills: [
            "Proficient in use of hand and power tools such as saws, drills, sanders.",
            "Skilled in reading and interpreting blueprints and schematics.",
            "Strong attention to detail and commitment to producing high-quality work.",
            "Excellent problem-solving skills and ability to think creatively.",
            "Strong stamina to stand for long periods and endurance for physical work.",
        ],
    });

    const resumeRef = useRef();

    // ===== HANDLERS =====
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
                fontFamily: "Gill Sans MT, sans-serif",
                padding: "20px",
                backgroundColor: "#f0f0f0",
            }}
        >
            <div
                ref={resumeRef}
                style={{
                    display: "flex",
                    width: "100%",
                    margin: "0 auto",
                    background: "#fff",
                    border: "1px solid #ccc",
                    position: "relative"
                }}
            >
                {/* ===== Left Column ===== */}
                <div
                    style={{
                        width: "20%",
                        backgroundColor: "rgb(209 65 64)", // orange/red
                        color: "white",
                        padding: "0px",
                        boxSizing: "border-box",
                        textAlign: "center",
                    }}
                >
                    {/* Initials box */}
                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                            margin: "0 auto 40px",
                            marginLeft: "70px",
                            background: "white",
                            color: "rgb(209 65 64)",
                            paddingTop: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "50px",
                            fontWeight: "bold",
                            fontFamily: "Georgia, sans-serif",
                            marginBottom: "115px"
                        }}
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("initials", e)}
                    >
                        {resumeData.initials}
                    </div>


                    {/* Contact details */}
                    {Object.entries(resumeData.contact).map(([key, item], i, arr) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) =>
                                    setResumeData({
                                        ...resumeData,
                                        contact: {
                                            ...resumeData.contact,
                                            [key]: { ...item, contentHeading: e.target.innerText },
                                        },
                                    })
                                }
                                style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px", fontFamily: "Georgia, sans-serrif", textAlign: "left", marginLeft: "70px" }}
                            >
                                {item.contentHeading}
                            </p>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) =>
                                    setResumeData({
                                        ...resumeData,
                                        contact: {
                                            ...resumeData.contact,
                                            [key]: { ...item, value: e.target.innerText },
                                        },
                                    })
                                }
                                style={{ fontSize: "16px", textAlign: "left", marginLeft: "70px", marginBottom: "20px" }}
                            >
                                {item.value}
                            </p>
                            {i < arr.length - 1 && (
                                <hr style={{ border: "none", height: "1px", backgroundColor: "#fff", marginLeft: "60px", marginRight: "70px" }} />
                            )}
                        </div>
                    ))}

                </div>

                {/* ===== Right Column ===== */}
                <div style={{ width: "70%", padding: "30px" }}>
                    {/* Buttons */}
                    <button
                        className="no-print"
                        onClick={() => setIsEditing(!isEditing)}
                        style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            padding: "8px 16px",
                            backgroundColor: "#01040aff",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
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
                            padding: "8px 16px",
                            backgroundColor: "#03050aff",
                            color: "white",
                            border: "none",
                            borderRadius: "20px",
                            cursor: "pointer",
                        }}
                    >
                        Download
                    </button>

                    {/* Name */}
                    <h1
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("fullName", e)}
                        style={{ fontSize: "50px", marginBottom: "20px", marginTop: "30px", fontFamily: "Georgia, sans-serif", }}
                    >
                        {resumeData.fullName}
                    </h1>

                    {/* Summary */}
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("summary", e)}
                        style={{ fontSize: "16px", lineHeight: "1.2", marginBottom: "50px" }}
                    >
                        {resumeData.summary}
                    </p>

                    {/* Experience */}
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)} style={{ fontSize: "20px", fontWeight: "bold", marginRight: "20px", fontFamily: "Georgia, sans-serif" }}>
                            {resumeData.experienceHeading}
                        </h3>
                        <hr style={{ flex: 1, border: "none", borderTop: "3px solid black" }} />
                    </div>

                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                                {exp.period}
                            </p>
                            <p style={{ fontSize: "16px", margin: "2px 0" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                >
                                    {exp.role}
                                </span>
                                <span style={{ color: "rgb(209 65 64)", margin: "0 6px" }}>|</span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                >
                                    {exp.company}
                                </span>
                                <span style={{ color: "rgb(209 65 64)", margin: "0 6px" }}>|</span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "location", e)}
                                >
                                    {exp.location}
                                </span>
                            </p>
                            <ul style={{ paddingLeft: "20px" }}>
                                {exp.details.map((d, j) => (
                                    <li
                                        key={j}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) =>
                                            handleListChange("experience", i, "details", j, e)
                                        }
                                        style={{ fontSize: "16px", marginBottom: "5px", marginLeft: "30px" }}
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("experience", i)}
                                    style={{ color: "red", cursor: "pointer", fontSize: "16px" }}
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
                                    role: "Role",
                                    company: "Company",
                                    location: "Location",
                                    details: ["Achievement or responsibility..."],
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "16px" }}
                        >
                            + Add Experience
                        </span>
                    )}

                    {/* Education */}
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)} style={{ fontSize: "20px", fontWeight: "bold", marginRight: "20px", fontFamily: "Georgia, sans-serif" }}>
                            {resumeData.educationHeading}
                        </h3>
                        <hr style={{ flex: 1, border: "none", borderTop: "3px solid black" }} />
                    </div>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                >
                                    {edu.college}
                                </span>
                                <span style={{ color: "rgb(209 65 64)", margin: "0 6px" }}>|</span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "location", e)}
                                >
                                    {edu.location}
                                </span>
                            </p>
                            <p style={{ fontSize: "14px", display: "flex", flexWrap: "wrap", alignItems: "center", marginLeft: "30px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                    style={{ marginRight: "6px", fontWeight: "bold" }}
                                >
                                    {edu.period}
                                </span>

                                {edu.details.map((d, j) => (
                                    <span key={j} style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ color: "rgb(209 65 64)", margin: "0 6px" }}>|</span>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleListChange("education", i, "details", j, e)}
                                            style={{ fontSize: "16px" }}
                                        >
                                            {d}
                                        </span>
                                    </span>
                                ))}
                            </p>

                            {isEditing && (
                                <span
                                    onClick={() => removeItem("education", i)}
                                    style={{ color: "red", cursor: "pointer", fontSize: "16px" }}
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
                                    college: "College Name",
                                    location: "Location",
                                    period: "20XX",
                                    details: ["Detail about education..."],
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "16px" }}
                        >
                            + Add Education
                        </span>
                    )}

                    {/* Skills */}
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)} style={{ fontSize: "20px", fontWeight: "bold", marginRight: "20px", fontFamily: "Georgia, sans-serif" }}>
                            {resumeData.skillsHeading}
                        </h3>
                        <hr style={{ flex: 1, border: "none", borderTop: "3px solid black" }} />
                    </div>
                    <ul style={{ paddingLeft: "20px" }}>
                        {resumeData.skills.map((skill, i) => (
                            <li
                                key={i}
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleSkillChange(i, e)}
                                style={{ fontSize: "16px", marginBottom: "5px", marginLeft: "30px" }}
                            >
                                {skill}
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{ marginLeft: "8px", fontSize: "16px", color: "red", cursor: "pointer" }}
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
                            style={{ color: "blue", cursor: "pointer", fontSize: "16px" }}
                        >
                            + Add Skill
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate12;
