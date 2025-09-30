import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate18 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        role: "Office Manager",
        firstName: "Chanchal",
        lastName: "Sharma",

        objectiveHeading: "Objective",
        objectiveContent: "State your career goals and show how they align with the job description you're targeting. Be brief and keep it from sounding generic. Be yourself.",

        experienceHeading: "Experience",
        experience: [
            {
                period: "January 20XX - Current",
                role: "Office Manager",
                company: "The Phone Company",
                details: "Summarize your key responsibilities and accomplishments. Where appropriate, use the language and words you find in the specific job description. Be concise, targeting 3-5 key areas."
            },
            {
                period: "March 20XX - December 20XX",
                role: "Office Manager",
                company: "NvD Publishing",
                details: "Summarize your key responsibilities and accomplishments. Here again, take any opportunity to use words you find in the job description. Be brief."
            },
            {
                period: "August 20XX - March 20XX",
                role: "Office Manager",
                company: "Southridge Video",
                details: "Summarize your key responsibilities and accomplishments. Where appropriate, use the language and words you find in the job description. Be concise, targeting 3-5 key areas."
            }
        ],

        educationHeading: "Education",
        education: [
            {
                period: "Sept 20XX - May 20XX",
                course: "A. S. H.R. Management",
                college: "Gloriaton College"
            }
        ],

        skillsHeading: "Skills",
        skills: [
            "Data analysis",
            "Project management",
            "Communication",
            "Organization",
            "Problem solving"
        ],

        interestsHeading: "Interests",
        interestsContent: "The decision to sectional that can encompass the unique, professional, and personal facets of the candidate.",

        contactHeading: "Contact",
        contact: [
            "1407 Main Street",
            "City, State 98012",
            "555.123.4567",
            "chanchal@example.com"
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
                fontFamily: "Univers, sans-serif",
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
                    minHeight: "800px"
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

                {/* Section 1: Header */}
                <div style={{ marginBottom: "25px", marginLeft: "50px", marginTop: "70px", marginRight: "50px" }}>
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                        {/* Left Column - Role & Name */}
                        <div style={{ width: "40%" }}>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("role", e)}
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    fontWeight: "bold",
                                    margin: "0 0 10px 0"
                                }}
                            >
                                {resumeData.role}
                            </p>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("firstName", e)}
                                style={{ margin: 0, fontSize: "60px", fontWeight: "bold" }}
                            >
                                {resumeData.firstName}
                            </p>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("lastName", e)}
                                style={{ margin: 0, fontSize: "60px", fontWeight: "bold", marginBottom: "50px" }}
                            >
                                {resumeData.lastName}
                            </p>
                        </div>

                        {/* Right Column - Objective */}
                        <div style={{ width: "60%" }}>
                            {/* Black horizontal line */}
                            <div style={{
                                height: "6px",
                                backgroundColor: "black",
                                marginBottom: "15px"
                            }}></div>

                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("objectiveHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 25px 0",
                                    marginLeft: "100px"
                                }}
                            >
                                {resumeData.objectiveHeading}
                            </h3>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("objectiveContent", e)}
                                style={{
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                    color: "black",
                                    margin: 0,
                                    marginLeft: "100px"
                                }}
                            >
                                {resumeData.objectiveContent}
                            </p>
                        </div>
                    </div>

                    {/* Full width horizontal line */}
                    <div style={{
                        height: "6px",
                        backgroundColor: "black",
                        width: "100%"
                    }}></div>
                </div>

                {/* Section 2: Experience */}
                <div style={{ display: "flex", marginBottom: "30px", marginLeft: "50px", marginRight: "50px" }}>
                    {/* Left Column - Experience Heading */}
                    <div style={{ width: "20%" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: 0
                            }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                    </div>

                    {/* Right Column - Experience Content */}
                    <div style={{ width: "80%", marginBottom: "50px" }}>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "20px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 3px 0",
                                    }}
                                >
                                    {exp.period}
                                </p>
                                <p style={{
                                    fontSize: "14px",
                                    color: "black",
                                    margin: "0 0 5px 0"
                                }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {exp.role}
                                    </span>
                                    {" "}
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                        style={{ fontStyle: "italic" }}
                                    >
                                        {exp.company}
                                    </span>
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
                                        period: "Month 20XX - Month 20XX",
                                        role: "Job Title",
                                        company: "Company Name",
                                        details: "Job description and achievements..."
                                    })
                                }
                                style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Experience
                            </span>
                        )}
                    </div>
                </div>

                {/* Section 3: Bottom Four Columns */}
                <div style={{ display: "flex", marginLeft: "50px", marginRight: "50px" }}>
                    {/* Column 1 - Education */}
                    <div style={{ width: "25%", paddingRight: "15px" }}>
                        <div style={{
                            height: "6px",
                            backgroundColor: "black",
                            marginBottom: "15px"
                        }}></div>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.educationHeading}
                        </h3>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "15px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 3px 0",
                                    }}
                                >
                                    {edu.period}
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 3px 0",
                                        fontWeight: "bold"
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
                                        margin: 0
                                    }}
                                >
                                    {edu.college}
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
                                        period: "Month 20XX - Month 20XX",
                                        course: "Course Name",
                                        college: "College Name"
                                    })
                                }
                                style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Education
                            </span>
                        )}
                    </div>

                    {/* Column 2 - Skills */}
                    <div style={{ width: "25%", paddingRight: "15px" }}>
                        <div style={{
                            height: "6px",
                            backgroundColor: "black",
                            marginBottom: "15px"
                        }}></div>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.skillsHeading}
                        </h3>
                        <ul style={{ paddingLeft: "15px", margin: 0 }}>
                            {resumeData.skills.map((skill, i) => (
                                <li key={i} style={{ marginBottom: "3px" }}>
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
                                                marginLeft: "10px",
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
                                    color: "blue",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    display: "block",
                                    marginTop: "10px"
                                }}
                            >
                                + Add Skill
                            </span>
                        )}
                    </div>

                    {/* Column 3 - Interests */}
                    <div style={{ width: "25%", paddingRight: "15px" }}>
                        <div style={{
                            height: "6px",
                            backgroundColor: "black",
                            marginBottom: "15px"
                        }}></div>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("interestsHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.interestsHeading}
                        </h3>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("interestsContent", e)}
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                color: "black",
                                margin: 0
                            }}
                        >
                            {resumeData.interestsContent}
                        </p>
                    </div>

                    {/* Column 4 - Contact */}
                    <div style={{ width: "25%" }}>
                        <div style={{
                            height: "6px",
                            backgroundColor: "black",
                            marginBottom: "15px"
                        }}></div>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
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
                                            marginLeft: "5px"
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
                                    color: "blue",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    display: "block",
                                    marginTop: "10px"
                                }}
                            >
                                + Add Contact
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate18;