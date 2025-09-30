import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate19 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        firstName: "Mira",
        lastName: "Karlsson",
        role: "Social Media Marketing Specialist",

        contactHeading: "Contact",
        contact: ["816-555-0146", "mira@example.com", "www.example.com"],

        profileHeading: "Profile",
        profileContent:
            "Social Media Marketing Specialist, utilizing my 5+ years of experience in creating and executing successful social media campaigns, developing engaging content, analyzing and reporting on campaign performance, and staying up to date with the latest trends and best practices in social media marketing. My goal is to increase brand awareness, engagement, and conversion rates while delivering exceptional results and exceeding goals for the company.",

        skillsHeading: "Skills",
        skills: [
            "Platform expertise",
            "Content creation",
            "Analytics",
            "Communication",
            "Creativity",
            "Strategic thinking",
        ],

        educationHeading: "Education",
        education: [
            { college: "Bellvue College", period: "20XX-20YY", course: "BA in Communications" },
            { college: "East Beringer Community College", period: "20XX-20YY", course: "AA in Communications" },
        ],

        experienceHeading: "Experience",
        experience: [
            {
                role: "Social Media Marketing Specialist",
                period: "20XX-20YY",
                details:
                    "Developed and executed successful social media campaigns across multiple platforms to increase brand awareness and drive traffic to the company's website. Managed and grew the company's social media accounts by creating engaging content, monitoring analytics, and implementing social media best practices. Collaborated with cross-functional teams to develop and execute integrated marketing campaigns that leveraged social media to meet business objectives.",
            },
            {
                role: "Digital Marketing Manager",
                period: "20XX-20YY",
                details:
                    "Led the development and implementation of the company's digital marketing strategy, including social media marketing, email marketing, and paid advertising. Analyzed and reported on the performance of digital marketing campaigns, using data-driven insights to optimize and improve campaign effectiveness.",
            },
            {
                role: "Digital Marketing Manager",
                period: "20XX-20YY",
                details:
                    "Led the development and implementation of the company's digital marketing strategy, including social media marketing, email marketing, and paid advertising. Analyzed and reported on the performance of digital marketing campaigns, using data-driven insights to optimize and improve campaign effectiveness.",
            },
        ],
    });

    const resumeRef = useRef();

    const handleChange = (field, e) =>
        setResumeData({ ...resumeData, [field]: e.target.innerText });

    const handleNestedChange = (section, index, key, e) => {
        const updated = [...resumeData[section]];
        updated[index] = { ...updated[index], [key]: e.target.innerText };
        setResumeData({ ...resumeData, [section]: updated });
    };

    const handleListChange = (section, index, e) => {
        const updated = [...resumeData[section]];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, [section]: updated });
    };

    const addItem = (section, newItem) =>
        setResumeData({ ...resumeData, [section]: [...resumeData[section], newItem] });

    const removeItem = (section, index) =>
        setResumeData({ ...resumeData, [section]: resumeData[section].filter((_, i) => i !== index) });

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
        <div style={{ fontFamily: "Century Gothic, sans-serif", padding: "20px", backgroundColor: "#f0f0f0" }}>
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

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "20px", marginLeft: "70px", marginRight: "70px" }}>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("firstName", e)}
                        style={{ fontSize: "50px", margin: "0", marginTop: "70px", marginBottom: "20px" }}
                    >
                        {resumeData.firstName} {resumeData.lastName}
                    </p>
                    <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "8px", width: "100%" }}></div>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("role", e)}
                        style={{ fontSize: "18px", margin: "15px 0 15px 0" }}
                    >
                        {resumeData.role}
                    </p>
                    
                    <div style={{ height: "1px", backgroundColor: "#000", width: "100%" }}></div>
                </div>

                {/* Second Section */}
                <div style={{ display: "flex", marginTop: "30px", marginBottom: "40px", marginLeft:"70px", marginRight: "70px" }}>
                    {/* Left - Contact */}
                    <div style={{ width: "20%", paddingRight: "20px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)}
                            style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}
                        >
                            {resumeData.contactHeading}
                        </h3>
                        <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "5px", width: "100px" }}></div>
                        {resumeData.contact.map((contact, i) => (
                            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleListChange("contact", i, e)}
                                    style={{ fontSize: "14px", margin: 0 }}
                                >
                                    {contact}
                                </p>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("contact", i)}
                                        style={{ color: "red", cursor: "pointer", fontSize: "14px", marginLeft: "5px" }}
                                    >
                                        Remove
                                    </span>
                                )}
                            </div>
                        ))}
                        {isEditing && (
                            <span
                                onClick={() => addItem("contact", "New Contact")}
                                style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
                            >
                                + Add Contact
                            </span>
                        )}
                    </div>

                    {/* Right - Profile */}
                    <div style={{ width: "80%", marginLeft: "50px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("profileHeading", e)}
                            style={{ fontSize: "16px", marginBottom: "15px" }}
                        >
                            {resumeData.profileHeading}
                        </h3>
                        <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "5px", width: "100px" }}></div>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("profileContent", e)}
                            style={{ fontSize: "14px", margin: 0 }}
                        >
                            {resumeData.profileContent}
                        </p>
                    </div>
                </div>

                {/* Third Section */}
                <div style={{ display: "flex", marginTop: "20px", marginLeft: "70px", marginRight: "70px" }}>
                    {/* Left Column - Skills + Education */}
                    <div style={{ width: "20%", paddingRight: "20px" }}>
                        {/* Skills */}
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{ fontSize: "16px", marginBottom: "15px" }}
                        >
                            {resumeData.skillsHeading}
                        </h3>
                        <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "5px", width: "100px" }}></div>
                        <ul style={{ paddingLeft: "15px", margin: 0 }}>
                            {resumeData.skills.map((skill, i) => (
                                <li key={i} style={{ marginBottom: "3px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleListChange("skills", i, e)}
                                        style={{fontSize: "14px"}}
                                    >
                                        {skill}
                                    </span>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("skills", i)}
                                            style={{ marginLeft: "5px", color: "red", cursor: "pointer", fontSize: "14px" }}
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
                                style={{ color: "blue", cursor: "pointer", fontSize: "14px", display: "block", marginTop: "5px" }}
                            >
                                + Add Skill
                            </span>
                        )}

                        {/* Education */}
                        <div style={{ marginTop: "30px" }}>
                            <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{ fontSize: "16px", marginBottom: "15px" }}
                        >
                            {resumeData.educationHeading}
                        </h3>
                            <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "5px", width: "100px" }}></div>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "10px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                        style={{ fontSize: "14px", margin: 0, marginBottom: "5px" }}
                                    >
                                        {edu.college}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{ fontSize: "14px", margin: "0", fontWeight: "bold" }}
                                    >
                                        {edu.period}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                        style={{ fontSize: "14px", margin: "0" }}
                                    >
                                        {edu.course}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("education", i)}
                                            style={{ color: "red", cursor: "pointer", fontSize: "14px" }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() =>
                                        addItem("education", { college: "New College", period: "20XX-20YY", course: "Course Name" })
                                    }
                                    style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
                                >
                                    + Add Education
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Experience */}
                    <div style={{ width: "80%", marginLeft: "50px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{ fontSize: "16px", marginBottom: "15px" }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                        <div style={{ height: "1px", backgroundColor: "#000", marginBottom: "5px", width: "100px" }}></div>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "40px" }}>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                    style={{ fontSize: "14px", margin: 0 }}
                                >
                                    {exp.role}
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                    style={{ fontWeight: "bold", fontSize: "14px", margin: 0 }}
                                >
                                    {exp.period}
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "details", e)}
                                    style={{ fontSize: "14px", lineHeight: "1.4" }}
                                >
                                    {exp.details}
                                </p>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("experience", i)}
                                        style={{ color: "red", cursor: "pointer", fontSize: "14px" }}
                                    >
                                        Remove
                                    </span>
                                )}
                            </div>
                        ))}
                        {isEditing && (
                            <span
                                onClick={() =>
                                    addItem("experience", { role: "New Role", period: "20XX-20YY", details: "Job description" })
                                }
                                style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}
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

export default ResumeTemplate19;
