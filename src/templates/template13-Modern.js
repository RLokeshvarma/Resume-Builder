import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate13 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "Kai Carter",
        title: "General Practitioner",

        contactHeading: "Contact",
        phone: "876-555-0103",
        website: "www.karmahealthcare.com",
        email: "kai@karmahealthcare.com",

        profileHeading: "Profile",
        profileContent: "Experienced and compassionate GP dedicated to providing high-quality healthcare with strong diagnostic skills and a patient-centered approach. Committed to promoting health and wellness through personalized treatment plans.",

        skillsHeading: "Skills",
        skills: [
            { name: "Clinical diagnosis", stars: 4 },
            { name: "Patient-centered care", stars: 5 },
            { name: "Chronic disease management", stars: 4 },
            { name: "Electronic health records", stars: 3 },
            { name: "Health promotion", stars: 5 }
        ],

        experienceHeading: "Work experience",
        experience: [
            {
                company: "Lamana Healthcare",
                role: "General Practitioner",
                period: "20XX - Present",
                details: "Implemented evidence-based medicine for accurate diagnosis, supervised medical teams, led health fair, provided free screenings to over 200 residents"
            },
            {
                company: "Tyler State MD",
                role: "Family Physician",
                period: "20XX - 20XX",
                details: "Managed a diverse patient caseload, led a smoking cessation program, reduced readmission by 15%, performed successful surgery"
            },
            {
                company: "City Hospital",
                role: "Medical Officer",
                period: "20XX - 20XX",
                details: "Provided emergency medical care with a focus on trauma cases, collaborated with specialists to enhance patient outcomes"
            }
        ],

        hobbiesHeading: "Hobbies",
        hobbies: [
            "Running",
            "Photography",
            "Traveling",
            "Cooking"
        ],

        educationHeading: "Education",
        education: [
            {
                school: "Jasper University",
                degree: "Diploma Link, Medical Research Award",
                period: "20XX - 20XX"
            },
            {
                school: "Belmont College",
                degree: "Bachelor of Science in Biology, Cum Laude, outstanding research thesis",
                period: "20XX - 20XX"
            }
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

    const handleSkillChange = (index, key, e) => {
        const updated = [...resumeData.skills];
        if (key === 'stars') {
            updated[index] = { ...updated[index], [key]: parseInt(e.target.innerText) || 0 };
        } else {
            updated[index] = { ...updated[index], [key]: e.target.innerText };
        }
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

    const renderStars = (rating, isEditing, index) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= rating ? "rgb(81 113 165)" : "#ddd",
                        fontSize: "16px",
                        marginRight: "2px",
                        cursor: isEditing ? "pointer" : "default"
                    }}
                    onClick={isEditing ? () => handleSkillChange(index, 'stars', { target: { innerText: i } }) : undefined}
                >
                    ★
                </span>
            );
        }
        return stars;
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
                fontFamily: "Franklin Gothic, sans-serif",
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

                {/* Section 1: Contact & Header */}
                <div style={{ display: "flex", marginBottom: "30px" }}>
                    {/* Left Column - Contact */}
                    <div style={{ width: "40%", marginLeft: "60px", marginTop: "70px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)} style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0",
                                marginBottom: "20px"
                            }}>
                            Contact
                        </h3>
                        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("phoneHeading", e)} style={{ fontSize: "16px", color: "rgb(81 113 165)", fontWeight: "bold", marginRight: "34px" }}>
                                Phone:
                            </span>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("phone", e)}
                                style={{ fontSize: "16px" }}
                            >
                                {resumeData.phone}
                            </span>
                        </div>
                        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("websiteHeading", e)} style={{ fontSize: "16px", color: "rgb(81 113 165)", fontWeight: "bold", marginRight: "20px" }}>
                                Website:
                            </span>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("website", e)}
                                style={{ fontSize: "16px", color: "black" }}
                            >
                                {resumeData.website}
                            </span>
                        </div>
                        <div style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                            <span 
                            contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("emailHeading", e)}style={{ fontSize: "16px", color: "rgb(81 113 165)", fontWeight: "bold", marginRight: "38px" }}>
                                Email:
                            </span>
                            <span
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("email", e)}
                                style={{ fontSize: "16px", color: "black" }}
                            >
                                {resumeData.email}
                            </span>
                        </div>
                    </div>

                    {/* Right Column - Name & Title */}
                    <div style={{ width: "60%", marginLeft: "30px", marginTop: "70px" }}>
                        <h1
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("fullName", e)}
                            style={{
                                fontSize: "60px",
                                fontWeight: "bold",
                                color: "rgb(81 113 165)",
                                margin: "0 0 5px 0"
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
                                fontWeight: "bold",
                                color: "black",
                                margin: 0
                            }}
                        >
                            {resumeData.title}
                        </p>
                    </div>
                </div>

                {/* Horizontal Line */}
                <div style={{
                    height: "2px",
                    backgroundColor: "black",
                    marginBottom: "30px",
                    marginLeft: "45px",
                    marginRight: "50px"
                }}></div>

                {/* Section 2: Profile/Skills & Work Experience */}
                <div style={{ display: "flex", marginBottom: "30px" }}>
                    {/* Left Column - Profile & Skills */}
                    <div style={{ width: "40%", paddingRight: "20px", marginLeft: "60px", marginRight: "30px" }}>
                        {/* Profile */}
                        <div style={{ marginBottom: "25px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("profileHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.profileHeading}
                            </h3>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("profileContent", e)}
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "1.4",
                                    color: "black",
                                    margin: 0
                                }}
                            >
                                {resumeData.profileContent}
                            </p>
                        </div>

                        {/* Profile Divider */}
                        <div style={{
                            height: "2px",
                            backgroundColor: "black",
                            marginBottom: "25px",
                            marginRight: "20px"
                        }}></div>

                        {/* Skills */}
                        <div>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("skillsHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.skillsHeading}
                            </h3>
                            {resumeData.skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ marginRight: "20px" }}>
                                            {renderStars(skill.stars, isEditing, i)}
                                        </div>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleSkillChange(i, 'name', e)}
                                            style={{
                                                fontSize: "16px",
                                                color: "black"
                                            }}
                                        >
                                            {skill.name}
                                        </span>
                                    </div>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("skills", i)}
                                            style={{
                                                fontSize: "16px",
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
                                    onClick={() => addItem("skills", { name: "New Skill", stars: 3 })}
                                    style={{
                                        color: "#4472C4",
                                        cursor: "pointer",
                                        fontSize: "16px"
                                    }}
                                >
                                    + Add Skill
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Work Experience */}
                    <div style={{ width: "60%", marginLeft: "30px", marginRight: "60px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "rgb(81 113 165)"
                                        }}
                                    >
                                        {exp.company}
                                    </span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                        style={{
                                            fontSize: "16px",
                                            color: "black"
                                        }}
                                    >
                                        {exp.period}
                                    </span>
                                </div>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black",
                                        margin: "0 0 8px 0"
                                    }}
                                >
                                    {exp.role}
                                </p>

                                {/* Vertical Line only for details */}
                                <div style={{ position: "relative", paddingLeft: "15px", marginLeft: "10px" }}>
                                    <div style={{
                                        position: "absolute",
                                        left: "0",
                                        top: "0",
                                        bottom: "0",
                                        width: "2px",
                                        backgroundColor: "black"
                                    }}></div>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "1.4",
                                            color: "black",
                                            margin: 0
                                        }}
                                    >
                                        {exp.details}
                                    </p>
                                </div>

                                {isEditing && (
                                    <div style={{ marginTop: 6 }}>
                                        <span
                                            onClick={() => removeItem("experience", i)}
                                            style={{
                                                color: "red",
                                                fontSize: "16px",
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
                                        period: "20XX - 20XX",
                                        details: "Job description and achievements..."
                                    })
                                }
                                style={{
                                    color: "#4472C4",
                                    cursor: "pointer",
                                    fontSize: "16px"
                                }}
                            >
                                + Add Experience
                            </span>
                        )}
                    </div>
                </div>

                {/* Horizontal Line */}
                <div style={{
                    height: "2px",
                    backgroundColor: "black",
                    marginBottom: "30px",
                    marginLeft: "45px",
                    marginRight: "50px"
                }}></div>

                {/* Section 3: Hobbies & Education */}
                <div style={{ display: "flex" }}>
                    {/* Left Column - Hobbies */}
                    <div style={{ width: "40%", paddingRight: "20px", marginLeft: "60px", marginRight: "30px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("hobbiesHeading", e)}
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.hobbiesHeading}
                        </h3>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                            {resumeData.hobbies.map((hobby, i) => (
                                <li key={i} style={{ marginBottom: "5px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleHobbyChange(i, e)}
                                        style={{
                                            fontSize: "16px",
                                            color: "black"
                                        }}
                                    >
                                        {hobby}
                                    </span>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("hobbies", i)}
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
                                onClick={() => addItem("hobbies", "New Hobby")}
                                style={{
                                    color: "#4472C4",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    display: "block",
                                    marginTop: "10px"
                                }}
                            >
                                + Add Hobby
                            </span>
                        )}
                    </div>

                    {/* Right Column - Education */}
                    <div style={{ width: "60%", marginLeft: "30px", marginRight: "60px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.educationHeading}
                        </h3>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "5px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "school", e)}
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "rgb(81 113 165)"
                                        }}
                                    >
                                        {edu.school}
                                    </span>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{
                                            fontSize: "16px",
                                            color: "black"
                                        }}
                                    >
                                        {edu.period}
                                    </span>
                                </div>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                                    style={{
                                        fontSize: "16px",
                                        lineHeight: "1.4",
                                        color: "black",
                                        margin: 0
                                    }}
                                >
                                    {edu.degree}
                                </p>
                                {isEditing && (
                                    <div style={{ marginTop: 6 }}>
                                        <span
                                            onClick={() => removeItem("education", i)}
                                            style={{
                                                color: "red",
                                                fontSize: "16px",
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
                                        degree: "Degree and achievements",
                                        period: "20XX - 20XX"
                                    })
                                }
                                style={{
                                    color: "#4472C4",
                                    cursor: "pointer",
                                    fontSize: "16px"
                                }}
                            >
                                + Add Education
                            </span>
                        )}
                    </div>
                </div>
                {/* Horizontal Line */}
                <div style={{
                    height: "2px",
                    backgroundColor: "black",
                    marginBottom: "30px",
                    marginLeft: "45px",
                    marginRight: "50px",
                    marginTop: "20px"
                }}></div>
            </div>
        </div>
    );
};

export default ResumeTemplate13;