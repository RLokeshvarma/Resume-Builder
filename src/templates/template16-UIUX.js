import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate16 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        firstName: "Manasi",
        lastName: "Goyal",
        title: "UI/UX DESIGNER",
        summary: "I am passionate about designing game experiences that are both visually stunning and intuitive, and always strive to create designs that delight and engage users.",

        objectiveHeading: "OBJECTIVE",
        objectiveContent: "To obtain a challenging UI/UX Designer position where I can use my expertise in user experience design and interface to contribute my creative skills and experience.",

        contactHeading: "CONTACT",
        contact: [
            "jordan@example.com",
            "www.myexample.com",
            "718-555-0175",
            "New York City, NY"
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                course: "SCHOOL OF FINE ART",
                school: "BFA, Graphic Design",
                period: "20XX"
            }
        ],

        skillsHeading: "SKILLS",
        skills: [
            "UI/UX design",
            "User research",
            "Usability testing",
            "Wireframing",
            "Product management"
        ],

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "SENIOR UI/UX DESIGNER",
                company: "PROSAWARE, INC.",
                period: "March 20XX - Present",
                details: "Managed the design team and mentored junior designers to improve design quality and efficiency. Created user-friendly design, responsive design, mobile applications that boosted user interaction across web and mobile platforms. Led social media research that resulted in over 75% increase in social media brand interactions."
            },
            {
                role: "UI/UX DESIGNER",
                company: "PROSAWARE, INC.",
                period: "Oct 20XX - March 20XX",
                details: "Led the redesign of the company's e-commerce platform, resulting in a 40% increase in conversion rates and user satisfaction. Conducted user research and developed user personas to inform design decisions and improve the user experience. Collaborated with development teams to deliver efficient and usable design solutions."
            },
            {
                role: "UI/UX DESIGNER",
                company: "RELECLOUD",
                period: "June 20XX - Sept 20XX",
                details: "Conducted user research and developed user personas to inform design decisions and improve the user experience. Collaborated with development team to ensure design-to-development handoff and industry standard. Worked closely with the development team to ensure designs were implemented accurately and efficiently."
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

                {/* Left Column - Light Blue Background */}
                <div style={{
                    width: "30%",
                    backgroundColor: "#D5CAE0",
                    padding: "60px 30px 40px 30px"
                }}>
                    {/* Objective */}
                    <div style={{ marginBottom: "40px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("objectiveHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0",
                                marginTop: "20px"
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
                                margin: 0
                            }}
                        >
                            {resumeData.objectiveContent}
                        </p>
                    </div>

                    {/* Contact */}
                    <div style={{ marginBottom: "30px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("contactHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
                            }}
                        >
                            {resumeData.contactHeading}
                        </h3>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                            {resumeData.contact.map((contact, i) => (
                                <li key={i} style={{ marginBottom: "5px" }}>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleContactChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black"
                                        }}
                                    >
                                        {contact}
                                    </span>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("contact", i)}
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
                                onClick={() => addItem("contact", "New Contact")}
                                style={{
                                    color: "#666",
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

                    {/* Education */}
                    <div style={{ marginBottom: "30px" }}>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{
                                fontSize: "18px",
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
                                    onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                    style={{
                                        fontSize: "14px",
                                        color: "black",
                                        margin: "0 0 3px 0"
                                    }}
                                >
                                    {edu.course}
                                </p>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "school", e)}
                                    style={{
                                        fontSize: "14px",
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
                                        course: "School Name",
                                        school: "Course Name, Specialization",
                                        period: "20XX"
                                    })
                                }
                                style={{
                                    color: "#666",
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
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 15px 0"
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
                                    color: "#666",
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

                {/* Right Column - White Background */}
                <div style={{
                    width: "70%",
                    backgroundColor: "white",
                    padding: "60px 40px 40px 40px"
                }}>
                    {/* Name & Title */}
                    <div style={{ marginBottom: "30px", marginTop: "10px" }}>
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
                            style={{ margin: 0, fontSize: "60px", fontWeight: "bold", marginBottom: "10px" }}
                        >
                            {resumeData.lastName}
                        </p>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("title", e)}
                            style={{
                                fontSize: "20px",
                                color: "black",
                                margin: "0 0 40px 0",
                                fontWeight: "bold"
                            }}
                        >
                            {resumeData.title}
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

                    {/* Horizontal Line */}
                    <div style={{
                        height: "1px",
                        backgroundColor: "black",
                        marginBottom: "30px"
                    }}></div>

                    {/* Experience */}
                    <div>
                        <h3
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "black",
                                margin: "0 0 20px 0"
                            }}
                        >
                            {resumeData.experienceHeading}
                        </h3>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "30px" }}>
                                <div style={{ marginBottom: "5px" }}>
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
                                    <span style={{ margin: "0 5px" }}></span>
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
                                        margin: "0 0 15px 0"
                                    }}
                                >
                                    {exp.details}
                                </p>
                                
                                {/* 70% width horizontal line divider - only if not the last item */}
                                {i < resumeData.experience.length - 1 && (
                                    <div style={{
                                        height: "1px",
                                        backgroundColor: "black",
                                        width: "70%",
                                        marginBottom: "15px"
                                    }}></div>
                                )}

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
                                        period: "Month 20XX - Present",
                                        details: "Job description and achievements..."
                                    })
                                }
                                style={{
                                    color: "#A594C4",
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

export default ResumeTemplate16;