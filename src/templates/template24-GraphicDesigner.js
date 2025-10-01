import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumeTemplate24 = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [resumeData, setResumeData] = useState({
        fullName: "SEEMA CHAUDHRY",
        role: "Graphic Designer",

        contact: {
            phone: { value: "816-555-0146", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0zIDUuNUMzIDE0LjA2MDQgOS45Mzk1OSAyMSAxOC41IDIxQzE4Ljg4NjIgMjEgMTkuMjY5MSAyMC45ODU5IDE5LjY0ODMgMjAuOTU4MUMyMC4wODM0IDIwLjkyNjIgMjAuMzAwOSAyMC45MTAzIDIwLjQ5OSAyMC43OTYzQzIwLjY2MyAyMC43MDE5IDIwLjgxODUgMjAuNTM0NSAyMC45MDA3IDIwLjM2NEMyMSAyMC4xNTgyIDIxIDE5LjkxODEgMjEgMTkuNDM4VjE2LjYyMDdDMjEgMTYuMjE2OSAyMSAxNi4wMTUgMjAuOTMzNSAxNS44NDJDMjAuODc0OSAxNS42ODkxIDIwLjc3OTUgMTUuNTUzIDIwLjY1NTkgMTUuNDQ1NkMyMC41MTYgMTUuMzI0IDIwLjMyNjIgMTUuMjU1IDE5Ljk0NjggMTUuMTE3TDE2Ljc0IDEzLjk1MDlDMTYuMjk4NSAxMy43OTA0IDE2LjA3NzcgMTMuNzEwMSAxNS44NjgzIDEzLjcyMzdDMTUuNjgzNiAxMy43MzU3IDE1LjUwNTkgMTMuNzk4OCAxNS4zNTQ5IDEzLjkwNThDMTUuMTgzNyAxNC4wMjcxIDE1LjA2MjkgMTQuMjI4NSAxNC44MjEyIDE0LjYzMTRMMTQgMTZDMTEuMzUwMSAxNC43OTk5IDkuMjAxOSAxMi42NDg5IDggMTBMOS4zNjg2MyA5LjE3ODgyQzkuNzcxNDUgOC45MzcxMyA5Ljk3Mjg2IDguODE2MjggMTAuMDk0MiA4LjY0NTA2QzEwLjIwMTIgOC40OTQwOCAxMC4yNjQzIDguMzE2MzcgMTAuMjc2MyA4LjEzMTdDMTAuMjg5OSA3LjkyMjI3IDEwLjIwOTYgNy43MDE1MyAxMC4wNDkxIDcuMjYwMDVMOC44ODI5OSA0LjA1MzIxQzguNzQ1IDMuNjczNzYgOC42NzYwMSAzLjQ4NDAzIDguNTU0NDIgMy4zNDQxQzguNDQ3MDEgMy4yMjA0OSA4LjMxMDg5IDMuMTI1MTUgOC4xNTgwMiAzLjA2NjQ1QzcuOTg0OTYgMyA3Ljc4MzA4IDMgNy4zNzkzMiAzSDQuNTYyMDFDNC4wODE4OCAzIDMuODQxODEgMyAzLjYzNTk4IDMuMDk5MjVDMy40NjU1IDMuMTgxNDYgMy4yOTgxNCAzLjMzNzAxIDMuMjAzNyAzLjUwMTAzQzMuMDg5NjggMy42OTkwNyAzLjA3Mzc1IDMuOTE2NjIgMy4wNDE4OSA0LjM1MTczQzMuMDE0MTMgNC43MzA4NiAzIDUuMTEzNzggMyA1LjVaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4=" },
            location: { value: "123 Anywhere St., Any City", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMiAyMUMxNS41IDE3LjQgMTkgMTQuMTc2NCAxOSAxMC4yQzE5IDYuMjIzNTUgMTUuODY2IDMgMTIgM0M4LjEzNDAxIDMgNSA2LjIyMzU1IDUgMTAuMkM1IDE0LjE3NjQgOC41IDE3LjQgMTIgMjFaIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8cGF0aCBkPSJNMTIgMTNDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdDMTAuMzQzMSA3IDkgOC4zNDMxNSA5IDEwQzkgMTEuNjU2OSAxMC4zNDMxIDEzIDEyIDEzWiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPC9zdmc+" },
            email: { value: "hansson@example.com", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik00IDcuMDAwMDVMMTAuMiAxMS42NUMxMS4yNjY3IDEyLjQ1IDEyLjczMzMgMTIuNDUgMTMuOCAxMS42NUwyMCA3IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8cmVjdCB4PSIzIiB5PSI1IiB3aWR0aD0iMTgiIGhlaWdodD0iMTQiIHJ4PSIyIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+DQo8L3N2Zz4=" },
            website: { value: "www.example.com", icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik00IDE1TDIwIDE1IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8cGF0aCBkPSJNNCA5TDIwIDkiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjkiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik0xMi4wMDA0IDIwLjgxODJMMTEuMjg2MiAyMS41MTgxQzExLjQ3NDIgMjEuNzEwMSAxMS43MzE3IDIxLjgxODIgMTIuMDAwNCAyMS44MTgyQzEyLjI2OTEgMjEuODE4MiAxMi41MjY1IDIxLjcxMDEgMTIuNzE0NiAyMS41MTgxTDEyLjAwMDQgMjAuODE4MlpNMTIuMDAwNCAzLjE4MTg4TDEyLjcxNDYgMi40ODE5OEMxMi41MjY1IDIuMjkwMDUgMTIuMjY5MSAyLjE4MTg4IDEyLjAwMDQgMi4xODE4OEMxMS43MzE3IDIuMTgxODggMTEuNDc0MiAyLjI5MDA1IDExLjI4NjEgMi40ODE5OEwxMi4wMDA0IDMuMTgxODhaTTE0LjYwMDQgMTIuMDAwMUMxNC42MDA0IDE1LjE2MTEgMTMuMzM3MyAxOC4wMjUxIDExLjI4NjIgMjAuMTE4M0wxMi43MTQ2IDIxLjUxODFDMTUuMTE3MyAxOS4wNjYyIDE2LjYwMDQgMTUuNzA1MyAxNi42MDA0IDEyLjAwMDFIMTQuNjAwNFpNMTEuMjg2MSAzLjg4MTc4QzEzLjMzNzMgNS45NzUwMSAxNC42MDA0IDguODM5MDMgMTQuNjAwNCAxMi4wMDAxSDE2LjYwMDRDMTYuNjAwNCA4LjI5NDc4IDE1LjExNzMgNC45MzM4OSAxMi43MTQ2IDIuNDgxOThMMTEuMjg2MSAzLjg4MTc4Wk05LjQwMDM5IDEyLjAwMDFDOS40MDAzOSA4LjgzOTAzIDEwLjY2MzQgNS45NzUwMSAxMi43MTQ2IDMuODgxNzhMMTEuMjg2MSAyLjQ4MTk4QzguODgzNDcgNC45MzM4OSA3LjQwMDM5IDguMjk0NzggNy40MDAzOSAxMi4wMDAxSDkuNDAwMzlaTTEyLjcxNDYgMjAuMTE4M0MxMC42NjM0IDE4LjAyNTEgOS40MDAzOSAxNS4xNjExIDkuNDAwMzkgMTIuMDAwMUg3LjQwMDM5QzcuNDAwMzkgMTUuNzA1MyA4Ljg4MzQ4IDE5LjA2NjIgMTEuMjg2MiAyMS41MTgxTDEyLjcxNDYgMjAuMTE4M1oiIGZpbGw9IiMwMDAwMDAiLz4NCjwvc3ZnPg==" }
        },

        aboutHeading: "ABOUT ME",
        about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

        educationHeading: "EDUCATION",
        education: [
            {
                university: "RIMBERIO UNIVERSITY",
                period: "2019-2023",
                details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
                university: "RIMBERIO UNIVERSITY",
                period: "2018-2019",
                details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
        ],

        skillsHeading: "SKILL",
        skills: [
            "Lorem Design Software",
            "Digital Illustration",
            "Visual Imagination",
            "Communication",
            "Typography",
            "UI/UX Design"
        ],

        experienceHeading: "WORK EXPERIENCE",
        experience: [
            {
                company: "Aldenaria&Partners",
                role: "Graphic Designer",
                period: "2024-NOW",
                overview:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                ]
            },
            {
                company: "Thynk Unlimited",
                role: "Graphic Designer",
                period: "2019-2023",
                overview:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                ]
            },
            {
                company: "Wardarc Inc",
                role: "Graphic Designer",
                period: "2018-2019",
                overview:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
                details: [
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                ]
            }
        ]
    });

    const resumeRef = useRef();

    // ====== HANDLERS ======
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

    const handleContactChange = (index, e) => {
        const updated = [...resumeData.contact];
        updated[index] = e.target.innerText;
        setResumeData({ ...resumeData, contact: updated });
    };

    const addItem = (field, newItem) =>
        setResumeData({ ...resumeData, [field]: [...resumeData[field], newItem] });

    const removeItem = (field, index) =>
        setResumeData({
            ...resumeData,
            [field]: resumeData[field].filter((_, i) => i !== index)
        });

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

    // ====== JSX ======
    return (
        <div
            style={{
                fontFamily: "Century Gothic, sans-serif",
                padding: "20px",
                backgroundColor: "#f9f9f9"
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

                {/* Header Section */}
                <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("fullName", e)}
                    style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "0px", marginTop: "70px", marginLeft: "30px" }}
                >
                    {resumeData.fullName}
                </p>
                <p
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleChange("role", e)}
                    style={{ fontSize: "18px", marginBottom: "15px", marginLeft: "30px", marginTop: "10px" }}
                >
                    {resumeData.role}
                </p>

                {/* Contact Row */}
                <div
                    style={{
                        backgroundColor: "#9bbaccff",
                        padding: "10px 15px",
                        color: "black",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "13px",
                        marginBottom: "25px",
                    }}
                >
                    {Object.entries(resumeData.contact).map(([key, item], i, arr) => (
                        <React.Fragment key={key}>
                            {/* Contact Item */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                    textAlign: "center",
                                }}
                            >
                                {/* 👇 Icon before text */}
                                <img
                                    src={item.icon}
                                    alt={`${key} icon`}
                                    style={{ width: "14px", height: "14px", marginRight: "6px" }}
                                />

                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => {
                                        const newValue = e.target.innerText;
                                        setResumeData((prev) => ({
                                            ...prev,
                                            contact: {
                                                ...prev.contact,
                                                [key]: { ...item, value: newValue },
                                            },
                                        }));
                                    }}
                                >
                                    {item.value}
                                </span>

                                {isEditing && (
                                    <span
                                        onClick={() => {
                                            const newContact = { ...resumeData.contact };
                                            delete newContact[key];
                                            setResumeData((prev) => ({
                                                ...prev,
                                                contact: newContact,
                                            }));
                                        }}
                                        style={{
                                            marginLeft: "5px",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                        }}
                                    >
                                        X
                                    </span>
                                )}
                            </div>

                            {/* Divider dot only BETWEEN items */}
                            {i < arr.length - 1 && (
                                <div
                                    style={{
                                        flex: "0 0 auto",
                                        padding: "0 15px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    •
                                </div>
                            )}
                        </React.Fragment>
                    ))}

                    {isEditing && (
                        <span
                            onClick={() =>
                                setResumeData((prev) => ({
                                    ...prev,
                                    contact: {
                                        ...prev.contact,
                                        newField: {
                                            value: "New Contact",
                                            icon: "path_or_base64_here",
                                        },
                                    },
                                }))
                            }
                            style={{
                                marginLeft: "10px",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "13px",
                            }}
                        >
                            + Add
                        </span>
                    )}
                </div>



                {/* About Section */}
                <div style={{ marginBottom: "25px" }}>
                    <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("aboutHeading", e)}
                        style={{
                            backgroundColor: "#9bbaccff",
                            display: "inline-block",
                            padding: "6px 12px",
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "30px",
                            marginRight: "50px"
                        }}
                    >
                        {resumeData.aboutHeading}
                    </div>
                    <hr style={{
                        border: "1px solid black", marginTop: "0", marginLeft: "30px",
                        marginRight: "30px"
                    }} />
                    <p
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("about", e)}
                        style={{
                            fontSize: "14px", marginTop: "10px", marginLeft: "30px",
                            marginRight: "30px"
                        }}
                    >
                        {resumeData.about}
                    </p>
                </div>

                {/* Education Section */}
                <div style={{ marginBottom: "25px" }}>
                    <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("educationHeading", e)}
                        style={{
                            backgroundColor: "#9bbaccff",
                            display: "inline-block",
                            padding: "6px 12px",
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "30px",
                            marginRight: "30px",
                        }}
                    >
                        {resumeData.educationHeading}
                    </div>
                    <hr style={{
                        border: "1px solid black", marginTop: "0", marginLeft: "30px",
                        marginRight: "30px"
                    }} />
                    {resumeData.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: "12px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: "bold",
                                    marginLeft: "30px",
                                    marginRight: "30px",
                                    fontSize: "14px"
                                }}
                            >
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "university", e)}
                                >
                                    {edu.university}
                                </span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("education", i, "period", e)}
                                >
                                    {edu.period}
                                </span>
                            </div>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("education", i, "details", e)}
                                style={{
                                    fontSize: "14px", marginTop: "3px", marginLeft: "30px",
                                    marginRight: "30px"
                                }}
                            >
                                {edu.details}
                            </p>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("education", i)}
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        marginLeft: "30px"
                                    }}
                                >
                                    Remove
                                </span>
                            )}
                        </div>
                    ))}
                    {isEditing && (
                        <span
                            onClick={() =>
                                addItem("education", {
                                    university: "New University",
                                    period: "20XX-20XX",
                                    details: "Course details"
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
                        >
                            + Add Education
                        </span>
                    )}
                </div>

                {/* Skills Section */}
                <div style={{ marginBottom: "25px" }}>
                    <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("skillsHeading", e)}
                        style={{
                            backgroundColor: "#9bbaccff",
                            display: "inline-block",
                            padding: "6px 12px",
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                    >
                        {resumeData.skillsHeading}
                    </div>
                    <hr style={{
                        border: "1px solid black", marginTop: "0", marginLeft: "30px",
                        marginRight: "30px"
                    }} />
                    <ul
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            paddingLeft: "20px",
                            fontSize: "14px",
                            marginTop: "10px",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                    >
                        {resumeData.skills.map((skill, i) => (
                            <li key={i} style={{ marginBottom: "8px" }}>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => {
                                        const updated = [...resumeData.skills];
                                        updated[i] = e.target.innerText;
                                        setResumeData({ ...resumeData, skills: updated });
                                    }}
                                >
                                    {skill}
                                </span>
                                {isEditing && (
                                    <span
                                        onClick={() => removeItem("skills", i)}
                                        style={{
                                            marginLeft: "5px",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            marginLeft: "30px"
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
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
                        >
                            + Add Skill
                        </span>
                    )}
                </div>

                {/* Experience Section */}
                <div>
                    <div
                        contentEditable={isEditing}
                        suppressContentEditableWarning={true}
                        onBlur={(e) => handleChange("experienceHeading", e)}
                        style={{
                            backgroundColor: "#9bbaccff",
                            display: "inline-block",
                            padding: "6px 12px",
                            color: "black",
                            fontWeight: "bold",
                            marginLeft: "30px",
                            marginRight: "30px"
                        }}
                    >
                        {resumeData.experienceHeading}
                    </div>
                    <hr style={{
                        border: "1px solid black", marginTop: "0", marginLeft: "30px",
                        marginRight: "30px"
                    }} />
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: "20px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontWeight: "bold",
                                    marginLeft: "30px",
                                    marginRight: "30px",
                                    fontSize: "14px"
                                }}
                            >
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "company", e)}
                                >
                                    {exp.company} - {exp.role}
                                </span>
                                <span
                                    contentEditable={isEditing}
                                    suppressContentEditableWarning={true}
                                    onBlur={(e) => handleNestedChange("experience", i, "period", e)}
                                >
                                    {exp.period}
                                </span>
                            </div>
                            <p
                                contentEditable={isEditing}
                                suppressContentEditableWarning={true}
                                onBlur={(e) => handleNestedChange("experience", i, "overview", e)}
                                style={{
                                    fontSize: "14px", marginTop: "3px", marginLeft: "30px",
                                    marginRight: "30px"
                                }}
                            >
                                {exp.overview}
                            </p>
                            <ul style={{
                                paddingLeft: "20px", fontSize: "14px", marginLeft: "30px",
                                marginRight: "30px"
                            }}>
                                {exp.details.map((d, j) => (
                                    <li
                                        key={j}
                                        contentEditable={isEditing}
                                        suppressContentEditableWarning={true}
                                        onBlur={(e) =>
                                            handleListChange("experience", i, "details", j, e)
                                        }
                                    >
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            {isEditing && (
                                <span
                                    onClick={() => removeItem("experience", i)}
                                    style={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        marginLeft: "30px"
                                    }}
                                >
                                    Remove
                                </span>
                            )}
                        </div>
                    ))}
                    {isEditing && (
                        <span
                            onClick={() =>
                                addItem("experience", {
                                    company: "New Company",
                                    role: "Job Title",
                                    period: "20XX-20XX",
                                    overview: "Overview text...",
                                    details: ["Responsibility 1", "Responsibility 2"]
                                })
                            }
                            style={{ color: "blue", cursor: "pointer", fontSize: "14px", marginLeft: "30px" }}
                        >
                            + Add Experience
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate24;
