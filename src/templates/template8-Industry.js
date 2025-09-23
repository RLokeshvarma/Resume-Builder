import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "May Riley",
        address: "4567 Main Street, Buffalo, New York 68162",
        phone: "(716) 555-0100",
        email: "m.riley@live.com",
        website: "www.linkedin.com/in/mayriley",

        profileHeading: "Profile",
        profileContent: "Friendly and engaging team player and leader able to inspire staff to perform their best. Detail oriented and experienced restaurant manager passionate about food and beverage. A multi-tasker who excels at team building and training new employees to deliver exceptional service and achieve maximum customer satisfaction. Regularly exceed sales goals. A master in the art of upselling.",

        experienceHeading: "Experience",
        experience: [
            {
                role: "RESTAURANT MANAGER",
                company: "CONTOSO BAR AND GRILL",
                period: "SEPTEMBER 20XX – PRESENT",
                details: [
                    "Recruit, hire, train, and coach over 30 staff members on customer service skills, food & beverage knowledge, sales, and health & safety standards.",
                    "Accomplish financial objectives by forecasting requirements, preparing an annual budget, scheduling expenditures, and reduced waste.",
                    "Consistently exceed monthly sales goals for a minimum of 15% by training team members on upselling techniques and by creating a relaxed food and beverage program."
                ]
            },
            {
                role: "RESTAURANT MANAGER",
                company: "FOURTH COFFEE BISTRO",
                period: "JUNE 20XX – AUGUST 20XX",
                details: [
                    "Created a cross-training program ensuring FOH staff members were able to perform confidently and effectively in all positions.",
                    "Increased sales and customer retention utilizing social media accounts by 15% through interactive promotions, engaging postings, and contests.",
                    "Created and implemented staff health and safety standards compliance training program, achieving a score of 99% from the Board of Health.",
                    "Successfully redesigned existing inventory systems, ordering and food storage practices, resulting in a 6% decrease in food waste and higher net profits."
                ]
            }
        ],

        educationHeading: "Education",
        education: [
            {
                degree: "B.S. IN BUSINESS ADMINISTRATION",
                period: "JUNE 20XX",
                college: "BIGTOWN COLLEGE, CHICAGO, ILLINOIS"
            },
            {
                degree: "A.A. IN HOSPITALITY MANAGEMENT",
                period: "JUNE 20XX",
                college: "BIGTOWN COLLEGE, CHICAGO, ILLINOIS"
            }
        ],

        skillsHeading: "Skills & Abilities",
        skills: [
            "Accounting & Budgeting",
            "Poised under pressure",
            "Proficient with POS systems",
            "Experienced in most restaurant positions",
            "Excellent interpersonal and communication skills",
            "Fun and energetic"
        ],

        activitiesHeading: "Activities and Interests",
        activitiesContent: "Amateur environmental conservationist, art, hiking, dining, travel"
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

    const handleListChange = (section, index, listKey, listIndex, e) => {
        const updated = [...resumeData[section]];
        const list = [...(updated[index][listKey] || [])];
        list[listIndex] = e.target.innerText;
        updated[index] = { ...updated[index], [listKey]: list };
        setResumeData({ ...resumeData, [section]: updated });
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

                {/* Name */}
                <h1
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("fullName", e)}
                    style={{
                        fontSize: "50px",
                        fontWeight: "normal",
                        color: "rgb(42 123 136)",
                        margin: "0 0 10px 0",
                        marginTop: "80px",
                        marginLeft: "70px",
                        marginRight: "70px"
                    }}
                >
                    {resumeData.fullName}
                </h1>

                {/* Blue horizontal line */}
                <div style={{
                    height: "2px",
                    backgroundColor: "rgb(42 123 136)",
                    marginBottom: "15px",
                    marginLeft: "70px",
                    marginRight: "70px"
                }}></div>

                {/* Contact Details */}
                <div style={{
                    fontSize: "16px",
                    color: "black",
                    marginBottom: "25px",
                    marginLeft: "70px",
                    marginRight: "70px"
                }}>
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("address", e)}
                    >
                        {resumeData.address}
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
                    {" | "}
                    <span
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("website", e)}
                    >
                        {resumeData.website}
                    </span>
                </div>

                {/* Profile */}
                <div style={{ marginBottom: "25px" }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("profileHeading", e)}
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "rgb(42 123 136)",
                            margin: "0 0 10px 0",
                            marginLeft: "70px",
                            marginRight: "70px"
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
                            margin: 0,
                            marginLeft: "70px",
                            marginRight: "70px"
                        }}
                    >
                        {resumeData.profileContent}
                    </p>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: "25px" }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("experienceHeading", e)}
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "rgb(42 123 136)",
                            margin: "0 0 15px 0",
                            marginLeft: "70px",
                            marginRight: "70px"
                        }}
                    >
                        {resumeData.experienceHeading}
                    </h3>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <div style={{ marginBottom: "8px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black",
                                        marginLeft: "70px"
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
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black"
                                    }}
                                >
                                    {exp.company}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black"
                                    }}
                                >
                                    {exp.period}
                                </span>
                            </div>
                            {/* Bullet points for experience details */}
                            <ul style={{
                                marginTop: 0,
                                marginLeft: "70px",
                                marginRight: "70px",
                                paddingLeft: "20px",
                            }}>
                                {exp.details.map((detail, j) => (
                                    <li
                                        key={j}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleListChange("experience", i, "details", j, e)}
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "1.4",
                                            color: "black",
                                            marginBottom: "5px"
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
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            marginLeft: "70px",
                                            marginRight: "70px"
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
                                    company: "COMPANY NAME",
                                    period: "MONTH 20XX - PRESENT",
                                    details: ["Description of role and achievements..."]
                                })
                            }
                            style={{
                                color: "rgb(42 123 136)",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "70px",
                                marginRight: "70px"
                            }}
                        >
                            + Add Experience
                        </span>
                    )}
                </div>

                {/* Education */}
                <div style={{ marginBottom: "25px" }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("educationHeading", e)}
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "rgb(42 123 136)",
                            margin: "0 0 15px 0",
                            marginLeft: "70px",
                            marginRight: "70px"
                        }}
                    >
                        {resumeData.educationHeading}
                    </h3>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "10px" }}>
                            <div>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black",
                                        marginLeft: "70px"
                                    }}
                                >
                                    {edu.degree}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black"
                                    }}
                                >
                                    {edu.period}
                                </span>
                                {" | "}
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "black"
                                    }}
                                >
                                    {edu.college}
                                </span>
                            </div>
                            {isEditing && (
                                <div style={{ marginTop: 6 }}>
                                    <span
                                        onClick={() => removeItem("education", i)}
                                        style={{
                                            color: "red",
                                            fontSize: "16px",
                                            cursor: "pointer",
                                            marginLeft: "70px",
                                            marginRight: "70px"
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
                                    degree: "DEGREE NAME",
                                    period: "MONTH 20XX",
                                    college: "COLLEGE NAME, LOCATION"
                                })
                            }
                            style={{
                                color: "rgb(42 123 136)",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginLeft: "70px",
                                marginRight: "70px"
                            }}
                        >
                            + Add Education
                        </span>
                    )}
                </div>

                {/* Skills & Abilities */}
                <div style={{ marginBottom: "25px" }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("skillsHeading", e)}
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "rgb(42 123 136)",
                            margin: "0 0 15px 0",
                            marginLeft: "70px",
                            marginRight: "70px"
                        }}
                    >
                        {resumeData.skillsHeading}
                    </h3>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        marginLeft: "70px",
                        marginRight: "70px"
                    }}>
                        {resumeData.skills.map((skill, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                                <span style={{
                                    width: "4px",
                                    height: "4px",
                                    backgroundColor: "rgb(42 123 136)",
                                    borderRadius: "50%",
                                    marginRight: "8px",
                                    display: "inline-block"
                                }}></span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleSkillChange(i, e)}
                                    style={{
                                        fontSize: "16px",
                                        color: "black"
                                    }}
                                >
                                    {skill}
                                </span>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{
                                            marginLeft: "8px",
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
                    </div>
                    {isEditing && (
                        <span
                            onClick={() => addItem("skills", "New Skill")}
                            style={{
                                color: "rgb(42 123 136)",
                                cursor: "pointer",
                                fontSize: "16px",
                                display: "block",
                                marginTop: "10px",
                                marginLeft: "70px"
                            }}
                        >
                            + Add Skill
                        </span>
                    )}
                </div>

                {/* Activities and Interests */}
                <div>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("activitiesHeading", e)}
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "rgb(42 123 136)",
                            margin: "0 0 10px 0",
                            marginLeft: "70px",
                            marginRight: "70px"
                        }}
                    >
                        {resumeData.activitiesHeading}
                    </h3>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("activitiesContent", e)}
                        style={{
                            fontSize: "16px",
                            lineHeight: "1.4",
                            color: "black",
                            margin: 0,
                            marginLeft: "70px",
                            marginRight: "70px",
                            marginBottom: "30px"
                        }}
                    >
                        {resumeData.activitiesContent}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate;