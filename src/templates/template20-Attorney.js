import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate20 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "ALTA PARKS",
        role: "ATTORNEY",

        contactHeading: "CONTACT",
        contact: [
            "1407 Main Street",
            "Buffalo, New York 14201",
            "716.555.0300",
            "alta@example.com",
            "linkedin.com/in/altaparks"
        ],

        educationHeading: "EDUCATION",
        education: [
            {
                course: "JURIS DOCTOR",
                period: "JUNE 20XX",
                college: "Jasper University",
                location: "Manhattan, NYC, New York",
                details: "Plea Bargaining\nYr place in Moot Court"
            },
            {
                course: "B.A. IN POLITICAL SCIENCE",
                period: "JUNE 20XX",
                college: "Nixorf State College",
                location: "Small Town, Massachusetts",
                details: ""
            }
        ],

        skillsHeading: "KEY SKILLS",
        skills: [
            "Data analysis",
            "Client relations",
            "Legal writing",
            "Excellent communication",
            "Negotiation"
        ],

        interestsHeading: "INTERESTS",
        interests: [
            "Literature",
            "Environmental conservation",
            "Hiking",
            "Yoga",
            "Skiing",
            "Running"
        ],

        profileHeading: "PROFILE",
        profileContent: "Analytical, energetic, and detail-oriented attorney with broad and diverse knowledge of securities and real estate markets, including business formations, real estate transactions, distressed property, due diligence, permitting, zoning and lease negotiations, and litigation.",

        experienceHeading: "EXPERIENCE",
        experience: [
            {
                role: "IN-HOUSE COUNSEL",
                period: "MARCH 20XX – PRESENT",
                company: "Brothers Real Estate",
                location: "NYC, New York",
                details: "For boutique real estate development firm, draft, negotiate and perform leases and contracts of sale agreements. Negotiate commercial leases on behalf of ownership entity for retail establishments including foreclosures. Handle forfeited tenant leases, including lawsuits, evictions and lease modifications. Research, analyze and prepare briefs regarding statutory and case law. Draft motions and petitions to real estate and business development in the Northeast. Oversee due diligence on potential real estate purchases and developments. Work with outside counsel on litigation, permitting and due diligence matters."
            },
            {
                role: "LAW CLERK",
                period: "SEPT 20XX – NOV 20XX",
                company: "Luna Moines Law Firm",
                location: "NYC, New York",
                details: "Investigated and analyzed cases for small business, real estate, and landlord-tenant causes. Researched and analyzed a wide range of legal issues. Reconciled client in a corporate dissolution litigation. Wrote up the filing of motions supporting to 30 Amendment of corporation."
            },
            {
                role: "IN-HOUSE ASSOCIATE ATTORNEY",
                period: "SEPT 20XX – JAN 20XX",
                company: "Law Offices of Bella Alan",
                location: "NYC, New York",
                details: "Researched legal issues for senior counsel and assisted in representation of clients in a range of small business. Drafted legal memoranda. Second chair in a multi-million-dollar business case."
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

    const handleInterestChange = (index, e) => {
        const updated = [...resumeData.interests];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, interests: updated });
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
                fontFamily: "Arial, sans-serif",
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

                {/* Header Section - 10% height with peach background */}
                <div style={{
                    backgroundColor: "rgb(229 210 194)",
                    padding: "30px 40px",
                    minHeight: "80px"
                }}>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("fullName", e)}
                        style={{
                            fontSize: "70px",
                            color: "black",
                            margin: "0 0 5px 0",
                            letterSpacing: "1px",
                            marginTop: "30px",
                            marginLeft: "50px",
                            fontFamily: "Book Antiqua, sans-serif",
                        }}
                    >
                        {resumeData.fullName}
                    </p>
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("role", e)}
                        style={{
                            fontSize: "20px",
                            color: "black",
                            margin: 0,
                            letterSpacing: "0.5px",
                            marginLeft: "50px"
                        }}
                    >
                        {resumeData.role}
                    </p>
                </div>

                {/* Main Content - Two Columns */}
                <div style={{ display: "flex" }}>
                    {/* Left Column - 30% */}
                    <div style={{
                        width: "30%",
                        backgroundColor: "white",
                        marginLeft: "60px",
                        padding: "30px 25px",
                        borderRight: "2px solid rgb(229 210 194)"
                    }}>
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
                                    margin: "0 0 15px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.contactHeading}
                            </h3>
                            {resumeData.contact.map((contact, i) => (
                                <div key={i} style={{ marginBottom: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                                            Remove
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
                                        fontSize: "14px"
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
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.educationHeading}
                            </h3>
                            {resumeData.education.map((edu, i) => (
                                <div key={i} style={{ marginBottom: "20px" }}>
                                    <p style={{ 
                                        fontSize: "14px", 
                                        color: "black",
                                        margin: "0 0 3px 0",
                                        marginBottom: "15px",
                                         fontFamily: "Book Antiqua, sans-serif",
                                    }}>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("education", i, "course", e)}
                                        >
                                            {edu.course}
                                        </span>
                                        {" • "}
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                        >
                                            {edu.period}
                                        </span>
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "college", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: "0 0 3px 0",
                                            
                                        }}
                                    >
                                        {edu.college}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "location", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: "0 0 5px 0",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        {edu.location}
                                    </p>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0,
                                            whiteSpace: "pre-line",
                                            marginBottom: "30px"
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
                                            course: "DEGREE NAME",
                                            period: "MONTH 20XX",
                                            college: "College Name",
                                            location: "City, State",
                                            details: ""
                                        })
                                    }
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Education
                                </span>
                            )}
                        </div>

                        {/* Key Skills */}
                        <div style={{ marginBottom: "30px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("skillsHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.skillsHeading}
                            </h3>
                            {resumeData.skills.map((skill, i) => (
                                <div key={i} style={{ marginBottom: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleSkillChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0,
                                            flex: 1
                                        }}
                                    >
                                        {skill}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("skills", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginLeft: "5px"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("skills", "New Skill")}
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Skill
                                </span>
                            )}
                        </div>

                        {/* Interests */}
                        <div>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("interestsHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.interestsHeading}
                            </h3>
                            {resumeData.interests.map((interest, i) => (
                                <div key={i} style={{ marginBottom: "5px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleInterestChange(i, e)}
                                        style={{
                                            fontSize: "14px",
                                            color: "black",
                                            margin: 0,
                                            flex: 1
                                        }}
                                    >
                                        {interest}
                                    </p>
                                    {isEditing && (
                                        <span
                                            onClick={() => removeItem("interests", i)}
                                            style={{
                                                fontSize: "14px",
                                                color: "red",
                                                cursor: "pointer",
                                                marginLeft: "5px"
                                            }}
                                        >
                                            Remove
                                        </span>
                                    )}
                                </div>
                            ))}
                            {isEditing && (
                                <span
                                    onClick={() => addItem("interests", "New Interest")}
                                    style={{
                                        color: "blue",
                                        cursor: "pointer",
                                        fontSize: "14px"
                                    }}
                                >
                                    + Add Interest
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column - 70% */}
                    <div style={{
                        width: "70%",
                        backgroundColor: "white",
                        padding: "30px 40px"
                    }}>
                        {/* Profile */}
                        <div style={{ marginBottom: "30px" }}>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("profileHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 15px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.profileHeading}
                            </h3>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("profileContent", e)}
                                style={{
                                    fontSize: "14px",
                                    lineHeight: "1.4",
                                    color: "black",
                                    margin: "0 0 15px 0"
                                }}
                            >
                                {resumeData.profileContent}
                            </p>
                            {/* Horizontal line under profile */}
                            <div style={{
                                height: "2px",
                                backgroundColor: "rgb(229 210 194)",
                                width: "100%"
                            }}></div>
                        </div>

                        {/* Experience */}
                        <div>
                            <h3
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleChange("experienceHeading", e)}
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    color: "black",
                                    margin: "0 0 20px 0",
                                     fontFamily: "Book Antiqua, sans-serif",
                                }}
                            >
                                {resumeData.experienceHeading}
                            </h3>
                            {resumeData.experience.map((exp, i) => (
                                <div key={i} style={{ marginBottom: "25px" }}>
                                    <p style={{ 
                                        fontSize: "14px", 
                                        color: "black",
                                        margin: "0 0 3px 0",
                                         fontFamily: "Book Antiqua, sans-serif",
                                         marginBottom: "10px"
                                    }}>
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("experience", i, "role", e)}
                                        >
                                            {exp.role}
                                        </span>
                                        {" • "}
                                        <span
                                            contentEditable={isEditing}
                                            suppressContentEditableWarning={true}
                                            onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                        >
                                            {exp.period}
                                        </span>
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
                                        {" • "}
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
                                            role: "JOB TITLE",
                                            period: "MONTH 20XX – MONTH 20XX",
                                            company: "Company Name",
                                            location: "City, State",
                                            details: "Job description and achievements..."
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
        </div>
    );
};

export default ResumeTemplate20;