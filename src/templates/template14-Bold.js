import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate14 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "KAI CARTER",
        title: "General Practitioner",

        phone: "678-555-0103",
        website: "lamnahealthcare.com",
        email: "kai@lamnahealthcare.com",

        summaryContent: "Experienced and compassionate GP dedicated to delivering excellent patient care. Known for strong diagnostic skills and a patient-centered approach. Committed to promoting health and wellness through personalized treatment plans.",

        experienceHeading: "WORK EXPERIENCE",
        experience: [
            {
                company: "Lamana Healthcare",
                role: "General Practitioner",
                period: "December 20XX – Present",
                details: "Implemented evidence-based medicine for accurate diagnosis, supervised medical teams, led community health fair, provided free screenings to over 200 residents"
            },
            {
                company: "Tyler State MD",
                role: "Family Physician",
                period: "August 20XX – October 20XX",
                details: "Managed a diverse patient caseload, led a smoking cessation program, resulting in a 30% increase in successful quit attempts"
            },
            {
                company: "City Hospital",
                role: "Medical Officer",
                period: "April 20XX – August 20XX",
                details: "Provided emergency medical care with a focus on trauma cases, collaborated with specialists to enhance patient outcomes"
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            { name: "Clinical diagnosis", level: 90 },
            { name: "Patient-centered care", level: 95 },
            { name: "Health promotion", level: 85 },
            { name: "Chronic disease management", level: 80 }
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                school: "Jasper University",
                period: "September 20XX – June 20XX",
                details: "Dean's List, Medical Research Award"
            },
            {
                school: "Belmont College",
                period: "September 20XX – May 20XX",
                details: "Bachelor of Science in Biology, Cum Laude, outstanding research thesis"
            }
        ],

        hobbiesHeading: "HOBBIES",
        hobbies: [
            "Running",
            "Photography",
            "Traveling",
            "Cooking",
            "Camping"
        ],

        contactHeading: "CONTACT"
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

    const handleSkillLevelChange = (index, newLevel) => {
        const updated = [...resumeData.skills];
        updated[index] = { ...updated[index], level: newLevel };
        setResumeData({ ...resumeData, skills: updated });
    };

    const handleHobbyChange = (index, e) => {
        const updated = [...resumeData.hobbies];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, hobbies: updated });
    };

    const addItem = (field, newItem) =>
        setResumeData({ ...resumeData, [field]: [...resumeData[field], newItem] });

    const removeItem = (field, index) =>
        setResumeData({ ...resumeData, [field]: resumeData[field].filter((_, i) => i !== index) });

    const renderProgressBar = (level, isEditing, index) => {
        return (
            <div style={{ marginTop: "5px" }}>
                <div style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#e0e0e0",
                    overflow: "hidden"
                }}>
                    <div style={{
                        width: `${level}%`,
                        height: "100%",
                        backgroundColor: "#4472C4",
                    }}></div>
                </div>
                {isEditing && (
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleSkillLevelChange(index, parseInt(e.target.value))}
                        style={{
                            width: "100%",
                            marginTop: "5px"
                        }}
                    />
                )}
            </div>
        );
    };

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
                fontFamily: "Arial Rounded MT, sans-serif",
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

                {/* Section 1: Header */}
                <div style={{ display: "flex", marginBottom: "25px", marginTop: "70px" }}>
                    {/* Left Column - Name & Title */}
                    <div style={{ width: "60%", marginLeft: "70px" }}>
                        <h1
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("fullName", e)}
                            style={{
                                fontSize: "50px",
                                fontWeight: "bolder",
                                color: "rgb(85 92 180)",
                                margin: "0 0 5px 0",
                            }}
                        >
                            {resumeData.fullName}
                        </h1>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("title", e)}
                            style={{
                                fontSize: "30px",
                                color: "black",
                                margin: 0,
                                fontWeight: "bold",
                                fontFamily: "Calibri, sans-serif",
                            }}
                        >
                            {resumeData.title}
                        </p>
                    </div>

                    {/* Right Column - Contact with slashes */}
                    <div style={{ width: "40%", marginLeft: "70px", marginTop: "20px" }}>
                        <div style={{ fontSize: "14px", color: "black" }}>
                            <div style={{ marginBottom: "10px" }}>
                                / <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("phone", e)}
                                >
                                    {resumeData.phone}
                                </span>
                            </div>
                            <div style={{ marginBottom: "10px" }}>
                                / <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("website", e)}
                                >
                                    {resumeData.website}
                                </span>
                            </div>
                            <div>
                                / <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("email", e)}
                                >
                                    {resumeData.email}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Dotted Line Divider */}
                <div style={{
                    borderBottom: "1px dashed rgb(85 92 180)",
                    marginBottom: "25px",
                    marginLeft: "60px",
                    marginRight: "50px"
                }}></div>

                {/* Section 2: Summary */}
                <div style={{ marginBottom: "25px", marginLeft: "70px", marginRight: "50px" }}>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("summaryContent", e)}
                        style={{
                            fontSize: "14px",
                            lineHeight: "1.5",
                            color: "black",
                            margin: 0
                        }}
                    >
                        {resumeData.summaryContent}
                    </p>
                </div>

                {/* Dotted Line Divider */}
                <div style={{
                    borderBottom: "1px dashed rgb(85 92 180)",
                    marginBottom: "25px",
                    marginLeft: "60px",
                    marginRight: "50px"
                }}></div>

                {/* Section 3: Main Content */}
                <div style={{ display: "flex" }}>
                    {/* Left Column - Work Experience & Skills */}
                    <div style={{ width: "60%", paddingRight: "20px", marginLeft: "70px", marginRight: "20px" }}>
                        {/* Work Experience */}
                        <div style={{ marginBottom: "30px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("experienceHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "rgb(85 92 180)",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.experienceHeading}
                            </h3>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: "20px" }}>
                                    <p style={{ margin: "0 0 3px 0" }}>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "black"
                                            }}
                                        >
                                            {exp.company}
                                        </span>
                                        {" / "}
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
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 5px 0",
                                            fontFamily: "Calibri, sans-serif",
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
                                            margin: 0,
                                            fontFamily: "Calibri, sans-serif",
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
                                            company: "Company Name",
                                            role: "Job Title",
                                            period: "Month 20XX – Month 20XX",
                                            details: "Job description and achievements..."
                                        })
                                    }
                                    style={{
                                        color: "#4472C4",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Experience
                                </span>
                            )}
                        </div>



                        {/* Skills */}
                        <div>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("skillsHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "rgb(85 92 180)",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.skillsHeading}
                            </h3>
                            {resumeData.skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: "15px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("skills", i, "name", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {skill.name}
                                    </span>
                                    {renderProgressBar(skill.level, isEditing, i)}
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
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("skills", { name: "New Skill", level: 50 })}
                                    style={{
                                        color: "#4472C4",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Skill
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Vertical Dotted Line */}
                    <div style={{
                        borderLeft: "1px dashed rgb(85 92 180)",
                        marginRight: "20px",
                        marginBottom: "60px"
                    }}></div>

                    {/* Right Column - Education, Hobbies & Contact */}
                    <div style={{ width: "40%", marginBottom: "100px" }}>
                        {/* Education */}
                        <div style={{ marginBottom: "25px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("educationHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "rgb(85 92 180)",
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
                                        onBlur={(e) => handleNestedChange("education", i, "school", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 3px 0"
                                        }}
                                    >
                                        {edu.school}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 3px 0",
                                            fontFamily: "Calibri, sans-serif",
                                        }}
                                    >
                                        {edu.period}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "1.4",
                                            color: "black",
                                            margin: 0,
                                            fontFamily: "Calibri, sans-serif",
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
                                            school: "School Name",
                                            period: "Month 20XX – Month 20XX",
                                            details: "Degree and achievements"
                                        })
                                    }
                                    style={{
                                        color: "#4472C4",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Education
                                </span>
                            )}
                        </div>



                        {/* Hobbies */}
                        <div style={{ marginBottom: "25px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("hobbiesHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "rgb(85 92 180)",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.hobbiesHeading}
                            </h3>
                            {resumeData.hobbies.map((hobby, i) => (
                                <div key={i} style={{ marginBottom: "5px", display: "flex", alignItems: "center" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleHobbyChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0,
                                            fontFamily: "Calibri, sans-serif",
                                            flex: 1 // allows the text to take up remaining space
                                        }}
                                    >
                                        {hobby}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("hobbies", i)}
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
                                    onClick={() => addItem("hobbies", "New Hobby")}
                                    style={{
                                        color: "#4472C4",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Hobby
                                </span>
                            )}
                        </div>



                        {/* Contact Section */}
                        <div>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("contactHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "rgb(85 92 180)",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.contactHeading}
                            </h3>
                            <div style={{ marginBottom: "15px" }}>
                                <h4
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("phoneHeading", e)} style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "rgb(85 92 180)",
                                        margin: "0 0 3px 0"
                                    }}>
                                    Phone
                                </h4>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("phone", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: 0,
                                        fontFamily: "Calibri, sans-serif",
                                    }}
                                >
                                    {resumeData.phone}
                                </p>
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <h4
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("websiteHeading", e)} style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "rgb(85 92 180)",
                                        margin: "0 0 3px 0"
                                    }}>
                                    Website
                                </h4>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("website", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: 0,
                                        fontFamily: "Calibri, sans-serif",
                                    }}
                                >
                                    {resumeData.website}
                                </p>
                            </div>
                            <div>
                                <h4
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("emailHeading", e)} style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "rgb(85 92 180)",
                                        margin: "0 0 3px 0"
                                    }}>
                                    Email
                                </h4>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleChange("email", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: 0,
                                        fontFamily: "Calibri, sans-serif",
                                    }}
                                >
                                    {resumeData.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate14;