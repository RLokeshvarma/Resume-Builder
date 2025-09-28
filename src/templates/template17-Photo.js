import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        firstName: "Manasi",
        lastName: "Goyal",
        role: "GRAPHIC DESIGNER",
        profileImage: null, // Will store the uploaded image URL

        objectiveHeading: "OBJECTIVE",
        objectiveContent: "To leverage my creativity and design skills to develop visually compelling and effective designs that meet the needs and exceed the expectations of clients.",

        contactHeading: "CONTACT",
        contact: [
            "Sandara Keksapuhiro",
            "manasi@example.com",
            "+91 915 5562649",
            "www.intersertingsite.com"
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                school: "GRAPHIC DESIGN INSTITUTE",
                course: "Master of Arts Graphic Design"
            },
            {
                school: "SCHOOL OF FINE ART",
                course: "BA Fine Arts Graphic Design"
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            { name: "Adobe software", level: 85 },
            { name: "Visual communication", level: 90 },
            { name: "Branding", level: 80 },
            { name: "Project management", level: 75 }
        ],

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "ART DIRECTOR",
                company: "Sandara Design Co.",
                location: "Jaipur, Rajasthan",
                period: "20XX-20XX",
                details: "Collaborate with cross-functional teams, including copywriters, graphic designers to develop integrated campaigns across various media channels."
            },
            {
                role: "SENIOR DESIGNER",
                company: "Prem Relations",
                location: "Ahmedabad, Telangana",
                period: "20XX-20XX",
                details: "Led design projects from concept to completion, collaborating with clients on various design projects, including branding, editorial and environmental design."
            },
            {
                role: "GRAPHIC DESIGNER",
                company: "Kota Arts",
                location: "Bangalore, Karnataka",
                period: "20XX-20XX",
                details: "Worked with cross-functional teams, including marketing, product development, and digital, to ensure the effective execution of design projects."
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

    const handleSkillLevelChange = (index, newLevel) => {
        const updated = [...resumeData.skills];
        updated[index] = { ...updated[index], level: newLevel };
        setResumeData({ ...resumeData, skills: updated });
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

    const renderProgressBar = (level, isEditing, index) => {
        return (
            <div style={{ marginTop: "5px" }}>
                <div style={{
                    width: "100%",
                    height: "10px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    overflow: "hidden"
                }}>
                    <div style={{
                        width: `${level}%`,
                        height: "100%",
                        backgroundColor: "rgb(196 55 132)",
                        borderRadius: "5px"
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
                fontFamily: "Century Gothic, sans-serif",
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
                    display: "flex",
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

                {/* Left Column */}
                <div style={{
                    width: "35%",
                    backgroundColor: "white",
                    padding: "40px 30px"
                }}>
                    {/* Square Image with Upload Functionality */}
                    <div style={{
                        width: "250px",
                        height: "250px",
                        backgroundColor: resumeData.profileImage ? "transparent" : "rgb(196 55 132)",
                        marginBottom: "50px",
                        marginTop: "30px",
                        marginLeft: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                        cursor: isEditing ? "pointer" : "default"
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
                            <>
                                Profile Image
                                <br />
                                (150x150)
                                {isEditing && (
                                    <>
                                        <br />
                                        Click to Upload
                                    </>
                                )}
                            </>
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

                    {/* Contact */}
                    <div style={{ marginBottom: "30px", marginLeft: "40px", }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "rgb(196 55 132)",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.contactHeading}
                        </p>
                        {resumeData.contact.map((contact, i) => (
                            <div key={i} style={{ marginBottom: "8px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleContactChange(i, e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: 0
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
                                onClick={() => addItem("contact", "New Contact")}
                                style={{
                                    color: "#E8A5C0",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Contact
                            </span>
                        )}
                    </div>

                    {/* Education */}
                    <div style={{ marginBottom: "30px", marginLeft: "40px", }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "rgb(196 55 132)",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.educationHeading}
                        </p>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} style={{ marginBottom: "15px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "school", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 3px 0",
                                        fontWeight: "bold"
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
                                        margin: 0,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {edu.course}
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
                                        course: "Course Name"
                                    })
                                }
                                style={{
                                    color: "#E8A5C0",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                }}
                            >
                                + Add Education
                            </span>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "rgb(196 55 132)",
                                margin: "0 0 15px 0",
                                marginLeft: "40px",
                            }}
                        >
                            {resumeData.skillsHeading}
                        </p>
                        {resumeData.skills.map((skill, i) => (
                            <div key={i} style={{ marginBottom: "15px", marginLeft: "40px", }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("skills", i, "name", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 5px 0",
                                    }}
                                >
                                    {skill.name}
                                </p>
                                {renderProgressBar(skill.level, isEditing, i)}
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{
                                            fontSize: "14px",
                                            color: "red",
                                            cursor: "pointer",
                                            marginTop: "5px",
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
                                    color: "#E8A5C0",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    marginLeft: "40px"
                                }}
                            >
                                + Add Skill
                            </span>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div style={{
                    width: "65%",
                    backgroundColor: "white",
                    padding: "40px 40px 40px 30px"
                }}>
                    {/* Role */}
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("role", e)}
                        style={{
                            fontSize: "18px",
                            color: "rgb(196 55 132)",
                            margin: "0 0 15px 0",
                            marginTop: "30px"
                        }}
                    >
                        {resumeData.role}
                    </p>

                    {/* Name */}
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("firstName", e)}
                        style={{ margin: 0, fontSize: "80px", color: "rgb(196 55 132)", marginTop: "30px", fontFamily: "Bookman Old, sans-serrif" }}
                    >
                        {resumeData.firstName}
                    </p>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("lastName", e)}
                        style={{ margin: 0, fontSize: "80px",color: "rgb(196 55 132)", marginBottom: "40px", fontFamily: "Bookman Old, sans-serrif" }}
                    >
                        {resumeData.lastName}
                    </p>

                    {/* Objective */}
                    <div style={{ marginBottom: "30px" }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("objectiveHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "rgb(196 55 132)",
                                margin: "0 0 20px 0"
                            }}
                        >
                            {resumeData.objectiveHeading}
                        </p>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("objectiveContent", e)}
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.4",
                                fontWeight: "bold",
                                color: "black",
                                margin: 0,
                                marginBottom: "40px"
                            }}
                        >
                            {resumeData.objectiveContent}
                        </p>
                    </div>

                    {/* Experience */}
                    <div>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "18px",
                                color: "rgb(196 55 132)",
                                margin: "0 0 20px 0"
                            }}
                        >
                            {resumeData.experienceHeading}
                        </p>
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
                                        margin: "0 0 5px 0"
                                    }}
                                >
                                    {exp.role}
                                </p>
                                <p style={{
                                    fontSize: "14px",
                                    color: "black",
                                    fontWeight: "bold",
                                    margin: "0 0 10px 0"
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
                                    {" | "}
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    >
                                        {exp.period}
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
                                        role: "Job Title",
                                        company: "Company Name",
                                        location: "Location",
                                        period: "20XX-20XX",
                                        details: "Job description and achievements..."
                                    })
                                }
                                style={{
                                    color: "#E8A5C0",
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

export default ResumeTemplate;