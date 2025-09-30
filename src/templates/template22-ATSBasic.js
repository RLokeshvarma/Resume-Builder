import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "CALEB FOSTER",
        street: "456 East 78th Ave",
        city: "Denver, CO 87654",
        phone: "303.555.0113",
        email: "caleb@example.com",

        objectiveHeading: "OBJECTIVE",
        objectiveContent: "Check out the few quick tips below to help you get started. Try replace any tip text with your own, just select it and start typing.",

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "Chief Human Resources Officer",
                company: "Olson Marin Ltd",
                location: "Seattle, WA",
                period: "Feb 20XX – Jan 20XX",
                details: "This is the place for a brief summary of your key responsibilities and most stellar accomplishments."
            },
            {
                role: "Supervisor - Human Resources",
                company: "Olson Marin Ltd",
                location: "Seattle, WA",
                period: "Jul 20XX – Jan 20XX",
                details: "This is the place for a brief summary of your key responsibilities and most stellar accomplishments."
            }
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                course: "Human Resources",
                college: "Grasswood University",
                location: "Redmond, WA",
                period: "Jun 20XX",
                details: "You might want to include your GPA here and a brief summary of relevant coursework, awards, and honors."
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            "Project management and team leadership",
            "Strategic planning and execution",
            "Data analysis and reporting",
            "Excellent communication and interpersonal skills",
            "Problem-solving and critical thinking"
        ],

        achievementsHeading: "ACHIEVEMENTS",
        achievements: [
            "Led successful implementation of company-wide HR system",
            "Reduced employee turnover by 30% through innovative retention programs",
            "Received Excellence in Leadership Award 20XX",
            "Successfully managed team of 15+ HR professionals"
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

    const handleSkillChange = (index, e) => {
        const updated = [...resumeData.skills];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, skills: updated });
    };

    const handleAchievementChange = (index, e) => {
        const updated = [...resumeData.achievements];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, achievements: updated });
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
                fontFamily: "Garamond, sans-serif",
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

                {/* Name - Centered */}
                <h1
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("fullName", e)}
                    style={{
                        fontSize: "50px",
                        fontWeight: "normal",
                        color: "#5B8C5A",
                        margin: "0 0 15px 0",
                        textAlign: "center",
                        letterSpacing: "3px",
                        fontFamily: "Gill Sans MT, sans-serif",
                    }}
                >
                    {resumeData.fullName}
                </h1>

                {/* Contact Info - Centered */}
                <p style={{
                    fontSize: "18px",
                    color: "black",
                    textAlign: "center",
                    margin: "0 0 30px 0"
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("street", e)}
                    >
                        {resumeData.street}
                    </span>
                    {" | "}
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("city", e)}
                    >
                        {resumeData.city}
                    </span>
                    {" | "}
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
                </p>

                {/* Objective */}
                <div style={{ marginBottom: "30px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("objectiveHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "black",
                                margin: 0,
                                marginRight: "75px",
                                paddingLeft: "50px",
                                fontFamily: "Gill Sans MT, sans-serif",

                            }}
                        >
                            {resumeData.objectiveHeading}
                        </p>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#999",
                            marginRight: "70px"
                        }}></div>
                    </div>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("objectiveContent", e)}
                        style={{
                            fontSize: "16px",
                            lineHeight: "1.5",
                            color: "black",
                            margin: 0,
                            paddingleft: "50px",
                            marginLeft: "50px",
                            marginRight: "70px",
                        }}
                    >
                        {resumeData.objectiveContent}
                    </p>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "30px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px"
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "black",
                                margin: 0,
                                marginRight: "15px",
                                marginRight: "60px",
                                paddingLeft: "50px",
                                fontFamily: "Gill Sans MT, sans-serif",
                            }}
                        >
                            {resumeData.experienceHeading}
                        </p>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#999",
                            marginRight: "70px"
                        }}></div>
                    </div>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 3px 0",
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",
                                }}
                            >
                                {exp.role}
                            </p>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "5px"
                            }}>
                                <p style={{
                                    fontSize: "16px",
                                    color: "black",
                                    margin: 0,
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",

                                }}>
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
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black",
                                        margin: 0,
                                        marginRight: "70px"
                                    }}
                                >
                                    {exp.period}
                                </p>
                            </div>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.5",
                                    color: "black",
                                    margin: 0,
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",
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
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            marginLeft: "50px",
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
                                    location: "City, State",
                                    period: "Month 20XX – Month 20XX",
                                    details: "Job description and achievements..."
                                })
                            }
                            style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "50px",
                            }}
                        >
                            + Add Experience
                        </span>
                    )}
                </div>

                {/* Education */}
                <div style={{ marginBottom: "30px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px"
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "black",
                                margin: 0,
                                marginRight: "15px",
                                paddingleft: "50px",
                                marginLeft: "50px",
                                marginRight: "60px",
                                fontFamily: "Gill Sans MT, sans-serif",
                            }}
                        >
                            {resumeData.educationHeading}
                        </p>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#999",
                            marginRight: "70px"
                        }}></div>
                    </div>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 3px 0",
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",
                                }}
                            >
                                {edu.course}
                            </p>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                marginBottom: "5px"
                            }}>
                                <p style={{
                                    fontSize: "16px",
                                    color: "black",
                                    margin: 0,
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",
                                }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                    >
                                        {edu.college}
                                    </span>
                                    {" | "}
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "location", e)}
                                    >
                                        {edu.location}
                                    </span>
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black",
                                        margin: 0,
                                        marginRight: "70px"
                                    }}
                                >
                                    {edu.period}
                                </p>
                            </div>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.5",
                                    color: "black",
                                    margin: 0,
                                    paddingleft: "50px",
                                    marginLeft: "50px",
                                    marginRight: "70px",
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
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            marginLeft: "50px",
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
                                    course: "Degree Name",
                                    college: "University Name",
                                    location: "City, State",
                                    period: "Month 20XX",
                                    details: "Details about coursework and achievements..."
                                })
                            }
                            style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "50px",

                            }}
                        >
                            + Add Education
                        </span>
                    )}
                </div>

                {/* Skills */}
                <div style={{ marginBottom: "30px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px"
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "black",
                                margin: 0,
                                marginRight: "15px",
                                paddingleft: "50px",
                                marginLeft: "50px",
                                marginRight: "110px",
                                fontFamily: "Gill Sans MT, sans-serif",
                            }}
                        >
                            {resumeData.skillsHeading}
                        </p>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#999",
                            marginRight: "70px"
                        }}></div>
                    </div>
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                        {resumeData.skills.map((skill, i) => (
                            <li key={i} style={{ marginBottom: "5px", marginLeft: "60px", marginRight: "70px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleSkillChange(i, e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black",
                                    }}
                                >
                                    {skill}
                                </span>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "16px",
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
                                fontSize: "16px",
                                display: "block",
                                marginTop: "10px",
                                marginLeft: "60px",
                            }}
                        >
                            + Add Skill
                        </span>
                    )}
                </div>

                {/* Achievements */}
                <div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px"
                    }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("achievementsHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "black",
                                margin: 0,
                                marginRight: "15px",
                                paddingleft: "50px",
                                marginLeft: "50px",
                                marginRight: "30px",
                                fontFamily: "Gill Sans MT, sans-serif",
                            }}
                        >
                            {resumeData.achievementsHeading}
                        </p>
                        <div style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#999",
                            marginRight: "70px"
                        }}></div>
                    </div>
                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                        {resumeData.achievements.map((achievement, i) => (
                            <li key={i} style={{ marginBottom: "5px", marginLeft: "60px", marginRight: "70px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleAchievementChange(i, e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black",
                                    }}
                                >
                                    {achievement}
                                </span>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("achievements", i)}
                                        style={{
                                            marginLeft: "10px",
                                            fontSize: "16px",
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
                            onClick={() => addItem("achievements", "New Achievement")}
                            style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "16px",
                                display: "block",
                                marginTop: "10px",
                                marginLeft: "60px",
                                marginRight: "30px",
                            }}
                        >
                            + Add Achievement
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate;