import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate3 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        firstName: "LISANDRO",
        lastName: "MILANESI",
        phone: "714-555-0100",
        website: "www.interestsights.com",
        email: "lisandro@example.com",
        profileHeading: "PROFILE",
        activitiesHeading: "ACTIVITIES AND INTERESTS",
        skillsHeading: "KEY SKILLS",
        experienceHeading: "WORK EXPERIENCE",
        educationHeading: "EDUCATION",
        profile:
            "Assistant Hotel Manager with a warm and friendly demeanor. Skilled at conflict resolution. Team builder who is acutely attentive to employee and guest needs. Punctual problem solver and avid multitasker. Track record of being an essential part of the management team and instrumental in providing effective solutions that produce immediate impact and contribute to the establishment’s long-term success.",
        activities: [
            "Surfing",
            "Scuba diving",
            "Snorkeling",
            "Craft beer",
            "Travel",
            "Great food",
            "Food Pantry Volunteer",
        ],
        skills: [
            "Budget management",
            "Excellent listener",
            "Friendly, courteous, & service oriented",
            "Poised under pressure",
            "Staff training & development",
            "Recruiting & hiring",
            "Conflict resolution",
            "Financial assurance",
        ],
        experience: [
            {
                role: "Assistant Hotel Manager",
                company: "The Rosehip Hotel | Seattle, WA",
                date: "20XX – Present",
                description:
                    "Supervise hotel staff. Improve staff performance through training, attention to detail, and empathetic problem-solving methods. Assist with the preparation of staff assessments. Resolve staff and guest conflicts in a professional and courteous manner. Inventory and order business supplies. Responsible for guest billing and settling payment disputes. Admin tasks as needed including bookings, check-ins, answering phones, responding to email, and social media inquiries.",
            },
            {
                role: "Assistant Hotel Manager",
                company: "The Seattle Sea Home | Seattle, WA",
                date: "20XX – 20XX",
                description:
                    "Supervised and trained hotel staff and resolved staff conflicts. Daily financial reporting. In charge of guest database and stays schedule. Point person for corporate client relations and reviewing guest feedback posted online. Worked with marketing team on campaign to increase guest bookings. Assisted accountant with accounting tasks. Handled in-person guest complaints.",
            },
        ],
        education: [
            "Bachelor of Science in Hospitality Management\nBellows College\nJune 20XX",
        ],
    });

    const resumeRef = useRef();

    const handleChange = (field, e) => {
        setResumeData({ ...resumeData, [field]: e.target.innerText });
    };

    // FIXED - handles both event and direct text
    const handleArrayChange = (field, index, valueOrEvent) => {
        const updated = [...resumeData[field]];
        const newValue =
            valueOrEvent?.target?.innerText ?? valueOrEvent; // fallback if it's direct string
        updated[index] = newValue;
        setResumeData({ ...resumeData, [field]: updated });
    };

    const addItem = (field, value) => {
        setResumeData({ ...resumeData, [field]: [...resumeData[field], value] });
    };

    const removeItem = (field, index) => {
        const updated = resumeData[field].filter((_, i) => i !== index);
        setResumeData({ ...resumeData, [field]: updated });
    };

    const handleDownload = () => {
        const buttons = document.querySelectorAll(".no-print");
        buttons.forEach((btn) => (btn.style.display = "none"));

        html2canvas(resumeRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("resume.pdf");

            buttons.forEach((btn) => (btn.style.display = "block"));
        });
    };

    return (
        <div style={{ fontFamily: "Century Gothic, sans-serif", padding: "20px", color: "black" }}>
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

                {/* Top Section */}
                <div style={{ display: "flex", backgroundColor: "#f2f2f2", height: "300px", alignItems: "center", padding: "20px" }}>
                    {/* Left Column - Name */}
                    <div style={{ width: "35%", textAlign: "left", marginLeft: "40px", marginTop: "40px" }}>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("firstName", e)}
                            style={{ margin: 0, fontSize: "50px" }}
                        >
                            {resumeData.firstName}
                        </p>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("lastName", e)}
                            style={{ margin: 0, fontSize: "50px" }}
                        >
                            {resumeData.lastName}
                        </p>
                    </div>

                    {/* Right Column - Contact + Profile */}
                    <div style={{ width: "65%", padding: "30px" }}>
                        <p style={{ fontSize: "14px", display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
                            <span contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("phone", e)}>{resumeData.phone}</span>
                            <span contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("website", e)}>{resumeData.website}</span>
                            <span contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("email", e)}>{resumeData.email}</span>
                        </p>
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("profileHeading", e)}
                            style={{ marginTop: "15px", color: "grey", fontSize: "16px", fontWeight: "bold" }}
                        >
                            {resumeData.profileHeading}
                        </p>
                        <p contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={(e) => handleChange("profile", e)} style={{ fontSize: "14px", whiteSpace: "pre-line" }}>
                            {resumeData.profile}
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={{ display: "flex", padding: "20px", marginLeft: "40px" }}>
                    {/* Left Column */}
                    <div style={{ width: "35%", paddingRight: "20px" }}>
                        {/* Activities */}
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("activitiesHeading", e)}
                            style={{ borderBottom: "1px solid black", paddingBottom: "10px", width: "80%", color: "grey", fontSize: "16px", fontWeight: "bold" }}
                        >
                            {resumeData.activitiesHeading}
                        </p>
                        <ul style={{ fontSize: "14px", color: "grey" }}>
                            {resumeData.activities.map((a, i) => (
                                <li
                                    key={i}
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleArrayChange("activities", i, e)}
                                >
                                    {a}
                                    {isEditing && (
                                        <span onClick={() => removeItem("activities", i)} style={{ color: "red", fontSize: "12px", cursor: "pointer", marginLeft: "5px" }}>
                                            Remove
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {isEditing && <span onClick={() => addItem("activities", "New Activity")} style={{ color: "blue", cursor: "pointer", fontSize: "12px" }}>+ Add Activity</span>}

                        {/* Skills */}
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("skillsHeading", e)}
                            style={{ borderBottom: "1px solid black", marginTop: "20px", paddingBottom: "10px", width: "80%", color: "grey", fontSize: "16px", fontWeight: "bold" }}
                        >
                            {resumeData.skillsHeading}
                        </p>
                        <ul style={{ fontSize: "14px", color: "grey" }}>
                            {resumeData.skills.map((s, i) => (
                                <li
                                    key={i}
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleArrayChange("skills", i, e)}
                                >
                                    {s}
                                    {isEditing && (
                                        <span onClick={() => removeItem("skills", i)} style={{ color: "red", fontSize: "12px", cursor: "pointer", marginLeft: "5px" }}>
                                            Remove
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {isEditing && <span onClick={() => addItem("skills", "New Skill")} style={{ color: "blue", cursor: "pointer", fontSize: "12px" }}>+ Add Skill</span>}
                    </div>

                    {/* Right Column */}
                    <div style={{ width: "65%" }}>
                        {/* Experience */}
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("experienceHeading", e)}
                            style={{ borderBottom: "1px solid black", paddingBottom: "10px", width: "95%", fontSize: "16px", fontWeight: "bold", color: "grey" }}
                        >
                            {resumeData.experienceHeading}
                        </p>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} style={{ marginBottom: "30px", fontSize: "14px" }}>
                                <div>
                                    <strong
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleArrayChange("experience", i, { ...exp, role: e.target.innerText })}
                                    >
                                        {exp.role}
                                    </strong>
                                </div>
                                <div>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleArrayChange("experience", i, { ...exp, company: e.target.innerText })}
                                    >
                                        {exp.company}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleArrayChange("experience", i, { ...exp, date: e.target.innerText })}
                                        style={{ fontSize: "14px", fontStyle: "italic" }}
                                    >
                                        {exp.date}
                                    </span>
                                </div>
                                <p
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleArrayChange("experience", i, { ...exp, description: e.target.innerText })}
                                >
                                    {exp.description}
                                </p>
                                {isEditing && <span onClick={() => removeItem("experience", i)} style={{ color: "red", fontSize: "14px", cursor: "pointer" }}>Remove</span>}
                            </div>
                        ))}
                        {isEditing && <span onClick={() => addItem("experience", { role: "New Role", company: "New Company", date: "Date", description: "Description" })} style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}>+ Add Experience</span>}

                        {/* Education */}
                        <p
                            contentEditable={isEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) => handleChange("educationHeading", e)}
                            style={{ borderBottom: "1px solid black", marginTop: "20px", paddingBottom: "10px", fontSize: "16px", fontWeight: "bold", width: "95%", color: "grey" }}
                        >
                            {resumeData.educationHeading}
                        </p>
                        {resumeData.education.map((edu, i) => {
                            const [degree, college, date] = edu.split("\n");
                            return (
                                <div key={i} style={{ marginBottom: "10px", width: "95%" }}>
                                    <p
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) => handleArrayChange("education", i, e)}
                                        style={{ fontSize: "14px", margin: 0 }}
                                    >
                                        <strong>{degree}</strong>
                                        <br />
                                        {college}
                                        <br />
                                        <span>{date}</span>
                                    </p>
                                    {isEditing && <span onClick={() => removeItem("education", i)} style={{ color: "red", fontSize: "14px", cursor: "pointer", marginLeft: "5px" }}>Remove</span>}
                                </div>
                            );
                        })}
                        {isEditing && <span onClick={() => addItem("education", "Degree Name\nCollege Name\nDate")} style={{ color: "blue", cursor: "pointer", fontSize: "14px" }}>+ Add Education</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate3;
