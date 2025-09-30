import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate21 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        firstName: "CHANCHAL",
        lastName: "SHARMA",

        roleHeading: "OFFICE MANAGER",
        roleSummary: "State your career goals and show how they align with the job description you're targeting. Be brief and keep it from sounding generic. Be yourself.",

        contactHeading: "CONTACT INFO",
        contact: [
            "(718) 555-0102",
            "chanchal@example.com",
            "www.intersertingsite.com",
            "Albany, NY"
        ],

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "OFFICE MANAGER",
                company: "The Phone Company",
                period: "Jan 20XX - Current",
                details: "Summarize your key responsibilities and accomplishments. Where appropriate, use the language and words you find in the specific job description. Be concise, targeting 3-5 key areas."
            },
            {
                role: "OFFICE MANAGER",
                company: "NvD Publishing",
                period: "Mar 20XX - Dec 20XX",
                details: "Summarize your key responsibilities and accomplishments. Here again, take any opportunity to use words you find in the job description. Be brief."
            },
            {
                role: "OFFICE MANAGER",
                company: "Southridge Video",
                period: "Aug 20XX - March 20XX",
                details: "Summarize your key responsibilities and accomplishments. Where appropriate, use the language and words you find in the job description. Be concise, targeting 3-5 key areas."
            }
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                course: "A.S. H.R. MANAGEMENT",
                college: "Belmont College",
                period: "Sep 20XX - May 20XX"
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            "Data analysis",
            "Project management",
            "Communication",
            "Organization",
            "Problem solving"
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

    const handleContactChange = (index, e) => {
        const updated = [...resumeData.contact];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, contact: updated });
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
        <div
            style={{
                fontFamily: "Cambria, sans-serif",
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

                {/* Vertical Lines */}
                <div style={{
                    position: "absolute",
                    left: "80px",
                    top: "0",
                    bottom: "0",
                    width: "2px",
                    backgroundColor: "#4A9FB5"
                }}></div>
                <div style={{
                    position: "absolute",
                    right: "80px",
                    top: "0",
                    bottom: "0",
                    width: "2px",
                    backgroundColor: "#4A9FB5"
                }}></div>

                {/* Content Area with margins */}
                <div style={{ margin: "0 120px" }}>
                    {/* Name */}
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("firstName", e)}
                        style={{ margin: 0, fontSize: "60px", fontWeight: "bold", color: "#4A9FB5", }}
                    >
                        {resumeData.firstName}
                    </p>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("lastName", e)}
                        style={{ margin: 0, fontSize: "60px", fontWeight: "bold", marginBottom: "30px", color: "#4A9FB5", }}
                    >
                        {resumeData.lastName}
                    </p>

                    {/* Two Columns - Role & Contact Info */}
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                        {/* Left Column - Role */}
                        <div style={{ width: "30%", paddingRight: "30px", marginLeft: "50px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("roleHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4A9FB5",
                                    margin: "0 0 10px 0",
                                    textTransform: "uppercase"
                                }}
                            >
                                {resumeData.roleHeading}
                            </h3>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("roleSummary", e)}
                                style={{
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                    color: "black",
                                    margin: 0
                                }}
                            >
                                {resumeData.roleSummary}
                            </p>
                        </div>

                        {/* Right Column - Contact Info */}
                        <div style={{ width: "50%", paddingLeft: "30px", marginRight: "200px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("contactHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4A9FB5",
                                    margin: "0 0 10px 0",
                                    textTransform: "uppercase"
                                }}
                            >
                                {resumeData.contactHeading}
                            </h3>
                            {resumeData.contact.map((contact, i) => (
                                <div key={i} style={{ marginBottom: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleContactChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0,
                                            flex: 1
                                        }}
                                    >
                                        {contact}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("contact", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginLeft: "10px"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("contact", "New Contact")}
                                    style={{
                                        color: "#4A9FB5",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        display: "block",
                                        marginTop: "5px"
                                    }}
                                >
                                    + Add Contact
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Experience - Full Width */}
                    <div style={{ marginBottom: "30px", marginLeft: "50px", marginRight: "200px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#4A9FB5",
                                margin: "0 0 20px 0",
                                textTransform: "uppercase"
                            }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "20px" }}>
                                <p style={{
                                    fontSize: "14px",
                                    color: "black",
                                    margin: "0 0 3px 0"
                                }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {exp.role}
                                    </span>
                                    <span>, </span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                    >
                                        {exp.company}
                                    </span>
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 10px 0"
                                    }}
                                >
                                    {exp.period}
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        color: "black",
                                        margin: 0
                                    }}
                                >
                                    {exp.details}
                                </p>
                                {isEditing && (
                                    <div style={{ marginTop: 6 }}>
                                        <span
                                            onClick={() => removeItem("experience", i)}
                                            style={{
                                                color: "red",
                                                fontSize: "14px",
                                                cursor: "pointer"
                                            }}
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
                                        role: "JOB TITLE",
                                        company: "Company Name",
                                        period: "Month 20XX - Month 20XX",
                                        details: "Job description and achievements..."
                                    })
                                }
                                style={{
                                    color: "#4A9FB5",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Experience
                            </span>
                        )}
                    </div>

                    {/* Two Columns - Education & Skills */}
                    <div style={{ display: "flex" }}>
                        {/* Left Column - Education */}
                        <div style={{ width: "30%", paddingRight: "30px", marginLeft: "50px"}}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("educationHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4A9FB5",
                                    margin: "0 0 15px 0",
                                    textTransform: "uppercase"
                                }}
                            >
                                {resumeData.educationHeading}
                            </h3>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "15px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 3px 0"
                                        }}
                                    >
                                        {edu.course}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: "0 0 3px 0"
                                        }}
                                    >
                                        {edu.college}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0
                                        }}
                                    >
                                        {edu.period}
                                    </p>
                                    {isEditing && (
                                        <div style={{ marginTop: 6 }}>
                                            <span
                                                onClick={() => removeItem("education", i)}
                                                style={{
                                                    color: "red",
                                                    fontSize: "14px",
                                                    cursor: "pointer"
                                                }}
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
                                            course: "DEGREE NAME",
                                            college: "College Name",
                                            period: "Month 20XX - Month 20XX"
                                        })
                                    }
                                    style={{
                                        color: "#4A9FB5",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Education
                                </span>
                            )}
                        </div>

                        {/* Right Column - Skills */}
                        <div style={{ width: "50%", paddingLeft: "30px", marginRight: "200px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("skillsHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "#4A9FB5",
                                    margin: "0 0 15px 0",
                                    textTransform: "uppercase"
                                }}
                            >
                                {resumeData.skillsHeading}
                            </h3>
                            <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                {resumeData.skills.map((skill, i) => (
                                    <li key={i} style={{ marginBottom: "5px" }}>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleSkillChange(i, e)}
                                            style={{
                                                fontSize: "14px",
                                                color: "black"
                                            }}
                                        >
                                            {skill}
                                        </span>
                                        {isEditing && (
                                            <span
                                                onClick={() => removeItem("skills", i)}
                                                style={{
                                                    marginLeft: "14px",
                                                    fontSize: "14px",
                                                    color: "red",
                                                    cursor: "pointer"
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
                                    onClick={() => addItem("skills", "New Skill")}
                                    style={{
                                        color: "#4A9FB5",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        display: "block",
                                        marginTop: "14px"
                                    }}
                                >
                                    + Add Skill
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate21;