import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate23 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "Mira Karlsson",
        role: "web designer/developer",
        summary: "As a future digital designer, I have skills and experience in designing different creative projects like websites, web applications, landing pages, and more.",
        profileImage: null,

        aboutHeading: "about",
        contactHeading: "CONTACT",
        contact: [
            "www.mira.web",
            "01 2345 678",
            "mira@email.com",
            "www.mirakarls.com"
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                school: "SCHOOL OF ART",
                course: "bachelor of fine art"
            },
            {
                school: "Belmont College",
                course: "UX/UI and web design"
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            { name: "UI/UX design", level: 90 },
            { name: "HTML/CSS", level: 85 },
            { name: "JavaScript", level: 75 },
            { name: "Photoshop", level: 80 },
            { name: "Figma/Adobe XD", level: 85 }
        ],

        languagesHeading: "LANGUAGES",
        languages: [
            { name: "English", level: 95 },
            { name: "Spanish", level: 70 },
            { name: "French", level: 50 }
        ],

        experienceHeading: "work experience",
        experience: [
            {
                role: "WEB DESIGNER",
                company: "Digital Studio",
                period: "2018-2019",
                details: [
                    "Developed complex web applications",
                    "Led teams and collaborated with stakeholders and developers",
                    "Implemented and translated UX/UI designs for web applications",
                    "Implemented website improvements for search optimization"
                ]
            },
            {
                role: "ART DIRECTOR",
                company: "Creative Agency",
                period: "2016-2018",
                details: [
                    "Led creative teams and managed client relationships",
                    "Developed design systems and brand strategies for various and small businesses and marketing strategy",
                    "Worked on art direction to develop web focus",
                    "Implemented full-scale marketing"
                ]
            },
            {
                role: "JUNIOR DESIGNER",
                company: "Webmart",
                period: "2014-2016",
                details: [
                    "Assisted with visual design and branding for websites and web applications",
                    "Assisted with code using HTML/CSS",
                    "Contributed user research and supports on issues design and user experience diagrams",
                    "Implemented visual designs and development needs in chosen design and user"
                ]
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

    const handleContactChange = (index, e) => {
        const updated = [...resumeData.contact];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, contact: updated });
    };

    const handleListChange = (section, index, listKey, listIndex, e) => {
        const updated = [...resumeData[section]];
        const list = [...(updated[index][listKey] || [])];
        list[listIndex] = e.target.innerText;
        updated[index] = { ...updated[index], [listKey]: list };
        setResumeData({ ...resumeData, [section]: updated });
    };

    const handleSkillLevelChange = (section, index, newLevel) => {
        const updated = [...resumeData[section]];
        updated[index] = { ...updated[index], level: newLevel };
        setResumeData({ ...resumeData, [section]: updated });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setResumeData({ ...resumeData, profileImage: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const addItem = (field, newItem) =>
        setResumeData({ ...resumeData, [field]: [...resumeData[field], newItem] });

    const removeItem = (field, index) =>
        setResumeData({ ...resumeData, [field]: resumeData[field].filter((_, i) => i !== index) });

    const renderProgressBar = (level, isEditing, section, index) => {
        return (
            <div style={{ marginTop: "5px" }}>
                <div style={{
                    width: "70%",
                    height: "10px",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid red",
                    overflow: "hidden"
                }}>
                    <div style={{
                        width: `${level}%`,
                        height: "100%",
                        backgroundColor: "rgb(247 167 167)",
                        
                    }}></div>
                </div>
                {isEditing && (
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleSkillLevelChange(section, index, parseInt(e.target.value))}
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
                fontFamily: "Arial, sans-serif",
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
                    background: "#fff"
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

                {/* Section 1: Header */}
                <div style={{ 
                    display: "flex", 
                    padding: "40px",
                    marginRight: "70px",
                    marginLeft: "30px",
                    borderBottom: "2px solid rgb(235 28 28)"
                }}>
                    {/* Left Column - Profile Image */}
                    <div style={{ width: "25%", marginTop: "20px" }}>
                        <div 
                            style={{
                                width: "170px",
                                height: "170px",
                                borderRadius: "50%",
                                backgroundColor: resumeData.profileImage ? "transparent" : "rgb(235 28 28)",
                                overflow: "hidden",
                                cursor: isEditing ? "pointer" : "default",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onClick={isEditing ? () => document.getElementById('imageUpload').click() : undefined}
                        >
                            {resumeData.profileImage ? (
                                <img 
                                    src={resumeData.profileImage} 
                                    alt="Profile"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                <span style={{ color: "white", fontSize: "12px", textAlign: "center" }}>
                                    {isEditing ? "Click to Upload" : "Photo"}
                                </span>
                            )}
                            {isEditing && (
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: "none" }}
                                    className="no-print"
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Column - Name, Role, Summary */}
                    <div style={{ width: "75%", marginTop: "20px", marginLeft: "35px"}}>
                        <h1
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("fullName", e)}
                            style={{
                                fontSize: "50px",
                                fontWeight: "bold",
                                color: "rgb(235 28 28)",
                                margin: "0 0 5px 0",
                                fontFamily: "Century Gothic, sans-serif",
                            }}
                        >
                            {resumeData.fullName}
                        </h1>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("role", e)}
                            style={{
                                fontSize: "20px",
                                color: "black",
                                margin: "0 0 20px 0",
                                fontWeight: "bold",
                                fontFamily: "Century Gothic, sans-serif",
                            }}
                        >
                            {resumeData.role}
                        </p>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("summary", e)}
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                color: "black",
                                margin: 0
                            }}
                        >
                            {resumeData.summary}
                        </p>
                    </div>
                </div>

                {/* Section 2: Main Content */}
                <div style={{ display: "flex" }}>
                    {/* Left Column - 25% */}
                    <div style={{
                        width: "25%",
                        marginTop: "30px",
                        backgroundColor: "white",
                        marginLeft: "70px"
                    }}>
                        {/* About & Contact */}
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("aboutHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "rgb(235 28 28)",
                                margin: "0 0 15px 0",
                                fontFamily: "Century Gothic, sans-serif",
                            }}
                        >
                            {resumeData.aboutHeading}
                        </h3>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)}
                            style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 10px 0"
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
                                        X
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
                                    marginTop: "5px"
                                }}
                            >
                                + Add
                            </span>
                        )}

                        {/* Education */}
                        <div style={{ marginTop: "25px" }}>
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
                                        onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0
                                        }}
                                    >
                                        {edu.course}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("education", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginTop: "3px",
                                                display: "block"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("education", { school: "School Name", course: "Course" })}
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add
                                </span>
                            )}
                        </div>

                        {/* Skills */}
                        <div style={{ marginTop: "25px" }}>
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
                            {resumeData.skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("skills", i, "name", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: "0 0 3px 0",
                                        }}
                                    >
                                        {skill.name}
                                    </p>
                                    {renderProgressBar(skill.level, isEditing, "skills", i)}
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("skills", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginTop: "3px",
                                                display: "block"
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
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add
                                </span>
                            )}
                        </div>

                        {/* Languages */}
                        <div style={{ marginTop: "25px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("languagesHeading", e)}
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.languagesHeading}
                            </h3>
                            {resumeData.languages.map((lang, i) => (
                                <div key={i} style={{ marginBottom: "12px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("languages", i, "name", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: "0 0 3px 0",
                                        }}
                                    >
                                        {lang.name}
                                    </p>
                                    {renderProgressBar(lang.level, isEditing, "languages", i)}
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("languages", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginTop: "3px",
                                                display: "block"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("languages", { name: "New Language", level: 50 })}
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - 75% */}
                    <div style={{
                        width: "75%",
                        padding: "30px 40px",
                        backgroundColor: "white",
                        marginRight: "70px"
                    }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "rgb(235 28 28)",
                                margin: "0 0 20px 0",
                                fontFamily: "Century Gothic, sans-serif",
                            }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "25px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        color: "black",
                                        margin: "0 0 3px 0"
                                    }}
                                >
                                    {exp.role}
                                </p>
                                <p style={{ 
                                    fontSize: "14px", 
                                    color: "black",
                                    margin: "0 0 8px 0"
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
                                        onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    >
                                        {exp.period}
                                    </span>
                                </p>
                                <ul style={{ paddingLeft: "15px", margin: 0 }}>
                                    {exp.details.map((detail, j) => (
                                        <li
                                            key={j}
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleListChange("experience", i, "details", j, e)}
                                            style={{
                                                fontSize: "14px",
                                                lineHeight: "1.4",
                                                color: "black",
                                                marginBottom: "3px"
                                            }}
                                        >
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
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
                                        period: "20XX-20XX",
                                        details: ["Job description..."]
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
            </div>
        </div>
    );
};

export default ResumeTemplate23;