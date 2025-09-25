import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate11 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "Danielle Brasseur",
        phone: "592.555.0102",
        email: "danielle@example.com",
        location: "San Francisco, CA",

        objectiveHeading: "Objective",
        objectiveContent: "To obtain a challenging position as a server in a fine dining establishment where my skills and experience can be utilized to provide exceptional dining experiences for guests.",

        educationHeading: "Education",
        education: [
            {
                school: "Mount Flores College",
                degree: "Bachelor's Degree",
                specialization: "Hospitality Management",
                period: "May 20XX"
            }
        ],

        awardsHeading: "Awards & acknowledgments",
        awards: [
            "Consistently received positive feedback from guests, resulting in repeat business and increased revenue for the restaurant.",
            "Successfully completed training in wine knowledge and service, as well as proper dining etiquette and service techniques."
        ],

        experienceHeading: "Experience",
        experience: [
            {
                role: "Fine Dining Server",
                company: "Halo Restaurant",
                location: "San Francisco, CA",
                period: "January 20XX - December 20XX",
                details: [
                    "Provided exemplary service to guests in a high-end restaurant setting, including recommending wine pairings and making menu suggestions",
                    "Maintained knowledge of seasonal menus and specials, as well as dietary restrictions and preferences of guests"
                ]
            },
            {
                role: "Lead Server",
                company: "Le Bel Escargot",
                location: "San Francisco, CA",
                period: "June 20XX - January 20XX",
                details: [
                    "Assisted in opening and closing duties, including setting up and breaking down tables, managing reservations, and cash handling",
                    "Trained new employees on detail in accurately taking and delivering orders, including ensuring customer satisfaction"
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

    const handleListChange = (section, index, listKey, listIndex, e) => {
        const updated = [...resumeData[section]];
        const list = [...(updated[index][listKey] || [])];
        list[listIndex] = e.target.innerText;
        updated[index] = { ...updated[index], [listKey]: list };
        setResumeData({ ...resumeData, [section]: updated });
    };

    const handleAwardChange = (index, e) => {
        const updated = [...resumeData.awards];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, awards: updated });
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
                        backgroundColor: "#6a6b6dff",
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
                        backgroundColor: "#6a6b6dff",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        cursor: "pointer"
                    }}
                >
                    Download
                </button>

                {/* Top Header - Black Background with Name */}
                <div style={{
                    backgroundColor: "black",
                    padding: "25px 40px",
                    paddingTop: "100px",
                    marginBottom: "20px"
                }}>
                    <h1
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("fullName", e)}
                        style={{
                            fontSize: "60px",
                            fontWeight: "bold",
                            color: "white",
                            margin: 0,
                            marginLeft: "70px"
                        }}
                    >
                        {resumeData.fullName}
                    </h1>
                </div>

                {/* Contact Details */}
                <div style={{
                    fontSize: "16px",
                    color: "black",
                    marginBottom: "20px",
                    marginTop: "50px",
                    marginLeft: "70px",
                    marginRight: "70px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 40px"
                }}>
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
                        onBlur={(e) => handleChange("location", e)}
                    >
                        {resumeData.location}
                    </span>
                </div>

                {/* Black horizontal line */}
                <div style={{
                    height: "2px",
                    backgroundColor: "black",
                    marginTop: "50px",
                    marginBottom: "30px",
                    marginLeft: "100px",
                    marginRight: "100px"
                }}></div>

                {/* Objective Section */}
                <div style={{
                    marginBottom: "25px",
                    padding: "0 40px",
                    marginLeft: "70px",
                    marginRight: "70px"
                }}>
                    <h3
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("objectiveHeading", e)}
                        style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "black",
                            margin: "0 0 10px 0"
                        }}
                    >
                        {resumeData.objectiveHeading}
                    </h3>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("objectiveContent", e)}
                        style={{
                            fontSize: "16px",
                            lineHeight: "1.4",
                            color: "black",
                            margin: 0
                        }}
                    >
                        {resumeData.objectiveContent}
                    </p>
                </div>

                {/* Two Column Layout */}
                <div style={{
                    display: "flex",
                    padding: "0 40px",
                    gap: "30px"
                }}>
                    {/* Left Column - 30% */}
                    <div style={{ width: "30%" }}>
                        {/* Education */}
                        <div style={{ marginBottom: "35px", marginLeft: "70px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("educationHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                    marginBottom: "30px"
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
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 5px 0"
                                        }}
                                    >
                                        {edu.school}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "degree", e)}
                                        style={{
                                            fontSize: "16px",
                                            color: "black",
                                            margin: "0 0 5px 0"
                                        }}
                                    >
                                        {edu.degree}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "specialization", e)}
                                        style={{
                                            fontSize: "16px",
                                            color: "black",
                                            margin: "0 0 5px 0"
                                        }}
                                    >
                                        {edu.specialization}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        style={{
                                            fontSize: "16px",
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
                                            degree: "Degree Name",
                                            specialization: "Specialization",
                                            period: "Month 20XX"
                                        })
                                    }
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "16px"
                                    }}
                                >
                                    + Add Education
                                </span>
                            )}
                        </div>

                        {/* Awards & Acknowledgments */}
                        <div style={{ marginBottom: "25px", marginLeft: "70px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("awardsHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.awardsHeading}
                            </h3>
                            {resumeData.awards.map((award, i) => (
                                <div key={i} style={{ marginBottom: "10px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleAwardChange(i, e)}
                                        style={{
                                            fontSize: "16px",
                                            lineHeight: "1.4",
                                            color: "black",
                                            margin: 0
                                        }}
                                    >
                                        {award}
                                    </p>
                                    {isEditing && (
                                        <div style={{ marginTop: 6 }}>
                                            <span
                                                onClick={() => removeItem("awards", i)}
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
                                    onClick={() => addItem("awards", "New award or acknowledgment")}
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "16px"
                                    }}
                                >
                                    + Add Award
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - 70% */}
                    <div style={{ width: "70%" }}>
                        {/* Experience */}
                        <div style={{ marginBottom: "25px", marginLeft: "160px", marginRight: "70px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("experienceHeading", e)}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                    marginBottom: "30px"
                                }}
                            >
                                {resumeData.experienceHeading}
                            </h3>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: "40px" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: "black",
                                            margin: "0 0 3px 0"
                                        }}
                                    >
                                        {exp.role}
                                    </p>
                                    <p style={{
                                        fontSize: "16px",
                                        color: "black",
                                        margin: "0 0 3px 0"
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
                                            margin: "0 0 10px 0"
                                        }}
                                    >
                                        {exp.period}
                                    </p>

                                    {/* Bullet points for experience details */}
                                    <ul style={{
                                        marginTop: 0,
                                        paddingLeft: "15px"
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
                                            location: "City, State",
                                            period: "Month 20XX - Month 20XX",
                                            details: ["Description of role and achievements..."]
                                        })
                                    }
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "16px"
                                    }}
                                >
                                    + Add Experience
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Black Footer - 5% height */}
                <div style={{
                    backgroundColor: "black",
                    height: "30px",
                    marginTop: "30px"
                }}></div>
            </div>
        </div>
    );
};

export default ResumeTemplate11;