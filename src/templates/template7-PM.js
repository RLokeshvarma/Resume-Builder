import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate7 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "JACOB HANCOCK",
        location: "Nashville, TN",
        phone: "615.555.0105",
        email: "jacob@example.com",

        objectiveHeading: "OBJECTIVE",
        objectiveContent: "To lead the development of a revolutionary artificial intelligence platform that will disrupt the financial industry and enhance customer experiences by collaborating with cross-functional teams and delivering on time, within budget, and with the highest quality standards.",

        educationHeading: "EDUCATION",
        education: [
            {
                degree: "MBA",
                university: "Jasper University",
                period: "20XX - 20XX",
                details: "Participated in a number of research projects that resulted in a recommendation to pivot their business model after I was retained and led to increased revenues."
            },
            {
                degree: "B.S. Computer Science",
                university: "Belmont College",
                period: "20XX - 20XX",
                details: "Courses included Data Structures, Algorithms, Computer Architecture, Operating Systems, and Software Engineering."
            }
        ],

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "Technical Project Manager",
                company: "Reliecloud",
                period: "20XX - 20XX",
                details: "Oversaw project scope, timelines, and budget, resulting in the successful launch of the new infrastructure and improved time-to-market metrics."
            },
            {
                role: "Project Manager",
                company: "Prosaware, Inc.",
                period: "20XX - 20XX",
                details: "Managed a team of software developers and quality assurance specialists in the development and launch of a new customer relationship management (CRM) software product."
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            { category: "Project management", items: [] },
            { category: "Technical expertise", items: [] },
            { category: "Leadership", items: [] },
            { category: "Communication", items: [] },
            { category: "Problem-solving", items: [] },
            { category: "Attention to detail", items: [] }
        ],

        activitiesHeading: "ACTIVITIES",
        activitiesContent: "Participated in various hackathons, including a winning team at the 20XX Hack event, demonstrating the ability to work under pressure and come up with innovative solutions to technical challenges."
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

    const handleSkillChange = (index, e) => {
        const updated = [...resumeData.skills];
        updated[index] = { ...updated[index], category: e.target.innerText };
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
                fontFamily: "Gill Sans MT, sans-serif",
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

                {/* Section 1: Name and Contact */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "30px",
                    borderBottom: "4px solid #dc2626",
                    marginBottom: "25px",
                    marginTop: "80px",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <h1
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("fullName", e)}
                        style={{
                            fontSize: "40px",
                            fontWeight: "normal",
                            color: "#b10f0fff",
                            margin: 0
                        }}
                    >
                        {resumeData.fullName}
                    </h1>
                    <div style={{ textAlign: "right", fontSize: "14px", color: "#b10f0fff" }}>
                        <div>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("location", e)}
                            >
                                {resumeData.location}
                            </span>
                        </div>
                        <div>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("phone", e)}
                            >
                                {resumeData.phone}
                            </span>
                            {" | "}
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("email", e)}
                            >
                                {resumeData.email}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Objective */}
                <div style={{
                    marginBottom: "25px",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("objectiveHeading", e)}
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#b10f0fff",
                            margin: "0 0 10px 0"
                        }}
                    >
                        {resumeData.objectiveHeading}
                    </h3>
                    <div style={{
                        borderBottom: "4px solid #dc2626",
                        paddingBottom: "15px",
                        marginBottom: "25px"
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("objectiveContent", e)}
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                color: "black",
                                margin: 0
                            }}
                        >
                            {resumeData.objectiveContent}
                        </p>
                    </div>
                </div>

                {/* Section 3: Education */}
                <div style={{
                    marginBottom: "25px",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("educationHeading", e)}
                        style={{
                            fontSize: "20px",
                            fontWeight: "medium",
                            color: "#b10f0fff",
                            margin: "0 0 15px 0"
                        }}
                    >
                        {resumeData.educationHeading}
                    </h3>
                    <div style={{
                        borderBottom: "4px solid #dc2626",
                        paddingBottom: "15px",
                        marginBottom: "25px"
                    }}>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "15px" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    marginBottom: "5px"
                                }}>
                                    <div>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "black"
                                            }}
                                        >
                                            {edu.degree}
                                        </span>
                                        {" | "}
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("education", i, "university", e)}
                                            style={{
                                                fontSize: "14px",
                                                color: "black"
                                            }}
                                        >
                                            {edu.university}
                                        </span>
                                    </div>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}
                                    >
                                        {edu.period}
                                    </span>
                                </div>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                    style={{
                                        fontSize: "14px",
                                        lineHeight: "1.4",
                                        color: "black",
                                        margin: 0
                                    }}
                                >
                                    {edu.details}
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
                                        degree: "Degree Name",
                                        university: "University Name",
                                        period: "20XX - 20XX",
                                        details: "Course details and achievements..."
                                    })
                                }
                                style={{
                                    color: "#dc2626",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Education
                            </span>
                        )}
                    </div>
                </div>

                {/* Section 4: Experience */}
                <div style={{
                    marginBottom: "25px",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("experienceHeading", e)}
                        style={{
                            fontSize: "20px",
                            fontWeight: "medium",
                            color: "#b10f0fff",
                            margin: "0 0 15px 0"
                        }}
                    >
                        {resumeData.experienceHeading}
                    </h3>
                    <div style={{
                        borderBottom: "4px solid #dc2626",
                        paddingBottom: "15px",
                        marginBottom: "25px"
                    }}>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "15px" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    marginBottom: "5px"
                                }}>
                                    <div>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "black"
                                            }}
                                        >
                                            {exp.role}
                                        </span>
                                        {" | "}
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                            style={{
                                                fontSize: "14px",
                                                color: "black"
                                            }}
                                        >
                                            {exp.company}
                                        </span>
                                    </div>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black"
                                        }}
                                    >
                                        {exp.period}
                                    </span>
                                </div>
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
                                        role: "Job Title",
                                        company: "Company Name",
                                        period: "20XX - 20XX",
                                        details: "Description of role and achievements..."
                                    })
                                }
                                style={{
                                    color: "#dc2626",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Experience
                            </span>
                        )}
                    </div>
                </div>

                {/* Section 5: Skills */}
                <div style={{
                    marginBottom: "25px",
                    marginLeft: "50px",
                    marginRight: "50px"
                }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("skillsHeading", e)}
                        style={{
                            fontSize: "20px",
                            fontWeight: "medium",
                            color: "#b10f0fff",
                            margin: "0 0 15px 0"
                        }}
                    >
                        {resumeData.skillsHeading}
                    </h3>
                    <div style={{
                        borderBottom: "4px solid #dc2626",
                        paddingBottom: "15px",
                        marginBottom: "25px"
                    }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "10px 20px"
                        }}>
                            {resumeData.skills.map((skill, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                    <span style={{
                                        width: "6px",
                                        height: "6px",
                                        backgroundColor: "#dc2626",
                                        borderRadius: "50%",
                                        marginRight: "8px",
                                        display: "inline-block"
                                    }}></span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleSkillChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black"
                                        }}
                                    >
                                        {skill.category}
                                    </span>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("skills", i)}
                                            style={{
                                                marginLeft: "8px",
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer"
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
                                onClick={() =>
                                    addItem("skills", {
                                        category: "New Skill",
                                        items: []
                                    })
                                }
                                style={{
                                    color: "#dc2626",
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
                </div>

                {/* Section 6: Activities */}
                <div>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("activitiesHeading", e)}
                        style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            color: "#b10f0fff",
                            margin: "0 0 15px 0",
                            marginLeft: "50px",
                            marginRight: "50px"
                        }}
                    >
                        {resumeData.activitiesHeading}
                    </h3>
                    <div>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("activitiesContent", e)}
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                color: "black",
                                margin: 0,
                                marginLeft: "50px",
                                marginRight: "50px",
                                marginBottom: "20px"
                            }}
                        >
                            {resumeData.activitiesContent}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate7;